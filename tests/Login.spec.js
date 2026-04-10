const { test, expect} = require('@playwright/test');


//valid login test 
test('user can login with valid credentials', async ({page}) => {
    //go to login page
    await page.goto('https://www.saucedemo.com/'); 
    
    //enter username and password, then click login button
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    //verify that user lands on inventory page
    await expect(page).toHaveURL(/inventory/);
});

//invalid login test
test.fail('user cannot login with invalid credentials', async({page}) =>{
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('wrong_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();

//expect user to stay on login page
test('user is locked out after failed login attempts', async({page})=>{

    await page.goto('https://www.saucedemo.com/');

    for(let i=0; i<3; i++){
        await page.locator('[data-test="username"]').fill('locked_out_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page.locator('[data-test="error"]')).toBeVisible();
    }

});

//empty username and password test
test('user added empty username and password', async({page})=>{
    await page.goto('https://saucedemo.com/');

    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
})

});