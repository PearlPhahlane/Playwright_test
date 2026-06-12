const { test, expect} = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { validUser, invalidUser} = require('../utils/testData');


test.describe('Login tests', () => {
    test('user can login with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password)

        await expect(page).toHaveURL(/inventory/);
    });

    test('user cannot login with inavlid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(invalidUser.username, invalidUser.password)

        await expect(loginPage.errorMessage).toBeVisible();
   
    });
     test('logged in user sees dashboard', async ({page}) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password)
        await dashboardPage.verifyLoaded();

        await expect(page).toHaveURL(/inventory/);
    });

    test('user logs out successfully', async ({page}) => {
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await loginPage.goto();
        await loginPage.login(validUser.username, validUser.password)
        await dashboardPage.verifyLoaded();
        await dashboardPage.logout();

        expect(page).toHaveURL('https://www.saucedemo.com/');
        
    })

});