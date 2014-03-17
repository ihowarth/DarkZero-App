function init() {
    //if a theme has not been decided show the decider alert dialog
    if (!Ti.App.Properties.getString('theme')) {
        showThemeChoiceAlert();
    } else {
        APP.changeTheme();   
    }
    
    //Set up controller, nav bar buttons and title
    Alloy.Globals.NavigationWidget.addNewView({
        controller         : '/frontPage'
    },  {
        title              : 'DarkZero',
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

    //Add the navigation controller to the window
    $.mainWin.add(Alloy.Globals.NavigationWidget.getView());
};
init();

$.mainWin.open();

//TODO: show this on top of loading screen (activity indicator screen)
function showThemeChoiceAlert() {
    var themeAlert = Ti.UI.createAlertDialog({
        cancel : -1,
        buttonNames : ['Light', 'Dark'],
        title : 'Choose a theme',
    });

    themeAlert.addEventListener('click', function(e) {
        if (e.index == 0) {
            Ti.App.Properties.setString('theme', 'light');
        } else {
            Ti.App.Properties.setString('theme', 'dark');
        }
        APP.changeTheme();
    });
    
    themeAlert.show();
};