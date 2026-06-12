class DashboardPage {
    constructor(page) {
        this.page = page;
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.firstAddToCartButton = page.locator('[data-test^="add-to-cart"]').first();
    }
    async verifyLoaded() {
        await this.inventoryList.waitFor();
    }
    async addFirstItemToCart(){
        await this.firstAddToCartButton.click();
    }
    async openCart() {
        await this.shoppingCartLink.click();
    }
    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }
}
module.exports = { DashboardPage };
