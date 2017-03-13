
var canvas;
var canvasContext;

var ballX = 50; //x Axis
var ballSpeedX = 20; //x Axis Acceleration

var ballY = 50; //y Axis
var ballSpeedY = 10; //y   Axis Acceleration

var paddle1Y = 250;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) 
				{

					var rect = canvas.getBoundingClientRect(); //Large black rectangle that all gameplay has taken place on. Basically, grabs wherever on the page the canvas element is to deal with scrolling.
					var root = document.documentElement; //points to the root Element on the DOM
					var mouseX = evt.clientX - rect.left - root.scrollLeft;  
					var mouseY = evt.clientY - rect.top - root.scrollTop;
					return { //returns an object literal. key : value
									x:mouseX,
									y:mouseY
								};
					}

window.onload = function() 
		{ //Runs all the core functions for behavior after content loads

		canvas = document.getElementById('gameCanvas')
		canvasContext = canvas.getContext('2d');


		//must have comma since it's written like 
		//setInterval('arguement', 'arguement')
		var framesPerSecond = 30;
		setInterval(function()
			{											//setInterval pt1 begin
					moveEverything();
					drawEverything(); 
			},											//setInterval pt1 end 
															

														//setInterval p2 begin 
					1000/framesPerSecond);
														//setInterval p2 end

							//event listener added, then declaring a function as the second arguement
		canvas.addEventListener('mousemove',
				//function(evt)means event data. Basically the evt symbolizes that event data is passed in
					function(evt) {
					var mousePos = calculateMousePos(evt); //this is where the evt is referenced
						paddle1Y = mousePos.y-(PADDLE_HEIGHT/2); //
				});
			}

function ballReset()
	 {


				ballX = canvas.width/2;
				ballY = canvas.height/2;
		}

function moveEverything()
		{ //handles everything that moves in the game

				   	ballX = ballX + ballSpeedX; //ball on x axis
				  	ballY = ballY + ballSpeedY; //ball on y axis

				  	//logic for x-axis
							if(ballX < 0)  //if this 
									{ 
										if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) // and if this is true 

											{ballSpeedX = -ballSpeedX;}// then this

										else  
											{	//other wise this
											ballReset();
											ballSpeedX = -ballSpeedX;
												} 
									}
							if(ballX > canvas.width)
								{
								ballSpeedX = -ballSpeedX;
								}

					 //logic for y-axis
							if(ballY > canvas.height) 
								{
									ballSpeedY = -ballSpeedY;
								}
							if (ballY < 0) 
								{
									ballSpeedY = -ballSpeedY;
								}
				}

function drawEverything()
	{		//draws everything that will be used on the canvas

		colorRect(0,0,canvas.width,canvas.height,'black'); //background
		colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, 'white'); //Player paddle
		colorCircle(ballX, ballY, 10, 'white'); //Ball

	} 

function colorCircle(centerX, centerY, radius, drawColor)
	{
		//helper function to draw a circle
		canvasContext.fillStyle = 'white';
		canvasContext.beginPath(); 		
		canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true);
		canvasContext.fill();
	}

function colorRect(leftX,topY, width,height, drawColor)
		{
			//helper function to draw a rectangle
			canvasContext.fillStyle = drawColor; 
			canvasContext.fillRect(leftX,topY,width,height);
		}
