(function(){
    
    var possibleMoves = moves.straight('a2', null);
    
    for(var i=1;i<9;i++){
        if(i!=2){
            //document.getElementById("div1").innerHTML += possibleMoves[i];
            if(possibleMoves.indexOf(('a'+i.toString()))<0){
               alert('failed : ' + i);
               }
        }
    }
    
})();