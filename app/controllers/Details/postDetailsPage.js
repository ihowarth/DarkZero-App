var args = arguments[0] || {};

var navBar = Alloy.createController("/navView", {
    title      : args.type,
    leftButton : {
        text : "Back"
    },
    rightButton : {
        text : "Share"
    }
}); 

(function init() {
    $.navView.add(navBar.getView());
    
    addEventListeners();
    editPage();
})();

function addEventListeners() {
     $.navView.addEventListener("click", function(e){
        if(e.source.id.slice(0, 4) == "left") {
            $.container.close({left : 400});
        } else if (e.source.id.slice(0, 4) == "righ") {
        	var title = args.title.replace(/ /g, '-');
        	
        	if (args.type === "Review") {
        		var url = "http://darkzero.co.uk/game-reviews/" + title + "-" + args.platform;	
        	} else if (args.type === 'Article') {
        		var url = "http://darkzero.co.uk/game-articles/" + title;
        	} else {
        			
        	}
        	
        	//Won't take the "'" :(
        	url = url.replace(/'/g, "\'");
        	
        	//Send the URL
        } else {
            // Do nothing when not clicking a button
        }
    });      
    
    $.container.addEventListener("swipe", function(e){
        if(e.direction == "right") {
            $.container.close({left : 400});
        } else {
            // Do nothing when swiping left
        }
    });
    
    $.container.addEventListener("close", function(){
        $.destroy();
    });
  
	$.authorLabel.addEventListener("click", function() {
		if (APP.checkNetwork("use the browser")) {
			var leaveAlert = Ti.UI.createAlertDialog({
				title       : "Leaving DarkZero",
				message     : "You are about to leave DarkZero and be directed to an external website, is that OK?",
				buttonNames : ["OK", "Cancel"]
			});

			leaveAlert.addEventListener("click", function(e) {
				if (e.index == 0) {
					//Open Author's webpage
					//Ti.Platform.openURL();
				} else {

				}
			});
			leaveAlert.show();
		}
	}); 

};

function editPage() {
	$.titleImage.image = args.image;
	
	if (args.platform !== "Platform") {
    	$.typeLabel.text = args.type + "(" + args.platform + ")";
   } else {
   		$.typeLabel.text = args.type;
   }
    
    $.titleLabel.text   = args.title;
    $.dateLabel.text    = args.publishTime + " by ";
    $.authorLabel.text  = args.author;
    $.contentLabel.text = args.content;
};