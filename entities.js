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
    
    this.clearGuide = function(){
        for(var i in this.rows){
            for(var j in this.rows[i].squares){
                this.rows[i].squares[j].selected = false;
                this.rows[i].squares[j].highlight = false;
            }
        }
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
				res.supportMove = true;
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
    
    this.pawnMoves = function(piece, to){
        var res = {canMove: true, breakProbe:false};
        var toPos = new Position(to.charAt(1), to.charAt(0));
        var fromPos = piece.position;
        var moveCount = toPos.row - fromPos.row;
        var square = self.getSquare(to.charAt(1), to.charAt(0));
        boardPiece = square.piece;
        
        if(piece.colour == "black"){
            moveCount *= -1;
        }
        
        if(moveCount == 1 && piece.position.file != toPos.file){
            if(boardPiece != null && boardPiece != undefined && boardPiece.colour != piece.colour){
                res.canMove = true;
            }
            else{
                //if enpassment res.canMove = true;
                res.canMove = false;
            }
        }else if(moveCount == 2 && boardPiece != null && boardPiece != undefined){
            res.canMove = false;
        }
		return res;
    };
    
    this.kingMoves = function(piece, to){
        var res = {canMove: true, breakProbe:false};
        var toPos = new Position(to.charAt(1), to.charAt(0));
        var fromPos = piece.position;
        var moveCount = toPos.col - fromPos.col;
        var square = self.getSquare(to.charAt(1), to.charAt(0));
        boardPiece = square.piece;
        
        if(moveCount<0){ moveCount *= -1;}
        
        //no adversary piece can land
        
        //if 2. rook should not have moved
        //no pieces in between
        //no adversary piece can land between king and rook
        //then can castle
        
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
            if(fromPos.file != toPos.file){
                res.breakProbe = true;
                res.canMove = false;
            }else if(piece.hasMoved()){
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
        if(toPos.row == fromPos.row) {moveCount = toPos.col-fromPos.col};
        if(moveCount < 0) {moveCount = moveCount*-1;}
        
        //can go negative
        if(moveCount ==1){
            res.breakProbe = false;
            res.canMove = true;
        } else if(moveCount == 2){
            if(piece.hasMoved() || piece.position.row != toPos.row){
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
	this.moveList.push(moves.straight);    
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
    this.filters.push(moveFilters.kingMoves);
    //this.filters.push(board.kingMoves);
    
    this.hasMoved = function(){
        if((this.colour == "white" && this.position.row == 1 && this.position.file == 'e') || (this.colour == "black" && this.position.row == 8 && this.position.file == 'e')){
            return false; 
        }else {return true;}
    };
};

var Pawn = function(position, colour){
	Piece.call(this, position, colour);
	this.moveList.push(moves.straight);
    this.moveList.push(moves.cross);
    this.hasMoved = function(){
        if((this.colour == "white" && this.position.row == 2) || (this.colour == "black" && this.position.row == 7)){
            return false; 
        }else {return true;}
    };
	this.filters.push(moveFilters.pawnMoves);
    this.filters.push(board.pawnMoves);
	
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