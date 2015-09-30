var setupBoard = (function(){
	var loadPieces = function(config, board){
		
		loadSet(config.white, gameConfig.pieces.white, board);
		loadSet(config.black, gameConfig.pieces.black, board);
	};
	
	var loadSet = function(pieceSetPositions, pieceSet, board){
		for(var i in pieceSetPositions){
			var square = null, piece=null;
			var pieceConfig = pieceSetPositions[i];
			var row=null, file=null, pieceCode=pieceConfig.charAt(0);
			var isPawn = (pieceCode==pieceCode.toLowerCase());
			if (isPawn){
				row = pieceConfig.charAt(1);
				file = pieceConfig.charAt(0);
			}
			else{
				row = pieceConfig.charAt(2);
				file = pieceConfig.charAt(1);
			}
			//square = board.getSquare(row, file);
			switch(pieceCode){
			case 'K':
				piece= new King(new Position(row, file), pieceSet.colour);
				piece.code = pieceSet.king;
				break;
			case 'Q':
				piece= new Queen(new Position(row, file), pieceSet.colour);
				piece.code = pieceSet.queen;
				break;
			case 'N':
				piece= new Knight(new Position(row, file), pieceSet.colour);
				piece.code = pieceSet.knight;
				break;
			case 'B':
				piece= new Bishop(new Position(row, file), pieceSet.colour);
				piece.code = pieceSet.bishop;
				break;
			case 'R':
				piece= new Rook(new Position(row, file), pieceSet.colour);
				piece.code = pieceSet.rook;
				break;
			default:
				piece= new Pawn(new Position(row, file), pieceSet.colour);
				piece.code = pieceSet.pawn;
				break;
			}
			
			board.placePiece(piece, row, file);
		}
	}
	
	return{
		loadPieces: loadPieces
	};
})();