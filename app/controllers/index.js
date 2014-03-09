function initNavigation(){
    //Set the first time to false, so we know the first time the app was run on the device
    APP.setFirstTimeFalse();
    
    //NavBar
    Alloy.Globals.NavigationWidget.editNavView({height: 60, backgroundColor: '#f0f0f0', shadow: true});
    
    Alloy.Globals.NavigationWidget.addNewView({title:'DarkZero', controller:'frontPage'},
                                              {image:'Settings.png', callback:'settings', callbackType:'open'},
                                              {image:'Information.png', callback:'about', callbackType:'open'});
    
    //Content
    $.mainWin.add(Alloy.Globals.NavigationWidget.getView());
};
initNavigation();

$.mainWin.open();