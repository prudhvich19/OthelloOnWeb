
othello = []
Player = 'x';
allMoves = [];

$(document).ready(function(){
    
    othello = [ '--------'.split(''),
				'--------'.split(''),
				'--------'.split(''),
				'---WB---'.split(''),
				'---BW---'.split(''),
				'--------'.split(''),
				'--------'.split(''),
				'--------'.split('')
			];
    
    
    setHtmlBoard(othello);
   // displayOthello(othello);
	displayCountBW(othello);		
});


function getHtmlBoard() {

    othello = [];
    for(i = 10; i <=80; i += 10){
        var str = "";
        for(j = 1; j <= 8 ; j++) {

            var num = i + j + "";
            
            if(document.getElementById(num).innerHTML === ""){
                str += "-";
                console.log("\n" + str);
                continue;
            }
            str += document.getElementById(num).innerHTML;
        }
        
        othello.push(str.split(""));
    }

    return othello;
}

function setHtmlBoard(othello) {

    for(i = 0; i < 8; i++) {
        for(j = 0; j < 8; j++) {
			id = (i) + '' + (j);
			console.log("id " + id + "---" + othello[i][j]);
            if(othello[i][j] !== '-') {
               // id = (i) + '' + (j);
               // console.log("id " + id + "---" + othello[i][j]);
				document.getElementById(id).innerHTML = othello[i][j];
				 
				if(othello[i][j] === 'B')
					document.getElementById(id).style.color = "black";
				
				else (othello[i][j] === 'W') 
					document.getElementById(id).style.color = "white";
				

			}
			else {
                id = (i) + '' + (j);
                //console.log("id " + id + "---" + othello[i][j]);
				document.getElementById(id).innerHTML = "";
				document.getElementById(id).style.color = "null";
            }
        }
    } 
    
}

function showAvailableMoves(moves){

    for(i=0; i < moves.length; i++){
        console.log(moves[i]);
		document.getElementById(moves[i]).innerHTML = "X";
		//document.getElementById(id).className = "availableSquare";
       document.getElementById(moves[i]).style.color = "rgb(211, 107, 38)";
    }
    

}

function initCurMove() {
    
    player = document.querySelector('input[name="players"]:checked').value;
    console.log(player);
	document.getElementById("displayPlayer").innerHTML = player;
	
	document.querySelector('input[value="W"]').disabled = true;
	document.querySelector('input[value="B"]').disabled = true;
	setPlayer(player);
    playGame();
}


function getValidMoves1(othello) {

	player = getPlayer();
	opponent = (player == 'W')? 'B':'W';

	movesList = [];

	for(m = 0; m < 8; m++) { 
		for(n = 0; n < 8; n++) {

            char = othello[m][n];

            if(char === opponent) {
				list = [];
				
				if(m > 0)
                if(othello[m - 1][n] === '-'){
					list = isFlippable(m - 1, n, othello)
                    if(!(list.length === 0)) {
                        for(z = 0; z < list.length; z++)
							movesList.push(list[z]);
                    }
                }
			
			
				if(m < 7)
                if(othello[m + 1][n] === '-') {
					list = isFlippable(m + 1, n, othello)
                    if(!(list.length === 0)){
						for(x = 0; x < list.length; x++)
							movesList.push(list[x]);
                    }
				}
				
				if(n > 0)
                if(othello[m][n - 1] === '-') {
					list = isFlippable(m, n -  1, othello);
                    if(!(list.length === 0)){
						for(x = 0; x < list.length; x++)
							movesList.push(list[x]);
					}
                }

				if(n < 7)
                if(othello[m][n + 1] === '-') {
                    list = isFlippable(m, n +  1, othello);
                    if(!(list.length === 0)){
						for(x = 0; x < list.length; x++)
							movesList.push(list[x]);
                    }

				}
				
				if(m > 0 && n > 0)
				if(othello[m - 1][n - 1] === '-') {
					list = isFlippable(m - 1, n -  1, othello);
                    if(!(list.length === 0)){
						for(x = 0; x < list.length; x++)
							movesList.push(list[x]);
                    }
				}

				if(m > 0 && n < 7)
				if(othello[m - 1][n + 1] === '-'){
					list = isFlippable(m - 1, n + 1, othello);
                    if(!(list.length === 0)){
						for(x = 0; x < list.length; x++)
							movesList.push(list[x]);
                    }
				}

				if(m < 7 && n > 0)
				if(othello[m + 1][n - 1] === '-'){
					list = isFlippable(m + 1, n -  1, othello);
                    if(!(list.length === 0)){
                        for(x = 0; x < list.length; x++)
							movesList.push(list[x]);
                    }
				}

				if(m < 7 && n < 7)
				if(othello[m + 1][n + 1] === '-'){
					list = isFlippable(m + 1, n + 1, othello);
                    if(!(list.length === 0)){
						for(x = 0; x < list.length; x++)
							movesList.push(list[x]);
                    }
				}

            }
        }
    
	}
	return movesList;
}

function isFlippable(k, l, othello) {

	player = getPlayer();
	moves = [];

	temp2d = [[],[],[],[],[],[],[],[]];
	for(a = 0;  a < 8; a++)
    	for( b = 0; b < 8; b++)
			temp2d[a][b] = othello[a][b];
	
	temp2d[k][l] = player;

	regex = (player == 'W') ? "^WB+W$" : "^BW+B$";
	regex = new RegExp(regex);

	i = k; j = l;
	str = "";

	while ( i >= 0 && !str.includes("-")) {
		str += temp2d[i--][j];
		
		if (regex.test(str))
			moves.push("a" + k + "" + l + "" + (str.length - 2));
	}

	
	str = "";
	i = k; j = l;
	while (i < 8 && !str.includes("-")) {
	str += temp2d[i++][j];
	
		if (regex.test(str))
			moves.push("b" + k + "" + l + (str.length - 2));
	}
	


	str = "";
	i = k; j = l;
	while ( j >= 0 && !str.includes("-")) {
		str += temp2d[i][j--];
		
		if (regex.test(str)){
			moves.push("l" + k + "" + l + (str.length - 2));
		}
	}
	

	str = "";
	i = k; j = l;
	while ( j < 8 && !str.includes("-")) {
		str += temp2d[i][j++];
		if (regex.test(str))
			moves.push("r" + k + "" + l + (str.length - 2));
	}
	
	
	str = "";
	i = k; j = l;
	while ((i >= 0 && j >= 0) && !str.includes("-")) {
		str += temp2d[i--][j--];
		if (regex.test(str))
			moves.push("w" + k + "" + l + (str.length - 2));
	}
	
	str = "";
	i = k; j = l;
	while ((i >= 0 && j < 8) && !str.includes("-")) {
		str += temp2d[i--][j++];
		if (regex.test(str))
			moves.push("x" + k + "" + l + (str.length - 2));
	}
	
	
	str = "";
	i = k; j = l;
	while ( (i < 8 && j >= 0) && !str.includes("-")) {
		str += temp2d[i++][j--];
		if (regex.test(str))
			moves.push("y" + k + "" + l + (str.length - 2));
	}
	
	str = "";
	i = k; j = l;
	while ( (i < 8 && j < 8) && !str.includes("-")) {
		str += temp2d[i++][j++];
		if (regex.test(str))
			moves.push("z" + k + "" + l + (str.length - 2));
	}
	
	i = k; j = l;
	return moves;
}


function doPlayerMove(i, j, allMoves, othello )  {

	
	//i = parseInt(input.slice(1,2), 10) - 1;
	//j =  parseInt(input.slice(2), 10) - 1;

	var flips = 0;
	var direction = '';

	var plMoves= [];

	var index = i + '' + j;

	for(x in allMoves) {

		indexL = allMoves[x].slice(1,3);
		direction = allMoves[x].slice(0,1);
		flips = parseInt(allMoves[x].slice(3)) 

		if(index === indexL) {
            
            console.log("i: " + i + " ,j: " + j + ", flips: " +flips + ", dir: " + direction);
			othello = doFlip(othello, i , j, flips, direction);
			plMoves.push(allMoves[x]);
		}

	}
	return othello;
}


function doFlip(board, x, y, flips, dir) {

	player = getPlayer();

	newOthello = [[],[],[],[],[],[],[],[]];
	for(a = 0;  a < 8; a++)
    	for( b = 0; b < 8; b++)
		newOthello[a][b] = board[a][b];


	newOthello[x][y] = player;
	i = x; j = y;
    
    //console.log("Flipping: i: " + i + " ,j: " + j + ", flips: " +flips + ", dir: " + dir);
	if(dir == 'a') {
		x = 1;
		while(x <= flips ) {
			newOthello[i - x][j] = player;
			x++;
		}	
	}
	else if(dir === 'b') {
		x = 1;
		while(x <= flips ) {
			newOthello[i + x][j] = player;
			x++;
		}	
	}
	else if(dir === 'l') {
		x = 1;
		while(x <= flips ) {
			newOthello[i][j - x] = player;
			x++;
		}	
	}
	else if(dir === 'r') {
		x = 1;
		while(x <= flips ) {
			newOthello[i][j + x] = player;
			x++;
		}	
	}
	else if(dir == 'w'){
		x = 1;
		while(x <= flips ) {
			newOthello[i - x][j - x] = player;
			x++;
		}
	}
	else if(dir === 'x'){
		x = 1;
		while(x <= flips ) {
			newOthello[i - x][j + x] = player;
			x++;
		}
	}
	else if(dir === 'y'){
		x = 1;
		while(x <= flips ) {
			newOthello[i + x][j - x] = player;
			x++;
		}
	}
	else if(dir === 'z'){
		x = 1;
		while(x <= flips ) {
			newOthello[i + x][j + x] = player;
			x++;
		}
	}

	return newOthello;

}



function displayCountBW(othello) {

	 countB = 0, countW = 0;
		
	for( i =0; i < 8; i++) {
		for( j =0; j < 8; j++) {		
			if(othello[i][j] === 'W')
				countW++;
			if(othello[i][j] === 'B')
				countB++;
		}
	}

	//console.log("Black - " + countB + " White - " + countW);
	document.getElementById("displayBlacks").innerHTML = countB + "";
	document.getElementById("displayWhites").innerHTML = countW + "";
}


function displayMoves(moves) {

	if(moves.length === 0) {
		//console.log('No legal Moves');
		
		changePlayer();
		
	}
	else{
		distinct = [];
		show = [];
		for(x in moves) {

			if( !distinct.includes(moves[x].slice(1,3)))
				distinct.push(moves[x].slice(1,3))
		}

		for(z in distinct){
			
			show.push(distinct[z].slice(0,1) + '' + distinct[z].slice(1));
		}
        //console.log(moves);
        showAvailableMoves(show);

	}
}


function displayOthello(othello) {

	
	console.log('  1 2 3 4 5 6 7 8');
	var i = 1;
	for(x in othello)
		console.log(`${i++}` + ' ' + othello[x].join(' '))

}


function setPlayer(character) {
	Player = character;
}


function getPlayer(character) {
	return Player;
}

function changePlayer() {
	if(Player === 'W')
			setPlayer('B');
	else if (Player === 'B')
			setPlayer('W');
	
	//console.log("Player Changed to: " + getPlayer());
}


function playGame() {
	
	
    validMoves = [];
    validMoves = getValidMoves1(othello);
    allMoves = validMoves;
	displayMoves(validMoves);

	if(allMoves.length === 0 ){
		document.getElementById('board').style.pointerEvents = 'none';
	}
	else{
		document.getElementById('board').style.pointerEvents = 'auto';
	$("#board td").click(function() {     
		var k = parseInt($(this).index());
		var l = parseInt($(this).parent().index());    
	    loop = true;
	   
		console.log("all moves " + allMoves);  
		othello = doPlayerMove(l, k, allMoves, othello);
		//displayOthello(othello);
		
		setHtmlBoard(othello);
		changePlayer();
		document.getElementById("displayPlayer").innerHTML = getPlayer();
		
		validMoves = getValidMoves1(othello);
		allMoves = validMoves;
		displayMoves(validMoves);
		displayCountBW(othello);
	});
	}
	
}


function quitGame() {

	location.reload();

}