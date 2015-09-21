var evaluate = (function(){
	
	var evaluateMove = function(piece){
		var possibleMoves = [];
		var supportMoves = [];
		for(var i in piece.moveList){
			var newMoves = piece.moveList[i](piece, possibleMoves);
			possibleMoves = possibleMoves.concat(newMoves.possibleMoves);
			supportMoves = supportMoves.concat(newMoves.supportMoves);
		}
		return {possibleMoves:possibleMoves, supportMoves:supportMoves};
	};
	
	return {
		evaluateMove: evaluateMove
	};
	
})();