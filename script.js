"jennasawesomecode".length;
width = document.body.clientWidth;
height = document.body.clientHeight;

var boardW = 10;
var boardH = 20;
var frameNum = 0;
var frameRate = 100;
var gridSpots = [];

var tet1 = [[1, 1, 1, 1]];
var tet2 = [[2, 2, 2], [2]];
var tet3 = [[3], [3, 3, 3]];
var tet4 = [[0, 7], [7, 7], [7]];
var tet5 = [[6, 6, 6], [0, 6]];
var tet6 = [[5], [5, 5], [0, 5]];
var tet7 = [[4, 4], [4, 4]];

var tetrimino = [tet1,[0,0]];

var colors = ['rgb(85, 85, 85)',
							'rgb(81, 208, 255)',
							'rgb(4, 68, 216)',
							'rgb(252, 187, 65)',
							'rgb(247, 240, 34)',
							'rgb(88, 216, 86)',
							'rgb(157, 76, 211)',
							'rgb(191, 28, 28)'];

for (i = 0; i < boardW; i++) {
	var column = [];
	for (j = 0; j < boardH; j++) {
		column.push(0);
	}
	gridSpots.push(column);
}
//gridSpots[boardW-1][boardH-1]=1;

window.onload = function () {
	document.getElementById('canvas').width = width;
	document.getElementById('canvas').height = height;
	c = document.getElementById('canvas').getContext('2d');
	c.fillStyle = 'rgb(55,55,55)';
	c.fillRect(0, 0, width, height);
	animate = setInterval(update, 1000 / frameRate);
	document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
						if(tetrimino[1][0]>-1*Math.floor(boardW / 2 - 1)){
							eraseTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
							tetrimino[1][0]-=1;
							deployTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
							display();
						}
            break;
        case 39:
            if(tetrimino[1][0]<Math.floor(boardW / 2 - 1)+2-tetrimino[0].length){
							eraseTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
							tetrimino[1][0]+=1;
							deployTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
							display();
						}
            break;
        case 40:
            alert('down');
            break;
    }
};
}

function lowest_nonzero(arr){
	lowind = 0;
	for(i=0;i<arr.length;i++){
		if(arr[i]!=0){
			lowind=i;
		}
	}
	return lowind;
}

function display() {
	tileW = Math.min(height / boardH, width / boardW);
	startX = (width - tileW * boardW) / 2;
	for (i = 0; i < boardW; i++) {
		for (j = 0; j < boardH; j++) {
			c.fillStyle = colors[gridSpots[i][j]];
			c.fillRect(i * tileW + startX-1, j * tileW-1, tileW+1, tileW+1);
		}
	}
}

function deployTet(tet,xi,yi) {
	for (x = 0; x < tet.length; x++) {
		for (y = 0; y < tet[x].length; y++) {
			if(tet[x][y]!=0){
				gridSpots[Math.floor(x + boardW / 2 - 1)+xi][y+yi] = tet[x][y];
			}
		}
	}
}

function eraseTet(tet,xi,yi){
	for (x = 0; x < tet.length; x++) {
		for (y = 0; y < tet[x].length; y++) {
			gridSpots[Math.floor(x + boardW / 2 - 1)+xi][y+yi] = 0;
		}
	}
}

function spawnRand(){

}

function update() {
	eraseTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);

	var flag = false;
	if(frameNum==0){
		outer_loop:
		for (x = 0; x < tetrimino[0].length; x++) {
			y=lowest_nonzero(tetrimino[0][x]);
			if(tetrimino[0][x][y]!=0){
				if(y+tetrimino[1][1]==boardH-1){
						deployTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
						tetrimino[0]=tet2;
						tetrimino[1]=[0,0];
						flag = true;
					}
				else if(gridSpots[tetrimino[1][0]+Math.floor(x + boardW / 2 - 1)][y+tetrimino[1][1]+1]!==0){
						deployTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
						tetrimino[0]=tet2;
						tetrimino[1]=[0,0];
						flag = true;
					}
			}
			if(flag){
				break outer_loop;
			}
		}
		tetrimino[1][1]+=1;
	}
	deployTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
	display();
	frameNum=(frameNum+1)%frameRate;
}
