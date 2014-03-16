function init() {
    //Set the first time to false, so we know the first time the app was run on the device
    APP.setFirstTimeFalse();

    Alloy.Globals.NavigationWidget.addNewView({
        controller         : '/frontPage'
    },  {
        title              : 'DarkZero'
    },  {
        image              : '/Settings.png',
        callback           : '/settings',
        callbackType       : 'open',
        animationDirection : 'left'
    }, {
        image              : '/Information.png',
        callback           : '/about',
        callbackType       : 'open',
        animationDirection : 'right'
    });

    //Content
    $.mainWin.add(Alloy.Globals.NavigationWidget.getView());
};
init();

$.mainWin.open();