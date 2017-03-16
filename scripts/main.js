var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 290;
var ballSpeedY = 10;
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
var player1Score = 0;
var player2Score = 0;
const SCORE_LIMIT = 3;
var showWinScreen = false;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}
window.onload = function() { //Runs all the core functions for behavior after content loads
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000 / framesPerSecond);
	canvas.addEventListener('mousedown', handleMouseClick);
	/*document.getElementById("computer").addEventListener("click", function(){
			AI = true;
		 });
		document.getElementById("player").addEventListener("click", function(){
			AI = false;
		 }); */
	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
	});
};

function handleMouseClick(evt) {
	if (showWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showWinScreen = false;
	}
}

function ballReset() {
	if (player1Score >= SCORE_LIMIT || player2Score >= SCORE_LIMIT) {
		showWinScreen = true;
	}
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
	if (ballSpeedX > 1) {
		ballSpeedX = -10;
	} else { ballSpeedX = 10; }
	ballSpeedY = 10;
}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
	if (ballSpeedX < 0) {
		if (paddle2YCenter < canvas.height / 2) { paddle2Y += 1; } else if (paddle2YCenter > canvas.height / 2) { paddle2Y -= 1; }
	} else if (ballX > canvas.width / 2) {
		if (paddle2YCenter < ballY - 35) { paddle2Y += 11; } else if (paddle2YCenter > ballY + 35) { paddle2Y -= 11; }
	}
}

function moveEverything() {
	if (showWinScreen) {
		return;
	}
	computerMovement();
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	//Player Paddle Check
	if (ballX < PADDLE_THICKNESS) {
		if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
			ballSpeedY = deltaY * .35;
		} else {
			player2Score++;
			ballReset();
		}
	}
	//Computer Paddle Check
	if (ballX > canvas.width - PADDLE_THICKNESS) {
		if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
			ballSpeedY = deltaY * .35;
		} else {
			player1Score++;
			ballReset();
		}
	}
	//Ceilings Check
	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
	if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
}

function drawEverything() {
	colorRect(0, 0, canvas.width, canvas.height, 'black'); //background
	if (showWinScreen) {
		canvasContext.fillStyle = 'white';
		if (player1Score >= SCORE_LIMIT) {
			canvasContext.fillText("You Win", 350, 250);
		} else {
			canvasContext.fillText("The Computer Wins", 350, 250);
		}
		canvasContext.fillText("Click to Continue", 350, 500);
		return;
	}
	drawNet();
	colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white'); //Player paddle
	colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white'); //Computer paddle
	colorCircle(ballX, ballY, 5, 'white'); //Ball
	canvasContext.fillText('Your Score '+ player1Score, 100, 100); //Player's Score
	canvasContext.fillText("Computer's Score "+ player2Score, canvas.width - 100, 100); //Computer's Score
	/*		//reference numbers onscreen
	 		canvasContext.fillText('(x:0, y:0)',0,10);
	 		canvasContext.fillText('(x:800, y:0)',canvas.width-55,10);
	 		canvasContext.fillText('(x:0, y:600)',0,canvas.height-5);
	 		canvasContext.fillText('(x:800, y:600)',canvas.width-65,canvas.height-5);

	 			//displays the location of the paddles on screen.
			canvasContext.fillText(paddle1Y, 50, 50);
			canvasContext.fillText(ballY, 75, 75);
			canvasContext.fillText(paddle2Y, canvas.width-50, 50); */
}
//Ball Drawing Function
function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = 'white';
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}

function drawNet() {
	for (var i = 0; i < canvas.height; i += 40) {
		colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
	}
}