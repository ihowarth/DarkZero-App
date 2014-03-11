var args = arguments[0] || {};

function init(){
    Alloy.Globals.NavigationWidget.addNewView({title:'About'},
                                              {image:'Settings.png', callbackType:'close'},
                                              {});
                                                      
    addEventListeners();
};
init();

function addEventListeners(){
    $.emailLink.addEventListener('click', function(){
        if(APP.checkNetwork()){
            Ti.UI.createEmailDialog({
               subject: 'Message from DarkZero App',
               toRecipients: ['team@darkzero.co.uk'],
               messageBody: 'DarkZero is awesome!' 
            }).open();
        }else{
            Ti.UI.createAlertDialog({
                title: 'No Network Connection',
                message: 'You must be connected to the internet to send an e-mail',
                ok: 'Okay'
            }).open();
        }
    });
    
    $.facebook.addEventListener('click', function(){
       alert('FACEBOOK'); 
    });
    
    $.twitter.addEventListener('click', function(){
       alert('twitter'); 
    });
};

function addHeaders(model){
    var transform = model.toJSON();
    transform.name  = 'Name: ' + transform.name;
    transform.occupation = 'Occupation: ' + transform.occupation;
    transform.favouriteGames = 'Favourite Games: ' +transform.favouriteGames;
    transform.bio = 'Bio: ' + transform.bio;
    return transform;
};

