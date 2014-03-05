var args = arguments[0] || {};

function init(){
    Alloy.Globals.NavigationWidget.newLevel({title:'Settings'},
                                            {},
                                            {title:'Back', callbackType:'close'});
};
init();