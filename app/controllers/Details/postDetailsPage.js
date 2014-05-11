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

	var newLabel = StyledLabel.createLabel({
		top : 15,
		width : 300,
		height : Ti.UI.SIZE,
		html : "designs. Some of my favourite rhythm games caught my love because of their unique visuals, addictive music and Japanese flavour. I’m speaking about games like the awesome <a href='http://youtu.be/3muR3pdWOkE'><i>Bust-A-Groove</i></a>, the rocking <a href='https://www.youtube.com/watch?v=s8ujQTgkB7k'><i>Um Jammer Lammy,</i></a> the tremendously quirky <a href='https://www.youtube.com/watch?v=YhAVrvoBWTI'><i>Osu! Tatakae! Ouendan</i></a><i>,</i> and my favourite of the bunch, the legendary <a href='https://www.youtube.com/watch?v=7speTNzbCLc'>Gitaroo Man</a>. Sega has been enjoying success with the genre in Japan, thanks to acquiring the rights to create <i>Hatsune Miku</i> video games based on the extremely popular vocaloid. Currently there are seven games in the series that span <em>PSP</em>, <em>PS3</em>, <em>3DS</em> and <em>Vita</em>, but, unsurprisingly, this is the first time the franchise has left Japan to go international. I could write an essay about the vocaloid craze, but it’s not hard to explore the internet and find out about the company Crypton Future Media and their synthesizer software. I do understand why Sega would be reluctant to release a <i>Hatsune Miku</i> game in the west - the whole vocaloid trend is very Japanese centric. It���s probably something Sega thought wouldn’t gain any attention in the west, but simply outright not experimenting with the idea is a worse perception to have, because this industry often rewards those who disregard market research. <i>Hatsune Miku’</i>s first English release is a great example of that, because after last year’s <em>PS3</em> edition of this title and this Vita adaption, Sega recently announced that thanks to the success of <i>Project Diva F, </i><i>Project Diva F 2</i> will be coming this autumn for both <em>PS3</em> and <em>Vita</em>, thus making me a happy dude, because <i>Project Diva F</i> is a solid, fun, rhythm game that brings back memories of the classics I enjoyed playing when I was younger. <img class='aligncenter size-large wp-image-62727' alt='miku03' src='http://darkzero.co.uk/asset/2014/04/miku03-600x340.jpg' width'600' height='340' />"
	}); 
	$.content.add(newLabel);
	
	newLabel.addEventListener("click", function(e){
		Ti.Platform.openURL(e.url);
	});

	$.titleImage.image = args.image;
	
	if (args.platform !== "Platform") {
    	$.typeLabel.text = args.type + "(" + args.platform + ")";
   } else {
   		$.typeLabel.text = args.type;
   }
    
    $.titleLabel.text   = args.title;
    $.dateLabel.text    = args.publishTime + " by ";
    $.authorLabel.text  = args.author;
};