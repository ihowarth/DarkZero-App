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
Alloy.Globals.darkZeroDataLib = require('darkZeroData');

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
    background         : '#ffffff',
    
    navBarBackground   : '#f2f1f1',
    navBarTitle        : '#000000',
    navBarShadow       : '#adadad',
    navBarText         : '#2a93ff',
    
    frontPageTitle     : '#2a93ff',
    frontPageDetails   : '#868383',
    frontPageSeparator : '#e8e7e7',
    
    postTitle          : '#000000',
    postInfo           : '#7d7c7c',
    postAuthor         : '#2a93ff',
    postText           : '#000000',
    
    settingsLabels     : '#646363',
    
    aboutStory         : '#3a3a3a',
    aboutHighlight     : '#007aff',
    aboutHeader        : '#000000',
    aboutInfo          : '#858687', 
    aboutLogo          : '/DZLogo.png',
    
    tableBackground    : 'transparent',
    tableSeparator     : 'transparent'
};

darkColors = {
    background         : '#252323',
    
    navBarBackground   : '#1f1e1e',
    navBarTitle        : '#e5e0e0',
    navBarShadow       : '#3e3d3d',
    navBarText         : '#3498fe',
    
    frontPageTitle     : '#2a93ff',
    frontPageDetails   : '#868383',
    frontPageSeparator : 'transparent',
    
    postTitle          : '#e5e0e0',
    postInfo           : '#7d7c7c',
    postAuthor         : '#2a93ff',
    postText           : '#e5e0e0',
    
    detailsHeader      : '#d4cfcf',
    detailsInfo        : '#858687',
    
    settingsLabels     : '#e5e0e0',
    
    aboutStory         : '#e5e0e0',
    aboutHighlight     : '#007aff',
    aboutHeader        : '#e5e0e0',
    aboutInfo          : '#858687',  
    aboutLogo          : '/DZDarkLogo.png',
    
    tableBackground    : 'transparent',
    tableSeparator     : 'transparent'
};

if(APP.osname == 'iphone' || APP.osname == 'ipad') {
    lightColors.statusBarStyle = Titanium.UI.iPhone.StatusBar.DEFAULT;
    darkColors.statusBarStyle  = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
} else {
    
}

APP.checkFirstTime();
APP.changeTheme();