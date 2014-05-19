/********************************************
 * EXPORTED FUNCTIONS
 * 
 * getAllFeeds()
 * getANews()
 * getReviews()
 * getArticles()
 * 
 *********************************************/

function parseData( data , callback ) {
	var parsedData = data;
	
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
			parseData( e , callback );
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