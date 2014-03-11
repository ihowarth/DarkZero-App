var args = arguments[0] || {};

function init(){
    Alloy.Globals.NavigationWidget.addNewView({title:'Settings'},
                                              {},
                                              {image:'Information.png', callbackType:'close'});
                 
    //Has to be done after rendering due to an issue where the value isn't used
    $.themeSwitch.value = true;
    $.soundsSwitch.value = true;                                               
};
init();