var Square = function(row, col){
		this.row=row+1;
		this.file=String.fromCharCode(104-col);
		this.highlight = false;
		this.id= this.row.toString()+this.file.toString();
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
        res.breakProbe = false;
		
        var square = self.getSquare(to.charAt(1), to.charAt(0));
        boardPiece = square.piece;
        
        if(boardPiece != null || boardPiece != undefined){
            if(boardPiece.colour == piece.colour){
                res.canMove = false;
            }
            else{
                res.canMove = true;
            }
            res.breakProbe = true;
        }
        else{
            res.canMove = true;
        }
        
        return res;
    };
	
};

var MoveFilters = function(){	
	this.pawnMoves = function(piece, to){
        var res = {};
        res.canMove = false;
        res.breakProbe = false;
		
        var toPos = new Position(to.charAt(1), to.charAt(0));
        var fromPos = piece.position;
        var moveCount = toPos.row - fromPos.row;
        if(piece.colour == "black"){
            moveCount *= -1;
        }
        
        if(moveCount ==1){
            res.breakProbe = false;
            res.canMove = true;
        } else if(moveCount == 2){
            if(piece.hasMoved()){
                res.breakProbe = true;
                res.canMove = false;
            }else{
                res.breakProbe = true;
                res.canMove = true;
            }
        } else{
            res.breakProbe = true;
            res.canMove = false;
        }
		return res;
    };
	
	this.kingMoves = function(piece, to){
        var res = {};
        res.canMove = false;
        res.breakProbe = false;
		
        var toPos = new Position(to.charAt(1), to.charAt(0));
        var fromPos = piece.position;
        var moveCount = toPos.row - fromPos.row;
        if(moveCount < 0) {moveCount = moveCount*-1;}
        
        //can go negative
        if(moveCount ==1){
            res.breakProbe = false;
            res.canMove = true;
        } else if(moveCount == 2){
            if(piece.hasMoved()){
                res.breakProbe = true;
                res.canMove = false;
            }else{
                res.breakProbe = true;
                res.canMove = true;
            }
        } else{
            res.breakProbe = true;
            res.canMove = false;
        }
		return res;
    };
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
	this.moveList.push(moves.straightAhead);
    
};

var Pawn = function(position, colour){
	Piece.call(this, position, colour);
	this.moveList.push(moves.straightAhead);
    this.moveList.push(moves.cross);
    this.hasMoved = function(){
        if((this.colour == "white" && this.position.row == 2) || (this.colour == "black" && this.position.row == 7)){
            return false; 
        }else {return true;}
    };
	this.filters.push(moveFilters.pawnMoves);
	
};

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;