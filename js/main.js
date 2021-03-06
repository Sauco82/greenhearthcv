var gameConfig = {
	speed: 1,
	time: 0,
	pause: false,
	date: ""
};

function gameLoop() {	
	if (!gameConfig.pause) {
		addRandomBall();
		increaseDate()
	} 
	setTimeout(gameLoop, 3000 / gameConfig.speed);
}

// ========================================
	// Time management
// ========================================

function pause(event) { 
	gameConfig.pause = true 

	$(".timecontrol__controls li").removeClass("active");
	$(event.target).addClass("active");
}

function cancelPause() { 
	gameConfig.pause = false 
}

function setSpeed(event, speed) {
	gameConfig.speed = speed;
	cancelPause();

	$(".timecontrol__controls li").removeClass("active");
	$(event.target).addClass("active");
}

function initDate() {
	gameConfig.date = moment().subtract('years', 30);

	showDate();
}

function increaseDate() {
	gameConfig.date.add('days',1);
	showDate();
}

function showDate() {
	$("#date-placeholder").html(gameConfig.date.format("YYYY, MMM Do"));
}

// ========================================
	// Notifications
// ========================================
function startGame() {
	initDate();
	popupToNotifications();
	enableCharacterInteraction();
	gameLoop();
	$("#black-screen").hide();
}

function popupToNotifications() {
	var content = $("#popup .popup__content").html(),		
		notification = $('<li class="notification"></li>').appendTo("#notifications");

	notification.html(content);
	$("#popup").addClass("to-notifications");

	setTimeout(function(){
		$("#popup").remove();
	},300)
}

// ========================================
	// Character sheets
// ========================================

function enableCharacterInteraction() {
	$(".character").click(function(){
		var charId = "." + $(this).attr("id");

		$(charId).toggle();
	});

	$(".character-sheet__close").click(function() {
		$(this).parent().hide();
	});
}



// ========================================
	// Ball dinamics
// ========================================
function addRandomBall(){
	var characters = ["#char1","#char2","#lead"],
		types = ["design","development","bugs","research"],
		points = Math.round(3*Math.random()) + 1,
		charId = Math.floor(characters.length*Math.random()),
		typeId = Math.floor(types.length*Math.random());


	createBall(
		$(characters[charId]),
		types[typeId],
		points
	);
}

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

	ball.html(points)
	
	setTimeout( function() {moveBallToProgress(ball, type)}, 1000);
}

function moveBallToProgress(ball, target) {
	var type = $("#"+target),
		position = type.position();

	ball.css({
		top: position.top,
		left: position.left + 260
	});	

	setTimeout(function(){
		var newResult = parseInt(type.html())+parseInt(ball.html());
		
		type.html(newResult);
		highlightType(type);
		ball.remove()
	},500)
}

function highlightType(type) {
	var highlightClass = "highlight__" + type.attr('id'),
		position = {
			top: type.position().top,
			left: type.position().left
		},
		highlight = $('<span class="highlight '+highlightClass+'"></span>').insertBefore(type);
	
	highlight.css({
		'top': position.top,
		'left': position.left,		
	});

	setTimeout(function(){
		highlight.remove()
	},300)
		
}