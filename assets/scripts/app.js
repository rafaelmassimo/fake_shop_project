import { Shop } from "./shop.js";

export class App {
	constructor() {
		this.shop = new Shop();
	}

	init() {
		this.shop.render();
		console.log("app loaded");
	}

	addProductToCart(product) {
		// Shop.shoppingCartInstance.addProduct(product);
		this.shop.shoppingCartInstance.addProduct(product);
        this.shop.shoppingCartInstance.cleanCart();
	}
}

export const newApp = new App();
setTimeout(() => {
    newApp.init();
    $("#loading-animation").hide();
    $("#total-section").show()
    $('body').css("background-color", "rgb(63 72 82)")
}, "2000");



