var evaluate = (function(){
	
	var evaluateMove = function(piece){
		var possibleMoves = [];
		for(var i in piece.moveList){
			var newMoves = piece.moveList[i](piece, possibleMoves);
			possibleMoves = possibleMoves.concat(newMoves);
		}
		return possibleMoves;
	};
	
	return {
		evaluateMove: evaluateMove
	};
	
})();