var args = arguments[0] || {};

var code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];

var navBar = Alloy.createController('/navView', {
    title : 'Settings',
    leftButton : {
        // No left button
    },
    rightButton : {
        text : 'Back'
    }
}); 

(function init() {
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
    
    $.navView.add(navBar.getView());
    
    addEventListeners();
})(); 

function addEventListeners() {
    $.navView.addEventListener('click', function(e){
        if(e.source.id.slice(0, 4) == 'righ') {
            $.container.close({right : 400});
        } else {
            // Do nothing when not clicking a button
        }
    });
    
    $.container.addEventListener('swipe', function(e){
        if(e.source.id == 'secretView') {
            // Don't let secret view change to next screen
        } else {
            if(e.direction == 'left') {
                $.container.close({right : 400});
            } else {
                // Do nothing when swiping right
            }
        }
    });      
    
    $.container.addEventListener('close', function(){
        $.destroy();
    });
    
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
                 Alloy.createController('/Side_Pages/secretPage').getView().open({right : 0});
                 code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];
             }
         } else {
             code = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right'];
         }
    });
};

function changeSettingsTheme() {
    if (APP.osname == 'iphone' || 'ipad') {
        $.container.statusBarStyle = Alloy.Globals.colors.statusBarStyle;
    }
    
    navBar.editNavView({});
       
    $.container.backgroundColor        = Alloy.Globals.colors.background;
     
    $.pushNotificationsLabel.color     = Alloy.Globals.colors.settingsLabels;
    $.themeLabel.color                 = Alloy.Globals.colors.settingsLabels; 
    
    $.settingsTable.backgroundColor    = Alloy.Globals.colors.tableBackground;
    $.themeRow.backgroundColor         = Alloy.Globals.colors.tableBackground;
    $.notificationsRow.backgroundColor = Alloy.Globals.colors.tableBackground;
    $.settingsTable.separatorColor     = Alloy.Globals.colors.tableSeparator;
};