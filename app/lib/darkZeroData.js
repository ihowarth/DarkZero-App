var lastReviewsRequest  = 0;
var lastArticlesRequest = 0;

exports.sendGetRequest = function(){
    
    //Alloy.Collections.posts.reset();
    var model;

    while (model = Alloy.Collections.posts.first()) {
        model.destroy();
    }
    
	sendHTTPRequest('News',    0, 10);
	sendHTTPRequest('Review',  0, 10); 
	sendHTTPRequest('Article', 0, 5);
};

function sendHTTPRequest(type, start, amount) {
    var xhr = Ti.Network.createHTTPClient();

    xhr.onload = function(e) {
        var data = JSON.parse(this.responseData);
        
        var date = new Date();
        
        for (var i = start; i < (amount + start); i++) {
            if(type == 'News') {
               
            } else {
                var postModel = Alloy.createModel('posts', {
                    type : type,
                    //time    : date - data[i].date,
                    time : 'whut',
                    date : data[i].date,
                    //image   : '/defaultCover.jpg',
                    title : data[i].title,
                    author : data[i].author,
                    content : data[i].content
                });
                postModel.save();
                Alloy.Collections.posts.add(postModel);
            }
        }
        
        Alloy.Collections.posts.fetch();
    };
    
    xhr.onerror = function(e) {
        alert("Error retrieving data because \n" + JSON.stringify(e.error));
    };
    
    xhr.open('GET','http://darkzero.co.uk/?feed=json&post_type=' + type);
    xhr.send();
};

exports.getMorePosts = function() {
    sentHTTPRequest('reviews',  lastReviewsRequest, 10);
    sentHTTPRequest('articles', lastArticlesRequest, 5);
};