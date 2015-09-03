var board = (function(){

    var canIMoveHere = function(piece, to){
        var currentPosition = piece.currentPosition;
        var res = {};
        res.canMove = false;
        res.takePiece = false;
        var square = getSquare(currentPosition);
        boardPiece = square.piece;
        
        if(boardPiece != null || boardPiece != undefined){
            if(boardPiece.colour == piece.colour){
                res.canMove = false;
            }
            else{
                res.canMove = true;
                res.takePiece = true;
            }
        }
        else{
            res.canMove = true;
        }
        
        return res;
    }



return {
    canIMoveHere: canIMoveHere
}

})();

var Piece = function(position, colour){
    this.position = position;
    this.colour = colour;
}

var Position = function(row, file){
    this.file = file;
    this.row = row;
    this.col = file.charCodeAt(0)-96;
}