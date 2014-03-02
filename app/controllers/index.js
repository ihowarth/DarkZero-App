function initNavigation(){
    //NavBar
    $.navigationView.pageTitle.text = 'DarkZero';
    $.navigationView.changeLeftNavButton('settings', '/Settings.png');
    $.navigationView.changeRightNavButton('about', '/Information.png');
    
    //Content
    //Add newsFeedView
    $.navigationView.content.add(Alloy.createController('frontPage').getView());
};
initNavigation();

$.mainWin.open();
