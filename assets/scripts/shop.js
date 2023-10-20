import { ProductList } from "./productList.js";
import { ShoppingCart } from "./shoppingCart.js";

export class Shop {
	constructor() {
		this.productList = new ProductList();
		this.shoppingCartInstance = new ShoppingCart();
	}

	render() {
		//* Call render() of ProductList
		// productList_1.fetchProducts(); Maybe there is no need to do this code, because I'm already calling the API on the render method
		this.productList.render();

		//* Call render() of ShoppingCart
		this.shoppingCartInstance.render();
		console.log("shopping cart instance created");
	}
}