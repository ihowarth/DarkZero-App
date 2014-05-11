exports.sendGetRequest = function(){
    
    var reviewModel = Alloy.createModel("posts", {
    	type  		  : "Review",
    	title 		  : "JoJo’s Bizarre Adventure All-Star Battle",
    	platform 	  : "PS3",
    	//image		  : "",	
    	alsoAvailable : "Xbox360, PC",
    	publishTime   : "10/05/2014",
    	publisher 	  : "Bandai Namco Games",
		developer 	  : "CyberConnect2",
    	genre 	  	  : "Fighting",
		author 		  : "Dominic Sheard",
		content       : "I suppose after creating the absurdly and stupendously over the top Asura’s Wrath, it only made sense that CyberConnect2, the team that also develops the Naruto Shippuden: Ultimate Ninja Storm series for Bandai Namco, should have a stab at creating a fighting game for the eccentric manga and anime known as JoJo’s Bizarre (spot on with the name) Adventure. The studio seems to have a knack for capturing the look and feel of such high-action anime shows, and with JoJo’s Bizarre Adventure having such a distinctive, extravagant style, the studio and the IP seem to be a great match for one another. It’s been around 14 years since we last got an English JoJo’s Bizarre Adventure game (if you don’t count the 2012 HD release of that said title), so let’s see how CyberConnect2 has done bringing the bizarre back to us.",
		score         : "7"
    });
    reviewModel.save();
    Alloy.Collections.posts.add(reviewModel);
    
    var articleModel = Alloy.createModel("posts", {
    	type 		: "Article",
    	title	    : "Rise of the Titan Fall",
    	publishTime : "31/04/2014",
    	author 		: "Ebrahim Sadien",
    	content 	: "I have been in love with giant robots since I first watched Robotech in grade school. Ever since then I have been on the look out for a game that could fulfill my Robotech fantasy. The Robotech games have unfortunately not been particularly good and I avoided them. I thought that the MechWarrior franchise would scratch my itch, but the MechWarrior series has always been more focussed on strategy rather than run and gun action. I eventually stumbled across Shogo: Mobile Armored Division which had a great combination of combat on foot and in a giant Mech although the game was a bit rough around the edges. Fast forward several years and I am still on the lookout for my mech-fix. But two recent developments promise to bring some closure to my mech-lovin’ odyssey, namely HAWKEN and Titanfall."
    });
    articleModel.save();
	Alloy.Collections.posts.add(articleModel);
	
	var reviewModel2 = Alloy.createModel("posts", {
    	type  		  : "Review",
    	title 		  : "Numero Dos - JoJo’s Bizarre Adventure All-Star Battle",
    	platform 	  : "PS3",
    	//image		  : "",	
    	alsoAvailable : "Xbox360, PC",
    	publishTime   : "10/05/2014",
    	publisher 	  : "Bandai Namco Games",
		developer 	  : "CyberConnect2",
    	genre 	  	  : "Fighting",
		author 		  : "Dominic Sheard",
		content       : "I suppose after creating the absurdly and stupendously over the top Asura’s Wrath, it only made sense that CyberConnect2, the team that also develops the Naruto Shippuden: Ultimate Ninja Storm series for Bandai Namco, should have a stab at creating a fighting game for the eccentric manga and anime known as JoJo’s Bizarre (spot on with the name) Adventure. The studio seems to have a knack for capturing the look and feel of such high-action anime shows, and with JoJo’s Bizarre Adventure having such a distinctive, extravagant style, the studio and the IP seem to be a great match for one another. It’s been around 14 years since we last got an English JoJo’s Bizarre Adventure game (if you don’t count the 2012 HD release of that said title), so let’s see how CyberConnect2 has done bringing the bizarre back to us.",
		score         : "7"
    });
    reviewModel2.save();
    Alloy.Collections.posts.add(reviewModel2);
	
	Alloy.Collections.posts.fetch();
	// sendHTTPRequest("News",    0, 10);
	// sendHTTPRequest("Review",  0, 10); 
	// sendHTTPRequest("Article", 0, 5);
};

function sendHTTPRequest(type, start, amount) {
    var xhr = Ti.Network.createHTTPClient();

    xhr.onload = function(e) {
        var data = JSON.parse(this.responseData);
        
        var date = new Date();
        
        for (var i = start; i < (amount + start); i++) {
            if(type == "News") {
               
            } else {
                var postModel = Alloy.createModel("posts", {
                    type : type,
                    //time    : date - data[i].date,
                    time : "whut",
                    date : data[i].date,
                    //image   : "/defaultCover.jpg",
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
    
    xhr.open("GET","http://darkzero.co.uk/?feed=json&post_type=" + type);
    xhr.send();
};