function initNavigation(){
    APP.setFirstTimeFalse();
         
    //NavBar
    Alloy.Globals.NavigationWidget.newLevel({title:'DarkZero', controller:'frontPage'},
                              {image:'Settings.png', callback:'settings', callbackType:'open'},
                              {image:'Information.png', callback:'about', callbackType:'open'});
    
    //Content
    $.mainWin.add(Alloy.Globals.NavigationWidget.getView());
};
initNavigation();

$.mainWin.open();
