const { test, expect} = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');


test.describe('Login tests', () => {
    test('user can login with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory/);
    });

    test('user cannot login with inavlid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login('wrong_user', 'wrong password');
        
        await expect(loginPage.errorMessage).toBeVisible();
    })
})