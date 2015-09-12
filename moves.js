var moves = (function(){
	
    var getProbePositions = function(row, col, i, breakProbes, type){
        var positions = [];
        
        switch(type){
            
                case "cross": 
                        if ((col+i) <105 && (col+i)>96 && (row+i) <9 && (row+i)>0 && !breakProbes[0]){
                        positions.push(String.fromCharCode(col+i)+(row+i).toString());} else {breakProbes[0] = true;positions.push(null);}
                        if ((col-i) <105 && (col-i)>96 && (row+i) <9 && (row+i)>0 && !breakProbes[1]){
                        positions.push(String.fromCharCode(col-i)+(row+i).toString());} else {breakProbes[1] = true;positions.push(null);}
                        if ((col+i) <105 && (col+i)>96 && (row-i) <9 && (row-i)>0 && !breakProbes[2]){
                        positions.push(String.fromCharCode(col+i)+(row-i).toString());} else {breakProbes[2] = true;positions.push(null);}
                        if ((col-i) <105 && (col-i)>96 && (row-i) <9 && (row-i)>0 && !breakProbes[3]){
                        positions.push(String.fromCharCode(col-i)+(row-i).toString());} else {breakProbes[3] = true;positions.push(null);}
                        return positions;
                
                case "straight":
                        if ((col+i) <105 && (col+i)>96 && !breakProbes[0]){
                        positions.push(String.fromCharCode(col+i)+(row).toString());} else {breakProbes[0] = true;positions.push(null);}
                        if ((col-i) <105 && (col-i)>96 && !breakProbes[1]){
                        positions.push(String.fromCharCode(col-i)+(row).toString());} else {breakProbes[1] = true;positions.push(null);}
                        if ((row+i) <9 && (row+i)>0 && !breakProbes[2]){
                        positions.push(String.fromCharCode(col)+(row+i).toString());} else {breakProbes[2] = true;positions.push(null);}
                        if ((row-i) <9 && (row-i)>0 && !breakProbes[3]){
                        positions.push(String.fromCharCode(col)+(row-i).toString());} else {breakProbes[3] = true;positions.push(null);}
                        return positions;
                
                case "L":
                        if((col+2) < 105 && (col+2)>96 && (row +1) <9 && (row+1)>0){
                            positions.push(String.fromCharCode(col+2)+(row+1).toString());}
                        if((col+2) < 105 && (col+2)>96 && (row -1) <9 && (row-1)>0){
                            positions.push(String.fromCharCode(col+2)+(row-1).toString());}
                        if((col-2) < 105 && (col-2)>96 && (row +1) <9 && (row+1)>0){
                            positions.push(String.fromCharCode(col-2)+(row+1).toString());}
                        if((col-2) < 105 && (col-2)>96 && (row -1) <9 && (row-1)>0){
                            positions.push(String.fromCharCode(col-2)+(row-1).toString());}
                        if((col+1) < 105 && (col+1)>96 && (row +2) <9 && (row+2)>0){
                            positions.push(String.fromCharCode(col+1)+(row+2).toString());}
                        if((col+1) < 105 && (col+1)>96 && (row -2) <9 && (row-2)>0){
                            positions.push(String.fromCharCode(col+1)+(row-2).toString());}
                        if((col-1) < 105 && (col-1)>96 && (row +2) <9 && (row+2)>0){
                            positions.push(String.fromCharCode(col-1)+(row+2).toString());}
                        if((col-1) < 105 && (col-1)>96 && (row -2) <9 && (row-2)>0){
                            positions.push(String.fromCharCode(col-1)+(row-2).toString());}
                                            
                        return positions;
                
        }
        
    }
    
    var cross = function(piece, validMoves){
        return getValidMoves(piece, validMoves, 'cross');
    }
    
    var straight = function(piece, validMoves){
        return getValidMoves(piece, validMoves, 'straight');
    }
    
    var L = function(piece, validMoves){
        return getValidMoves(piece, validMoves, 'L');
    }
    
    var getValidMoves = function(piece, validMoves, type){
		var row = parseInt(piece.position.row);
        var col = piece.position.file.charCodeAt(0);
        var possibleMoves = null;
        if (validMoves != undefined || validMoves != null){
            possibleMoves = validMoves;
        }else{
            possibleMoves=[];
        }
        
                
        var breakProbe = true, breakProbes = [false, false, false, false];
        for(var i=1;i<9;i++){
            var positions = getProbePositions(row, col, i, breakProbes, type);
            
            for(var j in positions)
            {
                var canMove = true;
                var pos = positions[j];
                
                if(!breakProbes[j]){
                    for(var k in piece.filters){
                        var filter = piece.filters[k];
                        var res = filter(piece, pos);                
                        canMove = res.canMove && canMove;
                        breakProbes[j] = res.breakProbe || breakProbes[j];                
                    }            

                    if(canMove){
                        if(possibleMoves.indexOf(pos)<0){
                            possibleMoves.push(pos);                      
                        }
                    }
                }                
            }
            
            //break the probe if all directions are blocked already
            for(var j in positions){
                breakProbe = breakProbe && breakProbes[j];
            }
            if (breakProbe){
                return possibleMoves;
            }
        }
        return possibleMoves;
        
	};
    	
	return{
        cross: cross,
        straight: straight,
        L: L
    };
	
})();