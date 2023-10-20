class Product {
	constructor(id, title, price, description, image) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.description = description;
		this.image = image;
	}
}

class ProductItem {
	constructor(product) {
		this.product = product;
	}

	addToCart() {
		console.log(this.product);
	}

	render() {
		return this.product;
	}
}

// const item_1 = new ProductItem(product)
// item_1.addToCart()
// console.log(item_1);

class ProductList {
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

			//? Create the instance of the ShoppingCart to be used when I click the button 'Add to cart'
			// const shoppingCart = new ShoppingCart();

			for (let i = 0; i < this.products.length; i++) {
				let product = this.products[i].product;
				$("#products-box").append(`<div class="products-box" id="product_${i}"></div>`);
				$(`#product_${i}`).append(`<h2>${this.products[i].product.title}</h2>`);
				$(`#product_${i}`).append(`<h3>$${this.products[i].product.price}</h3>`);
				$(`#product_${i}`).append(`<p>${this.products[i].product.description}</p>`);
				$(`#product_${i}`).append(`<img class="products-image" src="${this.products[i].product.image}"></img>`);
				const button = $("<button>Add to Cart</button>`");

				button.click(function () {
					// console.log(product);

					//* When I click in the button I call the method inside the ShoppingCart Class
					shoppingCart.addProduct(product);
					// shoppingCart.render();
				});
				$(`#product_${i}`).append(button);
			}
		} catch (error) {
			console.log(error);
		}
	}
}

// // * Here I'm calling the render method inside ProductList to be able to show the products on the page
// // let productList_1 = new ProductList();
// // productList_1.fetchProducts(); Maybe there is no need to do this code, because I'm already calling the API on the render method
// // productList_1.render();

class ShoppingCart {
	constructor() {
		this.products = [];
		this.total = 0;
	}

	getTotal() {
		//here at the beginning has as parameters 'product'
		// this.products.push(product);
		for (let i = 0; i < this.products.length; i++) {
			this.total += this.products[i].price;
		}
		console.log(this.products);
		return this.total;
	}

	render() {
		if (this.total > 0) {
			$("#total-price").text(`Total: $${this.total}`);
			$("#order-now-button").css("display", "block");
		}
	}

	addProduct(product) {
		this.products.push(product);
		this.render();
	}
}

class Shop {
	constructor() {}

	render() {
		//* Call render() of ProductList
		let productList_1 = new ProductList();
		// productList_1.fetchProducts(); Maybe there is no need to do this code, because I'm already calling the API on the render method
		productList_1.render();

		//* Call render() of ShoppingCart
		const shoppingCart = new ShoppingCart();
		shoppingCart.render();
		console.log("shopping cart created", shoppingCart);
	}
}

class App {
	constructor() {}

	init() {
		const newShop = new Shop();
		newShop.render();
		console.log("app loaded");
	}
}

$(document).ready(function () {
	const newApp = new App();
	newApp.init();
});
