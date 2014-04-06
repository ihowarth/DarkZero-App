var args = arguments[0] || {};

(function init() {
    $.navView.add(Alloy.createController('/navView', {
        title      : 'About',
        leftButton : {
            text : 'Back'
        },
        rightButton : {
            // No right button
        } 
    }).getView());
    
    updateTable();
    addEventListeners();
})();

function addEventListeners() {
    $.navView.addEventListener('click', function(e){
        if(e.source.id.slice(0, 4) == 'left') {
            $.container.close();
        } else {
            // Do nothing when not clicking a button
        }
    });      
    
    $.container.addEventListener('swipe', function(e){
        if(e.direction == 'right') {
            $.container.close();
        } else {
            // Do nothing when not clicking a button
        }
    });  
    
    $.container.addEventListener('close', function(){
        $.destroy();
    });
    
    $.emailLink.addEventListener('touchend', function() {
        if (APP.checkNetwork()) {
            Ti.UI.createEmailDialog({
                subject      : 'Message from DarkZero App',
                toRecipients : ['team@darkzero.co.uk'],
                messageBody  : 'DarkZero is awesome!'
            }).open();
        } else {
            openNoInternetDialog();
        }
    });
   
    $.facebook.addEventListener('touchend', function() {
        if (APP.checkNetwork()) {
            showLeavingMessage('https://m.facebook.com/videogame.community?ref=ts&fref=ts');
        } else {
            openNoInternetDialog();
        }
    });

    $.twitter.addEventListener('touchend', function() {
        if (APP.checkNetwork()) {
            showLeavingMessage('https://mobile.twitter.com/DarkZeroUK');
        } else {
            openNoInternetDialog();
        }
    }); 
};

function showLeavingMessage(webpage) {
    var leaveAlert = Ti.UI.createAlertDialog({
        title       : 'Leaving DarkZero',
        message     : 'You are about to leave DarkZero and be directed to an external website, is that OK?',
        buttonNames : ['OK', 'Cancel']
    });

    leaveAlert.addEventListener('click', function(e) {
        if (e.index == 0) {
            Ti.Platform.openURL(webpage);
        } else {

        }
    });

    leaveAlert.show();
};

function openNoInternetDialog() {
    Ti.UI.createAlertDialog({
        title   : 'No Network Connection',
        message : 'You must be connected to the internet to do this',
        ok      : 'Okay'
    }).show();
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
        
        var row = Alloy.createController('aboutRow', args).getView();
        rows.push(row);
    };
    
    $.teamTable.setData(rows);
};