#!/usr/bin/env node

///
// Demo of Playwright browser automation with JavaScript
// Converted from Selenium to Playwright
// Please see the file README.md for more information.
//
// ## Tracking
//
//   * Package: playwright-examples-using-javascript
//   * Version: 1.4.0
//   * Created: 2019-11-02T00:00:00Z
//   * Updated: 2025-04-24T13:58:02Z
//   * License: GPL-2.0-or-greater or for custom license contact us
//   * Contact: Joel Parker Henderson (joel@joelparkerhenderson.com)
///

// Import Playwright
import { chromium } from 'playwright';

// Import strict assert, renamed for convenience as assert
import { strict as assert } from 'assert';
assert(true);

async function demo(){

    // Initialize browser with options similar to Selenium setup
    const browser = await chromium.launch({
        headless: false, // Set to true for headless mode
        args: [
            '--verbose', // Enable verbose logging
            '--disable-notifications', // Disable notifications such as popups
        ]
    });

    // Create a new context with preferences
    const context = await browser.newContext({
        // Reject cookies (Playwright doesn't have direct cookie rejection, 
        // but you can clear cookies or use context isolation)
        acceptDownloads: false,
        // Additional context options can be set here
    });

    // Create a new page
    const page = await context.newPage();

    try {
        // Navigate to a website
        await page.goto("https://testingexamples.github.io");

        ///
        // Find elements in various ways.
        // Note: Playwright uses locators which auto-wait and retry
        ///

        // Find an element by id.
        //
        // This demonstrates locator with id selector.
        //
        // Example HTML:
        //
        //      <p id="id-example-1">Lorem Ipsum</p>
        //
        const elementById = page.locator('#id-example-1');
        console.log(await elementById.evaluate(el => el.outerHTML));

        // Find an element by name attribute.
        //
        // This demonstrates locator with attribute selector.
        //
        // Example HTML:
        //
        //     <p name="name-example-1">Lorem Ipsum</p>
        //
        const elementByName = page.locator('[name="name-example-1"]');
        console.log(await elementByName.evaluate(el => el.outerHTML));

        // Find an element by class name.
        //
        // This demonstrates locator with class selector.
        //
        // Example HTML:
        //
        //     <p class="class-example-1">Lorem Ipsum</p>
        //
        const elementByClassName = page.locator('.class-example-1');
        console.log(await elementByClassName.evaluate(el => el.outerHTML));

        // Find an element that is a link by its text.
        //
        // This demonstrates locator with text selector.
        //
        // Example HTML:
        //
        //     <a href="https://example.com">Link Example 1</a>
        //
        const elementByLinkText = page.locator('a', { hasText: 'Link Example 1' });
        // Alternative: page.locator('text="Link Example 1"') for exact text
        console.log(await elementByLinkText.evaluate(el => el.outerHTML));

        // Find an element by XPath query.
        //
        // This demonstrates XPath selector.
        //
        // Example HTML:
        //
        //     <input type=submit>
        //
        const elementByXPath = page.locator('xpath=//input[@type="submit"]');
        console.log(await elementByXPath.evaluate(el => el.outerHTML));

        ///
        // Interact with form inputs in various ways.
        ///

        // Type in a text input.
        //
        // Example HTML:
        //
        //     <input type="text" id="text-example-1">
        //
        const text = page.locator('#text-example-1-id');
        console.log(await text.evaluate(el => el.outerHTML));
        await text.fill("hello");
        // Alternative: await text.type("hello") for character-by-character typing

        // Click a checkbox input.
        //
        // Example HTML:
        //
        //     <input type="checkbox" id="checkbox-example-1-id">
        //
        const checkbox = page.locator('#checkbox-example-1-id');
        console.log(await checkbox.evaluate(el => el.outerHTML));
        await checkbox.check();
        // Alternative: await checkbox.click() also works

        // Click a radio input.
        //
        // Example HTML:
        //
        //     <input type="radio" id="radio-example-1-id-option-1-id">
        //
        const radio = page.locator('#radio-example-1-option-1-id');
        console.log(await radio.evaluate(el => el.outerHTML));
        await radio.check();
        // Alternative: await radio.click() also works

        // Choose a select input option.
        //
        // Example HTML:
        //
        //     <select id="select-example-1-id">
        //       <option>alfa</option>
        //       <option>bravo</option>
        //       <option>charlie</option>
        //     </select>
        //
        const selectElement = page.locator('#select-example-1-id');
        console.log(await selectElement.evaluate(el => el.outerHTML));
        
        // Select by index (0-based)
        await selectElement.selectOption({ index: 0 });
        
        // Get the selected option value
        const selectedValue = await selectElement.inputValue();
        console.log(`Selected option value: ${selectedValue}`);
        
        // To get the selected option element HTML (similar to Selenium's getFirstSelectedOption)
        const selectedOption = selectElement.locator('option:checked');
        console.log(await selectedOption.evaluate(el => el.outerHTML));

        // Alternative selection methods:
        // await selectElement.selectOption('alfa');  // by value or text
        // await selectElement.selectOption({ label: 'alfa' });  // by visible text
        // await selectElement.selectOption({ value: 'alfa' });  // by value attribute

    } catch (err) {
        console.log(err.message);
        console.log(err.stack);
    } finally {
        // Close browser
        await browser.close();
    }

}

demo().catch((err) => console.error(err));
