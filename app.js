var app = angular.module('chessApp', []);
var game = new Game();
game.init();	
var board = new Board();
game.board = board;
board.init();
setupBoard.loadPieces(gameConfig.newGame, board);

var ctrl = app.controller('homeController', ['$scope', '$sce', function($scope, $sce){

	$scope.board = board;
  $scope.takenPieces = board.takenPieces;
	$scope.showValidSquares = function(squareId){
        	board.clearGuide();
		var square = board.getSquare(squareId.charAt(0), squareId.charAt(1));        
		if(square.piece != undefined && !board.validColourMove(square.piece.colour)){return;}		
		validMoves = evaluate.evaluateMove(square.piece).possibleMoves;
		square.selected = true;
		for(var i in validMoves){
			var validSquare = board.getSquare(validMoves[i].charAt(1), validMoves[i].charAt(0));
			validSquare.highlight = true;
		}
	};

  $scope.isWhite=function(piece){return piece.colour=='white';}
  $scope.isBlack=function(piece){return piece.colour=='black';}
	
    $scope.handleDragStart = function(e) {
      //this.style.opacity = '0.4';
      e.dataTransfer.setData('text', this.id);
    };

    $scope.handleDragEnd = function(e) {
      
    };

    $scope.handleDragEnter = function(e) {
      
    };
    $scope.handleDragLeave = function(e) {
      
    };

    $scope.handleDrop = function(ev) {
      if (ev.preventDefault) {
        ev.preventDefault();
      }
      if (ev.stopPropogation) {
        ev.stopPropogation();
      }

      var dataText = ev.dataTransfer.getData("text");
	var src = document.getElementById(ev.dataTransfer.getData("text"));
	  var srcParent = src.parentNode;
	  var tgt = ev.currentTarget.firstElementChild;
	  var tgtParent = tgt.parentNode;
	  var square = board.getSquare(srcParent.id.charAt(0), srcParent.id.charAt(1));
	 if(square.piece != undefined && !board.validColourMove(square.piece.colour)){return;}
	 board.Move(srcParent.id, tgtParent.id);   
	      
	return false;
    };

    $scope.handleDragOver = function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      return true;
    };

    $scope.playWhite = function(playerNumber, playWhite){
		game.sit(playerNumber, playWhite);
	};		

}]);

app.directive('draggable', function() {
    return {
        restrict : "A",
        link : function(scope, element, attrs) {
            element[0].addEventListener("dragstart", scope.handleDragStart, false);
            element[0].addEventListener("dragend", scope.handleDragEnd, false);
            element[0].addEventListener("dragenter", scope.handleDragEnter, false);
            element[0].addEventListener("dragleave", scope.handleDragLeave, false);
        }
    }
});

app.directive('droppable', function() {
    return {
        restrict : "A",
        link : function(scope, element, attrs) {
            element[0].addEventListener("drop", scope.handleDrop, false);
            element[0].addEventListener("dragover", scope.handleDragOver, false);
        }
    }
});

ctrl.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
