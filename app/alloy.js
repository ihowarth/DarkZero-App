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

//Modules

//Libs
Alloy.Globals.darkZeroTeamLib = require('darkZeroTeam');

//Collections

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
            shadowColor        : Alloy.Globals.colors.navBarShadow
        });
    },   
}; 

lightColors = {
    background       : '#ffffff',
    
    navBarBackground : '#f0f0f0',
    navBarTitle      : '#000000',
    navBarShadow     : '#ababab',
    navBarText       : '#3599fc',
    
    highlightText    : '#0f82f5',
    headerText       : '#000000',
    lightText        : '#858282',
    
    settingsLabels   : '#636262',
    
    aboutStory       : '383838',
    aboutHighlight   : '007bff',
    aboutHeader      : '333333',
    aboutInfo        : '#838485', 
    
    tableBackground  : 'transparent',
    tableSeparator   : 'transparent'
};

darkColors = {
    background       : '#242222',
    
    navBarBackground : '#1f1e1e',
    navBarTitle      : '#e3dede',
    navBarShadow     : '#171616',
    navBarText       : '#3599fc',
    
    highlightText    : '#007aff',
    headerText       : '#ffffff',
    lightText        : '#858282',
    
    settingsLabels   : '#ffffff',
    
    aboutStory       : '383838',
    aboutHighlight   : '007bff',
    aboutHeader      : '333333',
    aboutInfo        : '#838485',  
    
    tableBackground  : 'transparent',
    tableSeparator   : 'transparent'
};

if(APP.osname == 'iphone' || APP.osname == 'ipad') {
    lightColors.statusBarStyle = Titanium.UI.iPhone.StatusBar.DEFAULT;
    darkColors.statusBarStyle  = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
} else {
    
}

APP.checkFirstTime();
APP.changeTheme();