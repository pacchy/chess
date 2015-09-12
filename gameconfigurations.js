var gameConfig = (function(){
	var newGame = { white:['Ra1', 'Nb1', 'Bc1', 'Qd1', 'Ke1', 'Bf1', 'Ng1', 'Rh1', 'Kc5', 'b2', 'c2', 'd2', 'e2', 'f2', 'f3', 'g2'],
					black:['Ra8', 'Nb8', 'Bc8', 'Qd8', 'Ke8', 'Bf8', 'Ng8', 'Rh8', 'h5','a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'g4', 'h7']
					};
					
	var pieces = {
		white: {
		king: '&#9812;',
		queen: '&#9813;',
		rook: '&#9814;',
		bishop: '&#9815;',
		knight: '&#9816;',
		pawn: '&#9817;',
		colour: 'white'
		},
		black:{
		king: '&#9818;',
		queen: '&#9819;',
		rook: '&#9820;',
		bishop: '&#9821;',
		knight: '&#9822;',
		pawn: '&#9823;',
		colour: 'black'
		}
		};
		
	return {
		newGame: newGame,
		pieces: pieces
		};
    
})();