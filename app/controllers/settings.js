var args = arguments[0] || {};

function init(){
    Alloy.Globals.NavigationWidget.addNewView({title:'Settings'},
                                              {},
                                              {image:'Information.png', callbackType:'close'});
};
init();