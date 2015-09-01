var app = angular.module('chessApp', []);
	
	var board = new Board();
	var squareWhite=true;
	for(var i=0;i<8;i++){
		squareWhite=!squareWhite;
		var newRow = new Row();
		newRow.squares = [];
		board.rows.push(newRow);
		for(var j=0;j<8;j++){
			var newSquare = new Square(i,j);
			if (squareWhite) {newSquare.colour=true;}else{newSquare.colour=false;}
			squareWhite=!squareWhite;
			newRow.squares.push(newSquare);
		}
	}
	
	setupBoard.loadPieces(gameConfig.newGame, board);
	

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var src = document.getElementById (ev.dataTransfer.getData("text"));
	  var srcParent = src.parentNode;
	  var tgt = ev.currentTarget.firstElementChild;
	  var tgtParent = tgt.parentNode;
	  ev.currentTarget.replaceChild (src, tgt);
	  var span = document.createElement("SPAN");
	  srcParent.appendChild (span);
	  console.log(srcParent.id + ' to ' + tgtParent.id );
}


var ctrl = app.controller('homeController', ['$scope', '$sce', function($scope, $sce){
	$scope.board = board;
}]);

ctrl.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});