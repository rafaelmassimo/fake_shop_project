import { FlyingButton } from "./flying_button.js";
import { Toast } from "./toast.js";

export class ShoppingCart {
	constructor() {
		this.products = [];
		this.total = 0;
	}

	set totalCart(price) {
		this.total += price;
	}

	addProductList(product) {
		// this is the object which will be used for count how many times I hve the same product
		let newProduct = {
			name: "",
			amount: 1,
		};
		// Here the logic for increase the amount of the product to avoid to repeat the same product in the cart
		let indexProduct;

		if (
			this.products.find((value, i) => {
				indexProduct = i;
				return value.name === product;
			})
		) {
			this.products[indexProduct].amount += 1; //increase the amount of products if I was able to find the object of this object in the array
		} else {
			//Create a new product if I couldn't find it in the array
			newProduct.name = product;
			this.products.push(newProduct);
		}
		console.log(this.products);
	}

	cleanCart() {
		$("#clear-cart").click(() => {
			console.log("clean");
			this.products = [];
			this.total = 0;
			$("#clear-cart").hide();
			$("#order-now-button").hide();
			$(".element-list").remove();
			$("#your-items").remove();
			$("#your-items-box").remove();
			$("#your-amount-box").remove();
			$("#flying-button").remove();
			
			const toastCartEmpty = new Toast("Your cart has been cleaned", "warning")
			toastCartEmpty.emptyCartMessage()
			this.render()
		});
	}

	// getTotalItems() {
	// 	here at the beginning has as parameters 'product'
	// 	this.products.push(product);
	// 	if(!this.products.length) {
	// 		return 0;
	// 	}
	// 	for (let i = 0; i < this.products.length; i++) {
	// 		this.total += this.products[i].price;
	// 	}
	// 	console.log(this.products);
	// 	return this.total;
	// }

	render() {
		if (this.total === 0) {
			$("#total-price").text(`Your cart is empty`).addClass("font-weight-bold font-italic text-warning");
		} else if (this.total > 0) {
			FlyingButton.showButton();
			$("#total-price")
				.text(`Total: $${parseFloat(this.total).toFixed(2)}`)
				.addClass("font-weight-bold font-italic text-info");

			// check if the H2 already exist, if not I create a new one
			if ($("#your-items").length === 0) {
				$(`<h2 id="your-items">Your Items:</h2>`).insertAfter($("#total-price"));
				$(`<div id="your-items-box"></div>`).insertAfter($("#your-items"));
				$(`<div id="your-amount-box"></div>`).insertAfter($("#your-items-box"));
			}

			// Clean all the elements before running the loop again, to avoid to repeat the items
			$(".element-list").remove();

			for (let i = 0; i < this.products.length; i++) {
				$("#your-items-box").append(`<li class='element-list'>${this.products[i].name}.</li>`);
				$("#your-amount-box").append(`<dt class='element-list'>Qty: ${this.products[i].amount}</dt>`);
			}

			$("#total-price").append();
			$("#order-now-button").css("display", "block");
			$("#clear-cart").css("display", "block");
		}
	}

	addProduct(product) {
		this.totalCart = product.price;
		this.addProductList(product.title);
		this.render();
	}
}
