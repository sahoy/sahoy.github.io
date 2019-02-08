width = document.body.clientWidth;
height = document.body.clientHeight;

var boardW = 50;
var boardH = 20;

var gridSpots = [];

for(i = 0; i < boardW; i++){
    var column = [];
    for(j = 0; j < boardH; j++){
        column.push(0);
    }
    gridSpots.push(column);
}

window.onload=function(){
    document.getElementById('canvas').width = width;
    document.getElementById('canvas').height = height;
    c = document.getElementById('canvas').getContext('2d');
    c.fillStyle='#297F29';
    c.fillRect(0,0,width,height);
    animate = setInterval(update,1000/frameRate);
    document.addEventListener('mousemove',function(e){
        
	});
}

function update(){
	for(i = 0; i < boardW; i++){
		for(j = 0; j < boardH; j++){
			color = 'rgb(0,0,255)'
			c.fillStyle
			c.fillRect(i*width/boardW,j*height/boardHeight
		}
	}
}
