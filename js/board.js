var Board = function(){
	var self = this;
	this.Moves = [];
	this.whitePieces = [];
	this.blackPieces = [];
	this.rows= [];
	this.takenPieces = [];
	this.whiteToMove = true;
	this.whiteRows = [];
	this.playingRows = null;
	this.getWhiteRows = function(showWhite){

		if(showWhite){
			return self.whiteRows;
		}else{
			return self.rows;
		}

	}

	this.getSquare = function(row, file){
		var col =104-file.charCodeAt(0);
		return self.rows[row-1].squares[col];
	};
	
	this.init = function(){
		var squareWhite = true;
		for(var i=0;i<8;i++){
			squareWhite=!squareWhite;
			var newRow = new Row();
			newRow.squares = [];
			self.rows.push(newRow);
			for(var j=0;j<8;j++){
				var newSquare = new Square(i,j);
				if (squareWhite) {newSquare.colour=true;}else{newSquare.colour=false;}
				squareWhite=!squareWhite;
				newRow.squares.push(newSquare);
			}
		}

		for (var i = 7; i >= 0; i--) {
			var newRow = new Row();
			newRow.squares = [];
			self.whiteRows.push(newRow);
			for (var j = 7; j >= 0; j--) {
				newRow.squares.push(self.rows[i].squares[j]);
			};
		};

		self.playingRows = self.whiteRows;
		
	};
    
	this.Move = function(from, to){
		var fromSquare = self.getSquare(from.charAt(0), from.charAt(1));
		var piece = fromSquare.piece; 		
		var toSquare = self.getSquare(to.charAt(0), to.charAt(1));
		var moveTo = to.charAt(1) + to.charAt(0);
		var validMoves = evaluate.evaluateMove(piece);
		if(validMoves.possibleMoves.indexOf(moveTo) >-1){
			var toPos = new Position(to.charAt(0), to.charAt(1));
			var fromPos = new Position(from.charAt(0), from.charAt(1));			
			if (toSquare.piece != undefined) {toSquare.piece.square = undefined; self.takenPieces.push(toSquare.piece);}			
			if (piece instanceof Pawn && Math.abs(toPos.col-fromPos.col)==1 && Math.abs(toPos.row-fromPos.row)==1 && toSquare.piece == undefined){
				var adversaryPawnSquare = self.getSquare(fromPos.row, toPos.file);
				adversaryPawnSquare.piece.square = undefined;
				self.takenPieces.push(adversaryPawnSquare.piece);
				adversaryPawnSquare.piece = undefined;	
			}

			toSquare.piece = piece;
			piece.square = toSquare;
			piece.position = new Position(to.charAt(0), to.charAt(1));
			fromSquare.piece = undefined;
			self.Moves.push({from, to});
			if (piece.moved != undefined) {piece.moved();}
			if (piece instanceof King && Math.abs(toPos.col-fromPos.col)==2){
				//castle
				var rookFromFile = null, rookToFile = null;
				if(toPos.file == 'c') {rookFromFile = 'a';rookToFile='d';} else {rookFromFile='h';rookToFile='f';}
				var rookFromSquare = self.getSquare(toPos.row, rookFromFile);
				var rookToSquare = self.getSquare(toPos.row, rookToFile);
				rookToSquare.piece = rookFromSquare.piece;
				rookToSquare.piece.position = new Position(toPos.row, rookToFile);
				rookFromSquare.piece = undefined;
			}

			
			self.whiteToMove = !self.whiteToMove;	
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
	        if(moveCount == 1 ){
				res.breakProbe = false;
				if(piece.position.file != toPos.file){
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
						if (lastMove != undefined &&  lastMove.from.charAt(1)==to.charAt(0) && Math.abs(parseInt(lastMove.from.charAt(0))-parseInt(lastMove.to.charAt(0))) == 2 && lastMovedPiece!= undefined && (lastMovedPiece instanceof Pawn) && Math.abs(parseInt(lastMove.from.charAt(0))-parseInt(to.charAt(1))) == 1){res.canMove = true;}else{
							res.canMove = false;
						}
	            }
	        }
        }else if(moveCount == 2) {
			if (fromPos.file == toPos.file && !piece.hasMoved()) { res.canMove = true; } else {res.canMove = false;}
			res.breakProbe = true;
		}else {
			res.canMove = false;	
			res.breakProbe = true;}

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
				if( self.canAdversaryLandHere(piece, to)){
					res.canMove = false;
				}
			}
		
        } 
		//castling, king, rook should not have moved
		//no pieces in between
		//no adversary piece can land between / on king and rook
		//then can castle
	else if(moveCount == 2){
	    res.breakProbe = true;
		
	    if(ignoreAdversary){res.canMove = false; return res;}
            if( self.canAdversaryLandHere(piece, piece.square.position)){
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
			if( self.canAdversaryLandHere(piece, square.position)){
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

	
	this.validColourMove = function(colour){
		if ((colour=='white' && self.whiteToMove) || (colour=='black' && !self.whiteToMove)) {return true;} else {return false;}
	};
	
};
