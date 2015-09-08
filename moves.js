var moves = (function(){
	var straightAhead = function(piece, validMoves){
        var row = piece.position.row;
        var file = piece.position.file;
        var possibleMoves = null;
        if (validMoves != undefined || validMoves != null){
            possibleMoves = validMoves;
        }else{
            possibleMoves=[];
        }
        var i = null;
		for((piece.colour === "white" ? i=parseInt(row)+1 : i=parseInt(row)-1) ; (piece.colour === "white" ? i<9 : i>0); (piece.colour === "white" ? ++i : --i)){
            var pos = file+i.toString();            
            for(var j in piece.filters){
                var filter = piece.filters[j];
                var res = filter(piece, pos);
                
                if(res.canMove){
                    if(possibleMoves.indexOf(pos)<0){
                        possibleMoves.push(pos);                      
                    }
                }
                if (res.breakProbe){
                  return possibleMoves;
                }
            }
        }
        return possibleMoves;
    };
	
	var cross = function(currentPosition, validMoves){
		var row = currentPosition.charAt(1);
		var file = currentPosition.charAt(0);
		//var possibleMoves = validMoves? validMoves | [];
		for(var i=1;i<9;i++){
			if (i!=row){
			possibleMoves.push(file+i.toString());
			}
		}
		return possibleMoves;
	};
	
	return{
        straightAhead: straightAhead
        };
	
})();