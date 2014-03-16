function init() {
    //Set the first time to false, so we know the first time the app was run on the device
    APP.setFirstTimeFalse();

    Alloy.Globals.NavigationWidget.addNewView({
        controller         : '/frontPage'
    },  {
        //height             : 60,
        //backgroundColor    : '#f0f0f0',
        //shadowVisible      : true,
        title              : 'DarkZero',
        //titleColor         : '#000000',
        //itleFont          : {fontSize : 17} 
    },  {
        //text               : '',
        //textColor          : '#007aff',
        //textFont           : {fontSize : 15},
        image              : '/Settings.png',
        callback           : '/settings',
        callbackType       : 'open',
        //animationOff       : false,
        animationDirection : 'left'
    }, {
        //text               : '',
        //textColor          : '#007aff',
        //textFont           : {fontSize : 15},
        image              : '/Information.png',
        callback           : '/about',
        callbackType       : 'open',
        //animationOff       : false,
        animationDirection : 'right'
    });

    //Content
    $.mainWin.add(Alloy.Globals.NavigationWidget.getView());
};
init();

$.mainWin.open();