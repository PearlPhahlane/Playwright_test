const { test, expect} = require('@playwright/test');

test('homepage loads', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/i);
});