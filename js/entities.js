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

var Board = function(){
	var self = this;
	this.Moves = [];
	this.whitePieces = [];
	this.blackPieces = [];
	this.rows= [];
	this.getSquare = function(row, file){
		var col =104-file.charCodeAt(0);
		return self.rows[row-1].squares[col];
	};
    
	this.Move = function(from, to){
		var fromSquare = self.getSquare(from.charAt(0), from.charAt(1));
		var piece = fromSquare.piece; 		
		var toSquare = self.getSquare(to.charAt(0), to.charAt(1));
		var moveTo = to.charAt(1) + to.charAt(0);
		var validMoves = evaluate.evaluateMove(piece);
		if(validMoves.possibleMoves.indexOf(moveTo) >-1){
			toSquare.piece = piece;
			piece.square = toSquare;
			piece.position = new Position(to.charAt(0), to.charAt(1));
			fromSquare.piece = undefined;
			self.Moves.push({from, to});
			if (piece.moved != undefined) {piece.moved();}
		}
		self.clearGuide();
	};
	    this.clearGuide = function(){
		for(var i in this.rows){
		    for(var j in this.rows[i].squares){
			this.rows[i].squares[j].selected = false;
			this.rows[i].squares[j].highlight = false;
		    }
		}
	    };

	
	var adversaryPieces = function(colour){
		if(colour == 'black'){return self.whitePieces} else{return self.blackPieces};  
	};
	
	this.canAdversaryLandHere = function(piece, to){
		var adversaryCanLand = false;
		var adversaries = adversaryPieces(piece.colour);
		for(var i in adversaries){
			var adversary = adversaries[i];
			var adversaryMoves = null;
			if(adversary instanceof King) {
			//ignore adversary moves evaluation for adversary king.
			adversaryMoves = evaluate.evaluateMove(adversary, true);
			}else{
			 adversaryMoves = evaluate.evaluateMove(adversary);
			}			
			var validMoves = adversaryMoves.supportMoves;
			if (!(adversary instanceof Pawn)){
				validMoves = validMoves.concat(adversaryMoves.possibleMoves);}
			if(validMoves != null && validMoves != undefined && validMoves.indexOf(to) >-1){
				return true;
			}			
		}
		return adversaryCanLand;
	};
	
	this.placePiece = function(piece, row, col){
		var square = self.getSquare(row, col);
		square.piece = piece;
		square.piece.square = square;
		if(piece.colour == 'white'){
			self.whitePieces.push(piece);
		}else {self.blackPieces.push(piece);}
	};
	
	this.canIMoveHere = function(piece, to, supportMoveCheck){
        var res = {};
        res.canMove = false;
        res.breakProbe = false;
		
        var square = self.getSquare(to.charAt(1), to.charAt(0));
        boardPiece = square.piece;
        
        if(boardPiece != null || boardPiece != undefined){
            res.breakProbe = true;
	    if(boardPiece.colour == piece.colour){
                res.canMove = false;
		res.supportMove = true;
            }
            else{
                res.canMove = true;
            }
            
	    if(boardPiece.colour != piece.colour && (boardPiece instanceof King))
	    {	res.breakProbe = false; res.supportMove = true;
		}

	    if(boardPiece.colour != piece.colour && boardPiece.position.file==piece.position.file && (piece instanceof Pawn))
	    {	res.canMove = false;
        	}
        }
        else{
            res.canMove = true;
        }
        
	if(supportMoveCheck!= undefined && supportMoveCheck=='supportCheck'){if (res.canMove) { res.canMove = false; res.supportMove = true;}}
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
        
	if(piece.position.file == toPos.file || moveCount!=1){res.supportMove = false;}
        if(moveCount == 1 && piece.position.file != toPos.file){
		//supported if same piece or no piece but cant move
	    if(boardPiece == null ||(boardPiece != null && boardPiece != undefined && boardPiece.colour == piece.colour)) {res.supportMove = true;}
            
	    if(boardPiece != null && boardPiece != undefined && boardPiece.colour != piece.colour){
                res.canMove = true;
            }
            else{
                //enpassment check
                var lastMove = self.Moves[self.Moves.length-1];
		var toRow = parseInt(to.charAt(1));
		var lastMovedPiece = lastMove != undefined ? self.getSquare(lastMove.to.charAt(0), lastMove.to.charAt(1)).piece : undefined;
		if (lastMove != undefined &&  lastMove.from.charAt(1)==to.charAt(0) && Math.abs(parseInt(lastMove.from.charAt(0))-parseInt(lastMove.to.charAt(0))) == 2 && lastMovedPiece!= undefined && (lastMovedPiece instanceof Pawn)){res.canMove = true;}else{
		res.canMove = false;}
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
	
	//king moves confirm
	this.kingMoves = function(piece, to, ignoreAdversary){
        var res = {};
        res.canMove = false;
        res.breakProbe = false;
		
        var toPos = new Position(to.charAt(1), to.charAt(0));
        var fromPos = piece.position;
        var moveCount = toPos.row - fromPos.row;
        if(toPos.row == fromPos.row) {moveCount = toPos.col-fromPos.col};
        moveCount = moveCount < 0 ? Math.abs(moveCount): moveCount;
        
        if(moveCount ==1){
            res.breakProbe = false;
            res.canMove = true;
			
			if(!ignoreAdversary){
			//no adversary piece can land or support
				if( board.canAdversaryLandHere(piece, to)){
					res.canMove = false;
				}
			}
		
        } 
		//castleing, king, rook should not have moved
		//no pieces in between
		//no adversary piece can land between / on king and rook
		//then can castle
	else if(moveCount == 2){
	    res.breakProbe = true;
		
	    if(ignoreAdversary){res.canMove = false; return res;}
            if( board.canAdversaryLandHere(piece, piece.square.position)){
				res.canMove = false;
				return res;
				}
	    if(piece.hasMoved() || piece.position.row != toPos.row){
                res.canMove = false;
            }else{
		var asciiCode = toPos.file.charCodeAt(0);
		for(var i=1;i<5;i++){
			var col = toPos.col>fromPos.col ? asciiCode-i+2: asciiCode+i-2;
			var file = String.fromCharCode(col);
			if (col>104 || col<97){break;}		 
			var square = board.getSquare(fromPos.row, file);
			if(col==104 || col==97){ 
				var rookPiece = square.piece;
				if(rookPiece == null || !(rookPiece instanceof Rook) || rookPiece.colour != piece.colour || rookPiece.hasMoved()){res.canMove = false; break;}	
				if( board.canAdversaryLandHere(piece, square.position)){
				res.canMove = false;
				break;
				}
			}else{
			if(square.piece != null) {res.canMove = false; break;} else{
			if( board.canAdversaryLandHere(piece, square.position)){
				res.canMove = false;
				break;
			}
			res.canMove = true;} }
		}
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
    this.filters.push(moveFilters.kingMoves);
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
    this.filters.push(moveFilters.pawnMoves);
    this.filters.push(board.pawnMoves);
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
