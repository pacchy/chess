var gameService = app.service('gameService', ['$http', function($http){
	var gameService = {};
	delete $http.defaults.headers.common['X-Requested-With'];

	gameService.newGame = function(){
	var game = null;
		//call api
		var request = $http({
		  method: 'POST',
		  url: 'http://localhost:8888/api/games'
		});

		return (request.then( handleSuccess, handleError ));
	};

	function handleError( response ) {
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
            ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    
    function handleSuccess( response ) {
        return( response.data );
    }

	return gameService;

}]);