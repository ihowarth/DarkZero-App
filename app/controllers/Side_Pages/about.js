var args = arguments[0] || {};

(function init() {
    $.navView.add(Alloy.createController("/navView", {
        title      : "About",
        leftButton : {
            text : "Back"
        },
        rightButton : {
            // No right button
        } 
    }).getView());
    
    updateTable();
    addEventListeners();
})();

function addEventListeners() {
    $.navView.addEventListener("click", function(e){
        if(e.source.id.slice(0, 4) == "left") {
            $.container.close({left : 400});
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
    
    $.emailLink.addEventListener("click", function() {
        if (APP.checkNetwork("send e-mails")) {
            Ti.UI.createEmailDialog({
                subject      : "Message from DarkZero App",
                toRecipients : ["team@darkzero.co.uk"],
                messageBody  : "DarkZero is awesome!"
            }).open();
        }
    });
   
    $.facebook.addEventListener("click", function() {
        if (APP.checkNetwork("use Facebook")) {
            showLeavingMessage("https://m.facebook.com/videogame.community?ref=ts&fref=ts");
        }
    });

    $.twitter.addEventListener("click", function() {
        if (APP.checkNetwork("use Twitter")) {
            showLeavingMessage("https://mobile.twitter.com/DarkZeroUK");
        }
    });
    
    $.teamTable.addEventListener("click", function(e){
        alert(JSON.stringify(e)); 
    }); 
};

function showLeavingMessage(webpage) {
    var leaveAlert = Ti.UI.createAlertDialog({
        title       : "Leaving DarkZero",
        message     : "You are about to leave DarkZero and be directed to an external website, is that OK?",
        buttonNames : ["OK", "Cancel"]
    });

    leaveAlert.addEventListener("click", function(e) {
        if (e.index == 0) {
            Ti.Platform.openURL(webpage);
        } else {

        }
    });

    leaveAlert.show();
};

function updateTable() {
    var team = Alloy.Globals.darkZeroTeamLib.getTeam();
    
    var args = {};
    var rows = [];
    for (var member in team) {
        args.name       = team[member].name;
        args.occupation = team[member].occupation;
        args.games      = team[member].favouriteGames;
        args.bio        = team[member].bio;
        args.image      = team[member].image;
        
        var row = Alloy.createController("/Side_Pages/aboutRow", args).getView();
        rows.push(row);
    };
    
    $.teamTable.setData(rows);
};