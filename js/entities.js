var Game = function(){
	this.players = [];
	this.init = function(){
	  this.players.push(new Player('player1', true));
	  this.players.push(new Player('player2', false));
	};

	this.sit = function(playerNumber, playingWhite){
	var otherPlayer = null;	
	if(playerNumber == 0) {otherPlayer = 1;} else {otherPlayer=0;}	
	this.players[playerNumber].playing = true;
	this.players[playerNumber].playingWhite = playingWhite;
	this.players[otherPlayer].playingWhite = !playingWhite;
	};

	this.playingWhite = function(playerNumber){
	 if(this.players[playerNumber].playingWhite){return true;} else {return false;}
	};
};

var Player = function(playerName, playingWhite){
	this.playerName = playerName;
	this.playingWhite = playingWhite;
	this.playing = false;
};

var Square = function(row, col){
		this.row=row+1;
		this.file=String.fromCharCode(104-col);
		this.highlight = false;
		this.id= this.row.toString()+this.file.toString();
		this.position = this.file.toString()+this.row.toString();
	};

var Position = function(row, file){
    this.file = file;
    this.row = row;
    this.col = 104-file.charCodeAt(0);
    this.toString = function(){return this.file+this.row.toString()};
};

var Row = function(){
	this.squares = [];
	this.number = 0;
};

var Piece = function(position, colour){
    this.position = position;
    this.colour = colour;
	this.moveList = [];
    this.filters = [board.canIMoveHere];
	this.id=this.position.row.toString()+this.position.col.toString();
};

var Rook = function(position, colour){
	Piece.call(this, position, colour);
	this.moveList.push(moves.straight);

	var hasMoved = false;
	this.moved = function(){ hasMoved = true;}
    this.hasMoved = function(){
	if(hasMoved){return true;}
        if((this.colour == "white" && this.position.row == 1 && (this.position.file == 'a' || this.position.file == 'h')) || (this.colour == "black" && this.position.row == 8 && (this.position.file == 'a' || this.position.file == 'h'))){
            return false; 
        }else {return true;}    };
};

var Knight = function(position, colour){
	Piece.call(this, position, colour);
	this.moveList.push(moves.L);    
};

var Bishop = function(position, colour){
	Piece.call(this, position, colour);
	this.moveList.push(moves.cross);    
};

var Queen = function(position, colour){
	Piece.call(this, position, colour);
	this.moveList.push(moves.straight);
    this.moveList.push(moves.cross);
};

var King = function(position, colour){
	Piece.call(this, position, colour);
	this.moveList.push(moves.straight);
    this.moveList.push(moves.cross);
    this.filters.push(board.kingMoves);
    //this.filters.push(board.kingMoves);
    
	var hasMoved = false;
	this.moved = function(){ hasMoved = true;}
    this.hasMoved = function(){
	if(hasMoved){return true;}	
        if((this.colour == "white" && this.position.row == 1 && this.position.file == 'e') || (this.colour == "black" && this.position.row == 8 && this.position.file == 'e')){
            return false; 
        }else {return true;}

    };
};

var Pawn = function(position, colour){
	Piece.call(this, position, colour);
	var hasMoved = false;
	this.moveList.push(moves.straight);
    this.moveList.push(moves.cross);
    this.hasMoved = function(){
        if(hasMoved){return true;}
        if((this.colour == "white" && this.position.row == 2) || (this.colour == "black" && this.position.row == 7)){
            return false; 
        }else {return true;}
    };
    this.filters.push(board.pawnMoves);
    this.filters.push(board.pawnEnpassMoves);
    this.moved = function(){ hasMoved = true;}
};

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;
