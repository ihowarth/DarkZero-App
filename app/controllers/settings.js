var args = arguments[0] || {};

function init() {
    Alloy.Globals.NavigationWidget.addNewView({
        //No content needed
    }, {
        title              : 'Settings'
    }, {
        //No left button
    }, {
        text               : 'Back',
        callbackType       : 'close',
        animationDirection : 'left'
    });

    //Has to be done after rendering due to an issue where the value isn't used
    if(Ti.App.Properties.getString('theme', 'light') == 'light') {
        $.themeSwitch.value = true;
    } else {
        $.themeSwitch.value = false;
    }
    
    addEventListeners();
};
init(); 

function addEventListeners() {
    $.pushNotificationsSwitch.addEventListener('change', function(e){
       if(e.value == true) {
           
       } else{
           
       }
       alert(e.value);
    });
    
    $.themeSwitch.addEventListener('change', function(e) {
       if(e.value == true) {
           Ti.App.Properties.setString('theme', 'light');
       } else {
           Ti.App.Properties.setString('theme', 'dark');
       }
       //Calls function from index.js
       APP.changeTheme();
       //Page is already open so needs to be changed from here
       changeSettingsTheme();
    });
};

function changeSettingsTheme() {
    $.container.backgroundColor     = Alloy.Globals.colors.background;
    
    $.pushNotificationsLabel.color  = Alloy.Globals.colors.normalText;
    $.themeLabel.color              = Alloy.Globals.colors.normalText;
    
    $.themeRow.backgroundColor = Alloy.Globals.colors.tableBackground;
    $.notificationsRow.backgroundColor = Alloy.Globals.colors.tableBackground;
    $.settingsTable.separatorColor  = Alloy.Globals.colors.tableSeparator;
};