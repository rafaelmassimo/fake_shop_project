import { newApp } from "./app.js";
import { App } from "./app.js";

export class ProductItem {
	constructor(product) {
		this.product = product;
	}

	addToCart() {
		App.addProductToCart(product)
	}

	render() {
		return this.product;
	}
}
