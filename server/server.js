var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var gameService = require('./app/models/gameservice');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8888;
var router = express.Router();


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);
app.listen(port);

console.log('Get your ice cream on port ' + port);


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next(); // make sure we go to the next routes and don't stop here
});


router.route('/games/:gameId')
    .get(function(req, res) {
        gameService.getGameById(req.params.gameId, function(err, game) {
            if (err)
                res.send(err);
            res.end(game);
        });
    });

router.route('/games')
    .get(function(req, res) {
        gameService.getAllGames(function(err, games) {
            if (err)
                res.send(err);
            res.json(games);
        });
    })
    .post(function(req, res){
	gameService.createGame(null, function(err, game) {
            if (err)
                res.send(err);
            res.json(game);
        });
    });




var Game1 = (function(){
	var getGameById = function(id, callbackFn){
	  var game = {id:12345, player1:{name:'prashanth', playingWhite:true}, player2:{name:'test',playingWhite:false}};
		
	  callbackFn(game);
	}

	var getAllGames = function(){
	  var games = [];
	
	   return games;
	}

	var createGame = function(game){
		
	    return game;
	}

  return {
	getAllGames: getAllGames,
	createGame: createGame,
	getGameById: getGameById
	};
})();

