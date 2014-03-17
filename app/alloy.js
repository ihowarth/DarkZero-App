// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var debug = false;

//Controllers

//Widgets
Alloy.Globals.NavigationWidget = Alloy.createWidget('navigation');

//Libs
Alloy.Globals.darkZeroLib = require('darkZero');

//Collections
Alloy.Collections.team = Alloy.createCollection('team');

var APP = {
    //Device Info
    osname         : Ti.Platform.osname,
    deviceWidth    : Ti.Platform.displayCaps.platformWidth,
    deviceHeight   : Ti.Platform.displayCaps.platformHeight,
    
    firstTime      : true,
   
    checkFirstTime : function() {
        if (Ti.App.Properties.getString('first', 'true') == 'true') {
            Ti.App.Properties.setString('first', 'false');
        } else {
            APP.firstTime = false;
        }
    },
    
    //Check network connection
    checkNetwork : function() {
        return Titanium.Network.getOnline();
    },
    
    changeTheme : function() {
        if (Ti.App.Properties.getString('theme', 'light') == 'light') {
            Alloy.Globals.colors = lightColors;
        } else {
            Alloy.Globals.colors = darkColors;
        }
        
        Alloy.Globals.NavigationWidget.editNavView({
            backgroundColor    : Alloy.Globals.colors.navBarBackground,
            titleColor         : Alloy.Globals.colors.navBarTitle,
        });
                
        //Change index & Frontpage theme
        //$.mainWin.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
    },   
}; 

lightColors = {
    statusBarStyle   : Titanium.UI.iPhone.StatusBar.DEFAULT,
    
    background       : '#ffffff',
    
    navBarBackground : '#ffffff',
    navBarTitle      : '#000000',
    
    highlightText    : '#007aff',
    headerText       : '#000000',
    normalText       : '#909090',
    
    tableBackground  : '#ffffff',
    tableSeparator   : '#000000'
};

darkColors = {
    statusBarStyle   : Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK,
    
    background       : '#000000',
    
    navBarBackground : '#000000',
    navBarTitle      : '#ffffff',
    
    highlightText    : '#007aff',
    headerText       : '#ffffff',
    normalText       : '#909090',
    
    tableBackground  : '#000000',
    tableSeparator   : '#ffffff'
};

APP.checkFirstTime();
APP.changeTheme();