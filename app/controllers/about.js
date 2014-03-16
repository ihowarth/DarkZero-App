var args = arguments[0] || {};

function init() {
    Alloy.Globals.NavigationWidget.addNewView({
        //No content needed
    }, {
        title              : 'About'
    }, {
        text               : 'Back',
        callbackType       : 'close',
        animationDirection : 'right'
    }, {
        //No right button
    }); 


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

function addHeaders(model) {
    var transform = model.toJSON();
    transform.name = 'Name: ' + transform.name;
    transform.occupation = 'Occupation: ' + transform.occupation;
    transform.favouriteGames = 'Favourite Games: ' + transform.favouriteGames;
    transform.bio = 'Bio: ' + transform.bio;
    return transform;
};