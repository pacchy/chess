var Square = function(row, col){
		this.row=row+1;
		this.file=String.fromCharCode(104-col);
		this.highlight = false;
		this.id= this.row.toString()+this.file.toString();
	};

var Piece = function(position, colour){
    this.position = position;
    this.colour = colour;
	this.moveList = [];
	this.id=this.position.row.toString()+this.position.col.toString();
};

var Position = function(row, file){
    this.file = file;
    this.row = row;
    this.col = 104-file.charCodeAt(0);
};

var Row = function(){
	this.squares = [];
	this.number = 0;
};

var Board = function(){
	var self = this;
	this.rows= [];
	this.getSquare = function(row, file){
		var col =104-file.charCodeAt(0);
		return self.rows[row-1].squares[col];
	};
	
	this.canIMoveHere = function(piece, to){
        var res = {};
        res.canMove = false;
        res.takePiece = false;
		res.sameColourPiece = false;
        var square = self.getSquare(to.charAt(1), to.charAt(0));
        boardPiece = square.piece;
        
        if(boardPiece != null || boardPiece != undefined){
            if(boardPiece.colour == piece.colour){
                res.canMove = false;
				res.sameColourPiece = true;
            }
            else{
                res.canMove = true;
                res.takePiece = true;
            }
        }
        else{
            res.canMove = true;
        }
        
        return res;
    };
	
};

var Rook = function(position, colour){
	Piece.call(this, position, colour);
	this.moveList.push(moves.straightAhead);
};
Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;