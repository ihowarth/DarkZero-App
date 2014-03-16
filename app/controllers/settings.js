var args = arguments[0] || {};

function init() {
    Alloy.Globals.NavigationWidget.addNewView({
        title : 'Settings'
    }, {}, {
        text               : 'Back',
        callbackType       : 'close',
        animationDirection : 'left'
    });

    //Has to be done after rendering due to an issue where the value isn't used
    $.themeSwitch.value = true;
    
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
           
       } else {
       }
       alert(e.value);
    });
};
