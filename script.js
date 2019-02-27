width = document.body.clientWidth;
height = document.body.clientHeight;

var boardW = 10;
var boardH = 20;
var frameNum = 0;
var frameRate = 100;
var gridSpots = [];
var lines = 0;

var tet1 = [[1, 1, 1, 1]];
var tet2 = [[2, 2, 2], [2, 0, 0]];
var tet3 = [[3,0,0], [3, 3, 3]];
var tet4 = [[0, 7], [7, 7], [7,0]];
var tet5 = [[6, 6, 6], [0, 6, 0]];
var tet6 = [[5,0], [5, 5], [0, 5]];
var tet7 = [[4, 4], [4, 4]];
var tets = [tet1,tet2,tet3,tet4,tet5,tet6,tet7];
var fast = false;

var tetrimino = [tet1,[0,0]];
spawnRand();

var colors = ['rgb(85, 85, 85)',
							'rgb(81, 208, 255)',
							'rgb(64, 109, 214)',
							'rgb(252, 187, 65)',
							'rgb(247, 240, 34)',
							'rgb(131, 255, 107)',
							'rgb(157, 76, 211)',
							'rgb(244, 66, 66)'];

for (i = 0; i < boardW; i++) {
	var column = [];
	for (j = 0; j < boardH; j++) {
		column.push(0);
	}
	gridSpots.push(column);
}

window.onload = function () {
	document.getElementById('canvas').width = width;
	document.getElementById('canvas').height = height;
	c = document.getElementById('canvas').getContext('2d');
	c.fillStyle = 'rgb(55,55,55)';
	c.fillRect(0, 0, width, height);
	animate = setInterval(update, 1000 / frameRate);
	document.onkeyup = function(e){
		switch (e.keyCode) {
				case 40:
						fast = false;
						frameNum = 0;
						break;
		}
	} 
	document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
						if(tetrimino[1][0]>0){
							eraseTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
							if(collision([tetrimino[0],[tetrimino[1][0]-1,tetrimino[1][1]]]) === false){
								tetrimino[1][0] -= 1;
							}
							deployTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
							display();
						}
            break;
        case 39:
            if(tetrimino[1][0]< boardW - tetrimino[0].length){
							eraseTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
							if(collision([tetrimino[0],[tetrimino[1][0]+1,tetrimino[1][1]]]) === false){
								tetrimino[1][0] += 1;
							}
							deployTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
							display();
						}
            break;
        case 90:
						eraseTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
						if(collision(rotate(tetrimino)) == false){
							tetrimino = rotate(tetrimino);
						}
						deployTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
						display();
            break;
				case 88:
						eraseTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
						if(collision(rotate_b(tetrimino)) == false){
							tetrimino = rotate_b(tetrimino);
						}
						deployTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
						display();
            break;
				case 40:
						fast = true;
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
	c.fillStyle = 'rgb(55,55,55)';
	c.fillRect(0, 0, width, height);
	c.fillStyle = 'white';
	c.font = width/18.5 + "px Pixelated"
	c.fillText("LINES:" + lines,width/25,width/10);
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
				gridSpots[x+xi][y+yi] = tet[x][y];
			}
		}
	}
}

function eraseTet(tet,xi,yi){
	for (x = 0; x < tet.length; x++) {
		for (y = 0; y < tet[x].length; y++) {
			if(tet[x][y]!=0){
				gridSpots[x+xi][y+yi] = 0;
			}
		}
	}
}

function collision(tet){
	for(tetx = 0; tetx < tet[0].length; tetx++){
		for(tety = 0; tety < tet[0][tetx].length; tety++){
			if(tet[0][tetx][tety] !== 0 && gridSpots[tetx+tet[1][0]][tety+tet[1][1]] !== 0){
				return true;
			}
		}
	}
	return false;
}

function spawnRand(){
	tetrimino[1]=[Math.floor(boardW / 2 - 1),-1];
	tetrimino[0]=tets[Math.floor(7*Math.random())];
}

function rotate(tet){
	new_tet = []
	for(ytet = 0; ytet < tet[0][0].length; ytet++){
		new_tet.push([])
		for(xtet = 0; xtet < tet[0].length; xtet++){
			new_tet[ytet].unshift(tet[0][xtet][ytet]);
		}
	}
	return [new_tet,tet[1]];
}

function rotate_b(tet){
	new_tet = []
	for(ytet = 0; ytet < tet[0][0].length; ytet++){
		new_tet.unshift([])
		for(xtet = 0; xtet < tet[0].length; xtet++){
			new_tet[0].push(tet[0][xtet][ytet]);
		}
	}
	
	return [new_tet,tet[1]];
}

function clearLines(){
	for(gy=0;gy<boardH;gy++){
		var full = true;
		for(gx=0;gx<boardW;gx++){
			if(gridSpots[gx][gy]===0){
				full = false;
			}
		}
		if(full){
			lines+=1;
			for(cy=gy;cy>0;cy--){
				for(cx=0;cx<boardW;cx++){
					gridSpots[cx][cy]=gridSpots[cx][cy-1];
				}
			}
		}
	}
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
						clearLines();
						spawnRand();
						flag = true;
					}
				else if(gridSpots[tetrimino[1][0]+x][y+tetrimino[1][1]+1]!==0){
						deployTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
						clearLines();
						spawnRand();
						flag = true;
					}
			}
			if(flag){
				break outer_loop;
			}
		}
		tetrimino[1][1]+=1;
		if(collision(tetrimino)){
			clearInterval(animate);
			return 0;
		}
	}
	deployTet(tetrimino[0],tetrimino[1][0],tetrimino[1][1]);
	display();

	speed = 16;
	if(fast){
		speed = 5120;
	}
	frameNum=(frameNum+1)%(frameRate/speed);
}
