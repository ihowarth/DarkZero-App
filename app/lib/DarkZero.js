/********************************************
 * EXPORTED FUNCTIONS
 * 
 * getAllFeeds()
 * getANews()
 * getReviews()
 * getArticles()
 * 
 *********************************************/

function getInfo( content , search , close) {
	var beginning = content.indexOf( search ) + ( search.length );
	
	if ( close ) {
		var end = content.indexOf( close ); 
	} else {
		var end = content.indexOf( search.replace( "[" , "[/" ) );	
	}
	
	
	return content.slice( beginning , end );
};

function parseData( data , callback ) {
	var parsedData = {
		type  	      : "type",
    	title 	      : data.title,
    	platform 	  : getInfo( data.content , "[system]" ),
    	image         : "image",
    	alsoAvailable : getInfo( data.content , "[also]" ),
    	publishTime   : "publishTime",
    	publisher     : getInfo( data.content , "[pub]" ),
		developer     : getInfo( data.content , "[dev]" ),
    	genre 	  	  : getInfo( data.content , "[genre]" ),
		author 	      : data.author,
		content       : getInfo( data.content , "[/info]" , "[score]" ),
		score         : getInfo( data.content , "[score]" )
	};
	
	if (Alloy.Globals.DEBUG) { 
		for ( var key in parsedData ) {
			console.log(parsedData[key]);
		}
	}
	
	callback && callback.call( parsedData );
};

function getAllFeeds( callback ) {
	HTTP.sendRequest({
		url 	 : "http://darkzero.co.uk/?feed=json",
		method   : "GET",
		format   : "JSON",
		callback : function( e ) {
			var length = e.data.length;
			parseData( e.data[0] , callback );
			// for(var i = 0; i < length; i++) {
				// parseData( e.data[i] , callback );
			// }
		}
	});
};

function getNews() {
	HTTP.sendRequest({
		url 	 : "http://darkzero.co.uk/?feed=json" + "&post_type=post",
		method   : "GET",
		format   : "JSON",
		callback : function( e ) {
			parseData( e );
		}
	});
};

function getReviews() {
	HTTP.sendRequest({
		url 	 : "http://darkzero.co.uk/?feed=json" + "&post_type=reviews",
		method   : "GET",
		format 	 : "JSON",
		callback : function( e ) {
			parseData( e );
		}
	});
};

function getArticles() {
	HTTP.sendRequest({
		url 	 : "http://darkzero.co.uk/?feed=json" + "&post_type=articles",
		method   : "GET",
		format   : "JSON",
		callback : function( e ) {
			parseData( e );
		}
	});
};

exports.getAllFeeds = getAllFeeds;
exports.getNews 	= getNews;
exports.getReviews  = getReviews;
exports.getArticles = getArticles;