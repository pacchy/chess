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
            var canMove = true, breakProbe =false;
            for(var j in piece.filters){
                var filter = piece.filters[j];
                var res = filter(piece, pos);
                
                canMove = res.canMove && canMove;
                breakProbe = res.breakProbe || breakProbe;                
            }            
            if(canMove){
                if(possibleMoves.indexOf(pos)<0){
                    possibleMoves.push(pos);                      
                }
            }
            if (breakProbe){
              return possibleMoves;
            }
        }
        return possibleMoves;
    };
	
	var cross = function(piece, validMoves){
		var row = parseInt(piece.position.row);
        var col = piece.position.file.charCodeAt(0);
        var possibleMoves = null;
        if (validMoves != undefined || validMoves != null){
            possibleMoves = validMoves;
        }else{
            possibleMoves=[];
        }
        
		for(var i=1;i<9;i++){
            var positions = [];
            
            if ((col+i) <105 && (col+i)>96 && (row+i) <9 && (row+i)>0){
            positions.push(String.fromCharCode(col+i)+(row+i).toString());}
            if ((col-i) <105 && (col-i)>96 && (row+i) <9 && (row+i)>0){
            positions.push(String.fromCharCode(col-i)+(row+i).toString());}
            if ((col+i) <105 && (col+i)>96 && (row-i) <9 && (row-i)>0){
            positions.push(String.fromCharCode(col+i)+(row-i).toString());}
            if ((col-i) <105 && (col-i)>96 && (row-i) <9 && (row-i)>0){
            positions.push(String.fromCharCode(col-i)+(row-i).toString());}
            
            var breakProbe =false;
            for(var j in positions)
            {
                var canMove = true;
                var pos = positions[j];
                for(var k in piece.filters){
                    var filter = piece.filters[k];
                    var res = filter(piece, pos);                
                    canMove = res.canMove && canMove;
                    breakProbe = res.breakProbe || breakProbe;                
                }            

                if(canMove){
                    if(possibleMoves.indexOf(pos)<0){
                        possibleMoves.push(pos);                      
                    }
                }
            }
            if (breakProbe){
                return possibleMoves;
            }
        }
        return possibleMoves;

	};
	
	return{
        straightAhead: straightAhead,
        cross: cross
    };
	
})();