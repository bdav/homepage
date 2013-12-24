var counter=1;
playGame();
function playGame() {
	$( ".game" ).click(function() {
		if ($( this ).html() =="" && $("#winner").html() =="") {
		  if (counter%2 != 0) 
		  	$( this ).html('X');
		  else 
		  	$( this ).html('O');
		  counter=counter+1;
		  $("#reset").html('reset');
		  checkTopRow();
		  checkMiddleRow();
		  checkBottomRow();
		  checkLeftColumn();
		  checkCenterColumn();
		  checkRightColumn();
		  checkDiag1();
		  checkDiag2();
		  checkCatsGame();
		}
	});	
}
function checkTopRow() {
	if ($("td#0").html() !=""){
		if ($(".ttttop")[0].innerText == $(".ttttop")[1].innerText && $(".ttttop")[0].innerText == $(".ttttop")[2].innerText){
			$('#winner').html($(".ttttop")[0].innerText+" wins!");
		}
	}
}
function checkMiddleRow() {
	if ($("td#3").html() !=""){
		if ($(".tttmiddle")[0].innerText == $(".tttmiddle")[1].innerText && $(".tttmiddle")[0].innerText == $(".tttmiddle")[2].innerText){
			$('#winner').html($(".tttmiddle")[0].innerText+" wins!");
		}
	}
}
function checkBottomRow() {
	if ($("td#7").html() !=""){
		if ($(".tttbottom")[0].innerText == $(".tttbottom")[1].innerText && $(".tttbottom")[0].innerText == $(".tttbottom")[2].innerText){
			$('#winner').html($(".tttbottom")[0].innerText+" wins!");
		}
	}
}
function checkLeftColumn() {
	if ($("td#0").html() !=""){
		if ($(".tttleft")[0].innerText == $(".tttleft")[1].innerText && $(".tttleft")[0].innerText == $(".tttleft")[2].innerText){
			$('#winner').html($(".tttleft")[0].innerText+" wins!");
		}
	}
}
function checkCenterColumn() {
	if ($("td#1").html() !=""){
		if ($(".tttcenter")[0].innerText == $(".tttcenter")[1].innerText && $(".tttcenter")[0].innerText == $(".tttcenter")[2].innerText){
			$('#winner').html($(".tttcenter")[0].innerText+" wins!");
		}
	}
}
function checkRightColumn() {
	if ($("td#2").html() !=""){
		if ($(".tttright")[0].innerText == $(".tttright")[1].innerText && $(".tttright")[0].innerText == $(".tttright")[2].innerText){
			$('#winner').html($(".tttright")[0].innerText+" wins!");
		}
	}
}function checkDiag1() {
	if ($("td#0").html() !=""){
		if ($(".tttdiag1")[0].innerText == $(".tttdiag1")[1].innerText && $(".tttdiag1")[0].innerText == $(".tttdiag1")[2].innerText){
			$('#winner').html($(".tttdiag1")[0].innerText+" wins!");
		}
	}
}
function checkDiag2() {
	if ($("td#2").html() !=""){
		if ($(".tttdiag2")[0].innerText == $(".tttdiag2")[1].innerText && $(".tttdiag2")[0].innerText == $(".tttdiag2")[2].innerText){
			$('#winner').html($(".tttdiag2")[0].innerText+" wins!");
		}
	}
}
function checkCatsGame() {
	for (var i=0;i<$(".game").length;i++) { 
		if ($(".game")[i].innerText !="") {
			if (i==8 && $("#winner").html() =="") {
				$("#winner").html("Cat's game!");
			}
		} else {
			return
		}
	}
}			
$("button#reset").click(function() {
	$(".game").html('');
	$( this ).html('');
	$("#winner").html('');
	counter=1;
});