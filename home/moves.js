var moves = (function(){

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
        var currentPositionNumber = utility.getPositionNumber(currentPosition);
        
        for(var i=currentPositionNumber.row; i<9; i++){
            var pos = i.toString()+i.toString();
                possibleMoves.push(pos);
        }
    }
    
    return{
        straightAhead: straightAhead
        };
    
})();


var Rook = (function(){
    var moveList = [];
    moveList.push(moves.straightAhead);
    //moveList.push(moves.straightBehind);
    
    var piece = new Piece(new Position(4, 'a'), 'white');
    
    return{
        moveList : moveList,
        piece: piece
    }; 
})();

var Evaluate = (function(){
    
    var evaluate = function(){
        var rookMoves = null;
        for(var i in Rook.moveList){
            rookMoves = Rook.moveList[i](this, rookMoves);
            }
    };
    
    return{
        evaluate: evaluate
    }
    
})();


Evaluate.evaluate();