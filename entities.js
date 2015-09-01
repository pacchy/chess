var Square = function(row, file){
		this.row=row+1;
		this.file=String.fromCharCode(104-file);
		this.id= this.row.toString()+this.file.toString();
	};
var Piece = function(row, file){
	var col =104-file.charCodeAt(0);
	this.id=row.toString()+col.toString();
	this.code=null;
};
var Row = function(){
	this.squares = [];
	this.number = 0;
};
var Board = function(){
	this.rows= [];
	this.getSquare = function(row, file){
		var col =104-file.charCodeAt(0);
		return this.rows[row-1].squares[col];
	}
};