var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
c.width=900;
c.height = 700;

var playState = false;
var correct = 0;
var rectWidth = 175;
var rectHeight = 125;
var rects = [
    [20,150,rectWidth,rectHeight],
    [30,655,rectWidth,rectHeight],
    [100,455,rectWidth,rectHeight],
    [230,265,rectWidth,rectHeight],
    [300,555,rectWidth,rectHeight],
    [450,130,rectWidth,rectHeight],
    [490,655,rectWidth,rectHeight],
    [500,400,rectWidth,rectHeight],
    [710,255,rectWidth,rectHeight],
    [700,605,rectWidth,rectHeight]
];

function genNums(){
	for(i = 0;i<10;i++){
		var num = Math.floor(Math.random() * 100);
		var size = Math.floor(Math.random() * 140) + 20;
		ctx.rect(rects[i][0], rects[i][1]-120, rects[i][2], rects[i][3]);
		ctx.font = size+("px Arial");
		ctx.fillText(num, rects[i][0], rects[i][1]);		
		rects[i].push(num);
	}		
}
function sortFunction(a, b) {
    if (a[4] === b[4]) {
		
    }
    else {
        return (a[4] < b[4]) ? -1 : 1;
    }
}
function checkClick(event){
	cx = event.offsetX;
	cy = event.offsetY;
	var cXMin = rects[9][0];
	var cXMax = (rects[9][0])+(rects[9][2]);
	var cYMin = (rects[9][1])-120;
	var cYMax = cYMin+(rects[9][3]);
	if(((cx>cXMin)&&(cx<cXMax))&&((cy>cYMin)&&(cy<cYMax))){
		correct ++;
		c.width = c.width;		
		for(i=0;i<10;i++){
			rects[i].splice(4,1);
		}
		playGame();
	}
	else{
		c.width = c.width;
		for(i=0;i<10;i++){
			rects[i].splice(4,1);
		}
		playGame();
	};
}

function checkStart(event){
	x = event.offsetX;
	y = event.offsetY;
	var XMin = 340;
	var XMax = 540;
	var YMin = 370;
	var YMax = 470;
	if(((x>XMin)&&(x<XMax))&&((y>YMin)&&(y<YMax))){
		c.width = c.width;
		playState = true;
		c.removeEventListener('mousedown',checkStart,false);
		if (playState == true){
			playGame();
			setInterval(endGame,20000);
			return;
		}
	}	
}
function checkRetry(event){
	x = event.offsetX;
	y = event.offsetY;
	var XMin = 240;
	var XMax = 640;
	var YMin = 370;
	var YMax = 470;
	if(((x>XMin)&&(x<XMax))&&((y>YMin)&&(y<YMax))){
		window.location.reload();
		c.removeEventListener('mousedown',checkRetry,false);
	}	
}

function playGame(){
		ctx.fillStyle = "#FF0000";
		ctx.font = "40px Arial";
		ctx.fillText("Score: " + correct,720,680);
		ctx.fillStyle = "#000000";
		genNums();	
		rects.sort(sortFunction);
		c.addEventListener('mousedown',checkClick,false);		
};

function endGame(){
	c.width = c.width;
	ctx.font = "100px Arial";
	ctx.fillText("You got " +correct+ " right",120,250);
	playState = false;
	c.removeEventListener('mousedown',checkClick,false);
	ctx.rect(240, 370, 400, 100);
	ctx.stroke();
	ctx.fillStyle = "#8A3E6E";
	ctx.fill();
	ctx.fillStyle = "white";
	ctx.font = "80px Arial";
	ctx.fillText("Go Again?",250,450);
	c.addEventListener('mousedown',checkRetry,false);
	
}
function start(){
	c.addEventListener('mousedown',checkStart,false);	
	ctx.rect(340, 370, 200, 100);
	ctx.stroke();
	ctx.fillStyle = "#8A3E6E";
	ctx.fill();
	ctx.fillStyle = "white";
	ctx.font = "80px Arial";
	ctx.fillText("Start",350,450);
	ctx.font = "20px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Click on the largest number in terms of value, get as many correct as you can within 30 seconds",20,300);
	
	
}

start();









