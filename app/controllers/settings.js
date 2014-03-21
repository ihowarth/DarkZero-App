var args = arguments[0] || {};

var code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];
function init() {
    Alloy.Globals.NavigationWidget.addNewView({
        //No content needed
    }, {
        title              : 'Settings'
    }, {
        //No left button
    }, {
        text               : 'Back',
        textColor          : Alloy.Globals.colors.navBarText,
        callbackType       : 'close',
        animationDirection : 'left'
    });

    //Has to be done after rendering due to an issue where the value isn't used
    if(Ti.App.Properties.getString('theme', 'light') == 'light') {
        $.themeSwitch.value = true;
    } else {
        $.themeSwitch.value = false;
    }
    
    if(Ti.App.Properties.getString('pushNotifications', 'off') == 'on') {
        $.pushNotificationsSwitch.value = true;
    } else {
        $.pushNotificationsSwitch.value = false;
    }
    
    addEventListeners();
};
init(); 

function addEventListeners() {
    $.pushNotificationsSwitch.addEventListener('change', function(e) {
        if (e.value == true) {
            Ti.App.Properties.setString('pushNotifications', 'on');
        } else {
            Ti.App.Properties.setString('pushNotifications', 'off');
        }
        //changePushNotifications();
    }); 

    $.themeSwitch.addEventListener('change', function(e) {
       if(e.value == true) {
           Ti.App.Properties.setString('theme', 'light');
       } else {
           Ti.App.Properties.setString('theme', 'dark');
       }
       APP.changeTheme();
       
       //Page is already open so needs to be changed from here
       changeSettingsTheme();
       
       Alloy.Globals.changeIndexTheme();
       Alloy.Globals.changeFrontPageTheme();
    });
    
    $.secretView.addEventListener('swipe', function(e) {
         if(e.direction == code[0]) {
             code.shift();
             if(code.length == 0) {
                 //TODO : Open secret page :D
                 alert('KONAMI code detected!');
                 code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];
             }
         } else {
             code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];
         }
    });
};

function changeSettingsTheme() {
    $.container.backgroundColor        = Alloy.Globals.colors.background;
    
    $.pushNotificationsLabel.color     = Alloy.Globals.colors.settingsLabels;
    $.themeLabel.color                 = Alloy.Globals.colors.settingsLabels;
    
    $.settingsTable.backgroundColor    = Alloy.Globals.colors.tableBackground;
    $.themeRow.backgroundColor         = Alloy.Globals.colors.tableBackground;
    $.notificationsRow.backgroundColor = Alloy.Globals.colors.tableBackground;
    $.settingsTable.separatorColor     = Alloy.Globals.colors.tableSeparator;
};