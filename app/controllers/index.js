var navBar = Alloy.createController('/navView', {
    title : 'DarkZero',
    leftButton : {
        image : '/Settings.png'
    },
    rightButton : {
        image : '/About.png'
    }
}); 

(function init() {
    //if a theme has not been decided show the decider alert dialog
    if (!Ti.App.Properties.getString('theme')) {
        showThemeChoiceAlert();
    } else {
        APP.changeTheme();   
    }
    
    Alloy.Globals.darkZeroDataLib.sendGetRequest();
    
    $.navView.add(navBar.getView());
    
    addEventListeners();
})();

function addEventListeners() {
    $.navView.addEventListener('click', function(e){
        if(e.source.id.slice(0, 4) == 'left') {
            Alloy.createController('/Side_Pages/settings').getView().open({right : 0});
        } else if(e.source.id.slice(0, 4) == 'righ') {
            Alloy.createController('/Side_Pages/about').getView().open({left : 0});    
        } else {
            // Do nothing when not clicking a button
        }
    });
};

Alloy.Globals.changeIndexTheme = function() {
    $.mainWin.backgroundColor = Alloy.Globals.colors.background;
    
    navBar.editNavView({});
    
    if (APP.osname == 'iphone' || 'ipad') {
        $.mainWin.statusBarStyle = Alloy.Globals.colors.statusBarStyle;
    }
};

//TODO: show this on top of loading screen (activity indicator screen)
function showThemeChoiceAlert() {
    var themeAlert = Ti.UI.createAlertDialog({
        cancel      : -1,
        buttonNames : ['Light', 'Dark'],
        title       : 'Choose a theme',
    });

    themeAlert.addEventListener('click', function(e) {
        if (e.index == 0) {
            Ti.App.Properties.setString('theme', 'light');
        } else {
            Ti.App.Properties.setString('theme', 'dark');
        }
        APP.changeTheme();
        Alloy.Globals.changeIndexTheme();
        Alloy.Globals.changeFrontPageTheme();
    });
    
    themeAlert.show();
};

$.mainWin.open();