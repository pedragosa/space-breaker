var canvas=document.getElementById('canvas1');
var ctx=canvas.getContext('2d');

var ballPositionX=canvas.width/2;
var ballPositionBottomMarginY=20;
var ballPositionY=canvas.height-ballPositionBottomMarginY;
var currentVelocityX=0;
var currentVelocityY=-0;
var ballSpeedX=2;
var ballSpeedY=-2;

var paddleHeight=10;
var paddleWidth=125;
var paddleX=(canvas.width-paddleWidth)/2;

var ballRadius=7;

var rightPressed=false;
var leftPressed=false;

var brickWidth=75;
var brickHeight=20;
var brickRowCount=15;
var brickColumnCount=8;
var brickPadding=10;
var brickOffSetTop=30;
var brickOffSetLeft=30;
var isPlaying=false;
var lives=5;
var score=0;

var bricks = [];
for(let i=0;i<brickColumnCount;i++){
	bricks[i] = [];
	for(let j=0;j<brickRowCount;j++){
		bricks[i][j] = {x:0,y:0,status:3};
		if (j>10){
			bricks[i][j].status = 1;
		}
		if (j>1 && j<10){
			bricks[i][j].status = 2;
		}
	}
}
document.addEventListener('keydown',keyDownHandler);
document.addEventListener('keyup',keyUpHandler);

function setPause(value){
	isPlaying=!value;
	if (value == true){
		currentVelocityX=0;
		currentVelocityY=0;
	}else{
		currentVelocityX=ballSpeedX;
		currentVelocityY=ballSpeedY;
	}
}
document.body.onkeyup = function(e){
    if(isPlaying == false && (e.key==" " || e.code=="Space" || e.keyCode==32)){
		setPause(false);
    }
}

function drawBricks(){
	for(let i=0;i<brickColumnCount;i++){
		for(let j=0;j<brickRowCount;j++){
			if(bricks[i][j].status>=1){
				let brickX=(i*(brickWidth+brickPadding)+brickOffSetLeft);
				let brickY=(j*(brickHeight+brickPadding)+brickOffSetTop);
				bricks[i][j].x=brickX;
				bricks[i][j].y=brickY;
				ctx.beginPath();
				ctx.rect(brickX,brickY,brickWidth,brickHeight);
				if(bricks[i][j].status>=3){
					ctx.fillStyle="#152B4F";
				}else if(bricks[i][j].status>=2){
					ctx.fillStyle="#04B0CB";
				}else{
					ctx.fillStyle="#34C061";
				}
				ctx.fill();
				ctx.strokeStyle='rgba(0,0,255,0.5)';
				ctx.stroke();
				ctx.closePath();
			}
		}
	}
}

function keyDownHandler(movement){
	if(movement.keyCode == 39){
		rightPressed = true;
	}else if(movement.keyCode == 37){
		leftPressed = true;
	}
}

function keyUpHandler(movement){
	if(movement.keyCode==39){
		rightPressed=false;
	}else if(movement.keyCode==37){
		leftPressed=false;
	}
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(ballPositionX,ballPositionY,ballRadius,0,Math.PI*2);
	ctx.fillStyle="#FFFFFF";
	ctx.fill();
	ctx.closePath();
	
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-(paddleHeight),paddleWidth,paddleHeight);
	ctx.fillStyle="#00FBFF";
	ctx.fill();
	ctx.closePath();
}

function collisonDetection(){
	for(var i=0;i<brickColumnCount;i++){
		for(var j=0;j<brickRowCount;j++){
			var b=bricks[i][j];
			if(b.status>=1){
				if(ballPositionX>b.x && ballPositionX< b.x+brickWidth && ballPositionY>b.y && ballPositionY< b.y+brickHeight ){
					currentVelocityY=-currentVelocityY;
					b.status--;
					if (b.status == 0){
						++score;
						if(brickColumnCount*brickRowCount == score){
							alert("YOU WIN");
							window.location.href = '../levels/start_level2.html';
						}
					}
				}
			}
		}
	}
}
function drawStartMsg(){
	if (!isPlaying){
		ctx.font="30px Calibri";
		ctx.fillStyle="#FFFFFF";
		ctx.textAlign = "center";
		ctx.fillText("Press 'Space' to start. ",canvas.width/2,canvas.height-50);
	}
}

function drawScore(){
	ctx.font="19px Arial";
	ctx.fillStyle="#FFFFFF";
	ctx.fillText("🔷 "+score,45,20);
}

function drawLives(){
	ctx.font="19px Arial";
	ctx.fillStyle="#FFFFFF";
	ctx.fillText("❤️ "+lives,canvas.width-50,20);
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height)
	drawBricks();
	drawLives();
	drawBall();
	drawPaddle();
	drawScore();
	collisonDetection();
	drawStartMsg();
	
	
	if(ballPositionY+currentVelocityY < ballRadius){
		currentVelocityY=-currentVelocityY;

	}else if(ballPositionY+currentVelocityY > canvas.height-2*ballRadius){

		if(ballPositionX>paddleX && ballPositionX<paddleX +paddleWidth){
			currentVelocityY=-currentVelocityY;
		
		}else{ // live loss	
			lives=lives-1;
			setPause(true);

			if(lives == 0){
		    	window.location.href = '../index.html';

			}else{
				ballPositionX=canvas.width/2;
				ballPositionY=canvas.height-ballPositionBottomMarginY;
				paddleX=(canvas.width-paddleWidth)/2;
			}
	    }
	}
	if((ballPositionX+currentVelocityX < ballRadius || (ballPositionX+currentVelocityX > canvas.width-ballRadius)) ){
			currentVelocityX=-currentVelocityX;
	}
	if(rightPressed && paddleX < canvas.width-paddleWidth){
		paddleX+=7;

	}else if(leftPressed && paddleX>0){
		paddleX-=7;
	}
	if(!isPlaying){
		ballPositionX=paddleX+paddleWidth/2;
	}else{
		ballPositionX += currentVelocityX;
		ballPositionY += currentVelocityY;
	}
}
// [CONFIDENTIAL] SECRET DISCORD SERVER INVITATION CODE LoYUInWAFzf5FbKb5yjc6iRtTzY6LWLE2YWMzmq DO NOT SHARE!
setInterval(draw,8);
