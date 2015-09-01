var setupBoard = (function(){
	var loadPieces = function(config){
		
		for(var i in config.white)
		{
			var square = null;
			var pieceConfig = config.white[i];
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
			square.piece = new Piece(row, file);
			switch(pieceCode){
			case 'K':
				square.piece.code = gameConfig.pieces.white.king;
				break;
			case 'Q':
				square.piece.code = gameConfig.pieces.white.queen;
				break;
			case 'N':
				square.piece.code = gameConfig.pieces.white.knight;
				break;
			case 'B':
				square.piece.code = gameConfig.pieces.white.bishop;
				break;
			case 'R':
				square.piece.code = gameConfig.pieces.white.rook;
				break;
			default:
				square.piece.code = gameConfig.pieces.white.pawn;
				break;
			}
		
		}

	};
	
	return{
		loadPieces: loadPieces
	};
})();