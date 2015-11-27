var gameBoard = [];
function tile() {
	this.isMine = false;
	this.clicked = false;
	this.flagged = false;
}
function generateGameBoard() {
	gameBoard = [];
	for (var i=0;i<8;i++) {
		gameBoard.push([]);
		for (var j=0;j<8;j++){
			gameBoard[i].push(new tile());
		}
	}
	placeMines();
}
function placeMines(){
	for (k=0;k<10;k++){
		var x =Math.floor(Math.random()*8);
		var y =Math.floor(Math.random()*8);
		if (gameBoard[y][x].isMine == true){
			k--;
		}
		else {
			gameBoard[y][x].isMine = true;		
		}
	}
}
$('button#newGame').click(newGame);
function newGame(){
	for (var i=0;i<64;i++){
		$($('.mine-cell')[i]).html('');
		$($('.mine-cell')[i]).css("color", "#de4e2a");
		$($('.mine-cell')[i]).css("background-color","")
	}
	var gameBoard = generateGameBoard();
	minesFlagged = 0;
	$('#flagged').html('Flagged: ' + minesFlagged +'/10')
	$('button#showMines').html('Show Mines');
	$('#mine-alert').html('');
	showMines = false;
	gameOver = false; 
}
newGame();
var showMines = false;
$('button#showMines').click(function() {
	if (gameOver == false){
		if (showMines == false){
			showMines = true;
			$('button#showMines').html('Hide Mines');
			for (var y=0;y<8;y++){
				for (var x=0;x<8;x++){
					if (gameBoard[y][x].isMine == true){
						$($('.mine-cell')[(y*8)+x]).html('X');
					}
					else if (gameBoard[y][x].flagged == true){
						$($('.mine-cell')[(y*8)+x]).css("color","#de4e2a")					
					}
				}
			}
		}
		else {
			showMines = false;
			$(this).html('Show Mines');
			for (var y=0;y<8;y++){
				for (var x=0;x<8;x++){
					if (gameBoard[y][x].flagged == true){
						$($('.mine-cell')[(y*8)+x]).html('!');
						$($('.mine-cell')[(y*8)+x]).css("color","#de4e2a")		
					}
					else if (gameBoard[y][x].isMine == true){
						$($('.mine-cell')[(y*8)+x]).html('');
					}
				}	
			}
		}
	}		
});
function countNeighborMines(x,y) {
	var neighborMines = 0;
	for (var n=y-1;n<y+2;n++){
		for (var o=x-1;o<x+2;o++){
			if (o > -1 && o < 8 && n > -1 && n <8){
				if (gameBoard[n][o].isMine == true){
					neighborMines++;
				}
			}
		}
	}
	return neighborMines;
}				
var minesFlagged = 0;
$('.mine-cell').bind('contextmenu',function() { return false; 	});
$('.mine-cell').mousedown(function(event){
	var x = $(this).index();
	var y = $(this).parent().index();
	switch (event.which){
		case 1:	
			leftClick(x,y);
			break;
		case 2:
			break
		case 3:
			event.preventDefault();
			if (gameBoard[y][x].flagged != true ){
				minesFlagged++
				$('#flagged').html('Flagged: ' + minesFlagged +'/10')
				gameBoard[y][x].flagged = true;
				$(this).html('!');
			}
			

			break
		default:
			break
	}
});
function leftClick(x,y){
	if (gameOver == false){
		if (gameBoard[y][x].clicked == false) {
	    gameBoard[y][x].clicked = true;
			var neighborMines = countNeighborMines(x,y);
			if (neighborMines == 0){
				$($('.mine-cell')[(y*8)+x]).css("background-color","#de4e2a");
				$($('.mine-cell')[(y*8)+x]).css("color","white");
				for (var i=y-1;i<y+2;i++){
					for (var j=x-1;j<x+2;j++){
						if (i > -1 && i < 8 && j > -1 && j <8){
							leftClick(j,i);
						}
					}
				}
			}
			else if (gameBoard[y][x].isMine == false){
				$($('.mine-cell')[(y*8)+x]).html(neighborMines);
				$($('.mine-cell')[(y*8)+x]).css("background-color","#de4e2a");
				$($('.mine-cell')[(y*8)+x]).css("color","white");
				if (gameBoard[y][x].flagged == true){
					gameBoard[y][x].flagged = false;
					minesFlagged--;
					$('#flagged').html('Flagged: ' + minesFlagged +'/10')
				}	
			}
			else if (gameBoard[y][x].isMine == true){
				for (var k=0;k<8;k++){
					for (var l=0;l<8;l++){
						if (gameBoard[k][l].isMine == true){
							$($('.mine-cell')[(k*8)+l]).html('X');
							$($('.mine-cell')[(y*8)+x]).css("background-color","#1e9ddc");
							$($('.mine-cell')[(y*8)+x]).css("color","white");

						}
					}
				}
				$('#mine-alert').html("KABOOM!");
				gameOver = true;			
			}	
		}
	}		 
}
$('button#validate').click(function checkBoard(){
	if (gameOver == false){
		var unflaggedMines = 0;
		var wrongFlags = 0;
		for (var y=0;y<8;y++){
			for (var x=0;x<8;x++){
				if (gameBoard[y][x].flagged == true && gameBoard[y][x].isMine == false){
					$($('.mine-cell')[(y*8)+x]).css("color", "white");
					$($('.mine-cell')[(y*8)+x]).css("background-color","#1e9ddc");
					wrongFlags++;
				}
				if (gameBoard[y][x].isMine == true && gameBoard[y][x].flagged == false ){
					$($('.mine-cell')[(y*8)+x]).html('X');
					$($('.mine-cell')[(y*8)+x]).css("color", "white");
					$($('.mine-cell')[(y*8)+x]).css("background-color","#1e9ddc");

					unflaggedMines++;
				}
			}
		}
		if (unflaggedMines == 0 && wrongFlags == 0){
			for (var i=0;i<8;i++){
				for (var j=0;j<8;j++){
					if (gameBoard[i][j].flagged == true){
						$($('.mine-cell')[(i*8)+j]).css("background-color","#1e9ddc");
						$($('.mine-cell')[(i*8)+j]).css("color", "white");
					}
				}
			}
			$('#mine-alert').html("You win!");
		}
		else {
			$('#mine-alert').html("You lose!");
			gameOver = true;
		}
	}	
})
var gameOver = false;	