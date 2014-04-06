var newsArray           = [];
var postsArray          = [];
var lastReviewsRequest  = 0;
var lastArticlesRequest = 0;

exports.sendGetRequest = function(){
	sendHTTPRequest('post',     0, 10);
	sendHTTPRequest('reviews',  0, 10); 
	sendHTTPRequest('articles', 0, 5);
	
	setTimeout(function(){
	   postsArray.sort(function(a,b){return a - b;});
	   
	   setTimeout(function(){
    	   for(var i = 0; i < postsArray.length; i++) {
    	       console.log(postsArray[i].date);
    	   } 
	   }, 2000);
	}, 5000);
};

function sendHTTPRequest(type, start, amount) {
    var xhr = Ti.Network.createHTTPClient();

    xhr.onload = function(e) {
        var data = JSON.parse(this.responseData);
 
        for (var i = start; i < (amount + start); i++) {
            var JSONpost = {
                title   : data[i].title,
                author  : data[i].author,
                date    : data[i].date,
                content : data[i].content
            };
             
            if(type == 'post') {
                newsArray.push(JSONpost);
            } else {
                postsArray.push(JSONpost);
            }
        }
    };
    
    xhr.onerror = function(e) {
        alert("Error retrieving data because \n" + JSON.stringify(e.error));
    };
    
    xhr.open('GET','http://darkzero.co.uk/?feed=json&post_type=' + type);
    xhr.send();
};

exports.getPostData = function() {
    return postsArray;
};
exports.getnewsData = function() {
    return newsArray;
};

exports.getMorePosts = function() {
    sentHTTPRequest('reviews',  lastReviewsRequest, 10);
    sentHTTPRequest('articles', lastArticlesRequest, 5);
    
    setTimeout(function(){
       postsArray.sort(function(a,b){return a - b;});
       lastReviewsRequest  += 10;
       lastArticlesRequest += 5;
    }, 5000);
};
