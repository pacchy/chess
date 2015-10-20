
(function(){
	
	var mongoose = require('mongoose');	 
	var getGameById = function(id, callbackFn){
	  var game = {id:12345, player1:{name:'prashanth', playingWhite:true}, player2:{name:'test', playingWhite:false}};

	  callbackFn(game);
	};

	var getAllGames = function(callbackFn){
	  var games = [];
	
	   callbackFn(games);
	};

	var createGame = function(game, callbackFn){
		
	    callbackFn(game);
	};

	var move = function(move, callbackFn){
	    	var gameId = move.gameId;
		var game = getGameById(gameId);
		var from = new Position(move.from.charAt(0), move.from.charAt(1));
		var to = new Position(move.to.charAt(0), move.to.charAt(1));
		if(game == undefined) callbackFn('no game found');
		validMoves = game.board.getValidMoves(from.row, from.file);
		if(validMoves.indexOf(to.row, to.file)>-1){
		    var fromSquare = game.board.getSquare(from.row, from.file);
		    var toSquare = game.board.getSquare(to.row, to.file);
		    toSquare.piece = fromSquare.piece;
		    fromSquare.piece = null;
		}
		
		game.save();
	    callbackFn(game);
	};

	module.exports = {
	getGameById : getGameById,
	getAllGames : getAllGames,
	createGame : createGame
	}
    
}());


