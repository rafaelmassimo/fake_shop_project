import { ProductItem } from "./productItem.js";
import { Product } from "./product.js";
import { newApp } from "./app.js";
import { Toast } from "./toast.js";

export class ProductList {
	constructor() {
		this.products = [];
	}

	async fetchProducts() {
		const url = "https://fakestoreapi.com/products";
		try {
			const response = await fetch(url);
			const data = await response.json();

			for (let i = 0; i < data.length; i++) {
				this.products.push(data[i]);
			}
			return this.products;
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			console.log(`API done`);
		}
	}

	async render() {
		try {
			const products = await this.fetchProducts();
			let listOfProducts = [];
			for (let i = 0; i < products.length; i++) {
				let id = products[i].id;
				let title = products[i].title;
				let price = products[i].price;
				let description = products[i].description;
				let image = products[i].image;

				// create the instances of products
				let productObj = new Product(id, title, price, description, image);

				// create the instances of productsItems
				let productItem = new ProductItem(productObj);
				listOfProducts.push(productItem);
			}
			this.products = listOfProducts;
			// console.log(this.products);

			//* DOM for create list of items
			const newToast = new Toast("Product added to your cart", "success")

			for (let i = 0; i < this.products.length; i++) {
				let product = this.products[i].product;
				$("#products-box").append(`<div class="products-box" id="product_${i}"></div>`);
				$(`#product_${i}`).append(`<h2>${this.products[i].product.title}</h2>`);
				$(`#product_${i}`).append(`<h3>$${this.products[i].product.price}</h3>`);
				$(`#product_${i}`).append(`<p>${this.products[i].product.description}</p>`);
				$(`#product_${i}`).append(`<img class="products-image" src="${this.products[i].product.image}"></img>`);
				const button = $("<button class='btn btn-primary'>Add to Cart</button>`");

				button.click(function () {
					//* When I click in the button I call the method inside the ShoppingCart Class
					//? To avoid the user to double-click to much faster
					console.log(product);
					button.attr("disabled", true)
					newApp.addProductToCart(product);
					newToast.showMessage();
					setTimeout(() => {
						button.attr("disabled", false)
					}, 1000);

				});
				$(`#product_${i}`).append(button);
			}
		} catch (error) {
			console.log(error);
		}
	}
}
