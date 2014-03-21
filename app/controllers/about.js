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
    /**
     * Create the row, with image view and headers etc in another JS file and create instances of it here, inside the for loop
     */
    function createLabel() {
        return Ti.UI.createLabel({
            top : 0,
            left : 110,
            font : {
                fontSize : 9
            },
            height : Ti.UI.SIZE,
            width : Ti.UI.SIZE,
            color : Alloy.Globals.colors.aboutInfo
        });
    };

    for (var member in team) {
        var row = Ti.UI.createTableViewRow({
            top : 10,
            height : Ti.UI.SIZE,
            backgroundColor : Alloy.Globals.colors.tableBackground
        });

        var image = Ti.UI.createImageView({
            top : 0,
            left : 0,
            width : 100,
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

        name.text = 'Name: ' + team[member].name;
        occupation.text = 'Occupation: ' + team[member].occupation;
        games.text = 'Favourite Games: ' + team[member].favouriteGames;
        bio.text = 'Bio: ' + team[member].bio;
        image.image = team[member].image;

        $.teamTable.appendRow(row);
    };
};
