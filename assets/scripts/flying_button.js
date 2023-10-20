export class FlyingButton {
	constructor() {}

	static showButton() {
		let button = $("#flying-button");

		if (button.length > 0) {
            gsap.to(button, {scale: 1.3, duration: 0.6, yoyo: true, runBackwards: true, backgroundColor: "red"});

		} else {
			let button = $(`<input class="btn btn-primary" type=button onClick="location.href='#total-section'" id='flying-button' value= 'Go to your Cart'>`);
			$("body").append(button)
            gsap.from(button, {
                opacity: 0, 
                y: 100, 
                duration: 1
            });
		}
	}
}
