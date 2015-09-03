var PositionNumber = function(row, col){
    this.row = row;
    this.col = col;
}

var Position = function(row, file){
    this.row = row;
    this.file = file;
}

var utility = (function(){

    var getPosition = function(row, fileNumber){
        
        return new Position(row, file);
    }
    
    var getPositionNumber = function(position){
        var row = position.charAt(1);
        var col = position.charCodeAt(0)-96;
        
        return new PositionNumber(row, col);
    }
    
    return{
        getPosition: getPosition,
        getPositionNumber: getPositionNumber
    }
    
})();