var setupBoard = (function(){
	var loadPieces = function(config, board){
		
		loadSet(config.white, gameConfig.pieces.white, board);
		loadSet(config.black, gameConfig.pieces.black, board);
	};
	
	var loadSet = function(pieceSetPositions, pieceSet, board){
		for(var i in pieceSetPositions){
			var square = null;
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
			square = board.getSquare(row, file);
			square.piece = new Piece(new Position(row, file), 'white');
			switch(pieceCode){
			case 'K':
				square.piece.code = pieceSet.king;
				break;
			case 'Q':
				square.piece.code = pieceSet.queen;
				break;
			case 'N':
				square.piece.code = pieceSet.knight;
				break;
			case 'B':
				square.piece.code = pieceSet.bishop;
				break;
			case 'R':
				square.piece= new Rook(new Position(row, file), 'white');
				square.piece.code = pieceSet.rook;
				break;
			default:
				square.piece.code = pieceSet.pawn;
				break;
			}
			
		}
	}
	
	return{
		loadPieces: loadPieces
	};
})();