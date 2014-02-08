function createBall(target, type, points) {	
	var ball = $('<span class="ball"></span>').appendTo("div#gamedev"),
		position = {
			top: target.position().top - 25*Math.random(),
			left: target.position().left - 25*Math.random()
		},
		typeClass = "ball--" + type;

	ball.css({
		top:position.top,
		left:position.left,
	});

	ball.addClass(typeClass);

	return ball
}
