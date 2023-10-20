export class Toast {
	constructor(message, color) {
		this.message = message;
		this.color = color;
	}

	showMessage() {
        const timeline = gsap.timeline();
		const toast = $("<div>")
			.addClass(`alert alert-${this.color} font-weight-bold text-center`)
			.attr("id", "toast")
			.text(this.message ? this.message : "no message was added")
            .css("z-index", "1000");

		//* Check if Toast not exists in the document then prepend it.
		if (!$("#toast").length);
		$("body").prepend(toast);

		timeline.fromTo(
			"#toast",
			{
				display: "block",
                position: "fixed",
				x: "120%",
                y:"150%",
				opacity: 0,
			},
			{
				opacity: 1,
                position: "fixed",
				x: 0,
                y:"0%",
				ease: "elastic.out(1, 0.5)",
				delay: 0.2,
			}
		);

		timeline.to("#toast", {
			display: "none",
			opacity: 0,
			x: "120%",
			ease: "elastic.in(1, 0.8)",
			duration: 1,
			delay: 2,
			onComplete: () => {
				$("#toast").remove();
			},
		});
	}

	emptyCartMessage() {
        const timeline = gsap.timeline();
		const toast = $("<div>")
			.addClass(`alert alert-${this.color} font-weight-bold text-center`)
			.attr("id", "toast-empty-cart")
			.text(this.message ? this.message : "no message was added")
            .css("z-index", "1000");

		//* Check if Toast not exists in the document then prepend it.
		if (!$("#toast-empty-cart").length);
		$("body").prepend(toast);

		timeline.fromTo(
			"#toast-empty-cart",
			{
				display: "block",
                position: "fixed",
				x: "120%",
                y:"150%",
				opacity: 0,
			},
			{
				opacity: 1,
                position: "fixed",
				x: 0,
                y:"0%",
				ease: "elastic.out(1, 0.5)",
				delay: 0.2,
			}
		);

		timeline.to("#toast-empty-cart", {
			display: "none",
			opacity: 0,
			x: "120%",
			ease: "elastic.in(1, 0.8)",
			duration: 1,
			delay: 2,
			onComplete: () => {
				$("#toast-empty-cart").remove();
			},
		});
	}
}

