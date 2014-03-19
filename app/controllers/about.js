var args = arguments[0] || {};

function init() {
    Alloy.Globals.NavigationWidget.addNewView({
        //No content needed
    }, {
        title              : 'About'
    }, {
        text               : 'Back',
        textColor          : Alloy.Globals.colors.navBarText,
        callbackType       : 'close',
        animationDirection : 'right'
    }, {
        //No right button
    }); 

    updateTable();
    addEventListeners();
};
init();

function addEventListeners() {
    $.emailLink.addEventListener('touchend', function() {
        if (APP.checkNetwork()) {
            Ti.UI.createEmailDialog({
                subject      : 'Message from DarkZero App',
                toRecipients : ['team@darkzero.co.uk'],
                messageBody  : 'DarkZero is awesome!'
            }).open();
        } else {
            Ti.UI.createAlertDialog({
                title   : 'No Network Connection',
                message : 'You must be connected to the internet to send an e-mail',
                ok      : 'Okay'
            }).open();
        }
    });

    $.facebook.addEventListener('touchend', function() {
        alert('Facebook');
    });

    $.twitter.addEventListener('touchend', function() {
        alert('Twitter');
    });
};


function updateTable() {
    var team = Alloy.Globals.darkZeroTeamLib.getTeam();
    var teamRows = [];
    

    function createLabel() {
        return Ti.UI.createLabel({
            top    : 0,
            left   : 110,
            font   : {fontSize : 9},
            height : Ti.UI.SIZE,
            width  : Ti.UI.SIZE,
            color  : Alloy.Globals.colors.aboutInfo
        });
    };

    for (var member in team) {
        var row = Ti.UI.createTableViewRow({
            top             : 10,
            height          : Ti.UI.SIZE,
            backgroundColor : Alloy.Globals.colors.tableBackground
        });
    
        var image = Ti.UI.createImageView({
            top    : 0,
            left   : 0,
            width  : 100,
            height : 100
        });
        row.add(image);
    
        var labelContainer = Ti.UI.createView({
            height : Ti.UI.SIZE,
            layout : 'vertical'
        });
        row.add(labelContainer);
        
        var name = createLabel();
        var occupation = createLabel();
        var games = createLabel();
        var bio = createLabel();
        
        labelContainer.add(name);
        labelContainer.add(occupation);
        labelContainer.add(games);
        labelContainer.add(bio);
     
        name.text       = 'Name: ' + team[member].name;
        occupation.text = 'Occupation: ' + team[member].occupation;
        games.text      = 'Favourite Games: ' + team[member].favouriteGames;
        bio.text        = 'Bio: ' + team[member].bio;
        image.image     = team[member].image;
        
        $.teamTable.appendRow(row);
    };
};