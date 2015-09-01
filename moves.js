var moves = ()(function(){
	var straightAhead = function(piece, validMoves){
        var row = piece.currentPosition.charAt(1);
        var file = piece.currentPosition.charAt(0);
        var possibleMoves = null;
        if (validMoves != undefined || validMoves != null){
            possibleMoves = validMoves;
        }else{
            possibleMoves=[];
        }
        
        for(var i =row; i<9; i++){
              var pos = file+i.toString();
            var res = board.canIMoveHere(piece, pos);
            if(res.canMove){
              if(possibleMoves.indexOf(pos)<0){
                possibleMoves.push(pos);
                  if (res.takePiece){
                    return possibleMoves;
                  }
              }
            }
        }
        return possibleMoves;
    };
	
	var cross = function(currentPosition, validMoves){
		var row = currentPosition.charAt(1);
		var file = currentPosition.charAt(0);
		var possibleMoves = validMoves? validMoves | [];
		for(var i=1;i<9;i++){
			if (i!=row){
			possibleMoves.push(file+i.toString());
			}
		}
		return possibleMoves;
	};
	
});