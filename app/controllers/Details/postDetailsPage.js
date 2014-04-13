var args = arguments[0] || {};

var navBar = Alloy.createController('/navView', {
    title      : 'Details',
    leftButton : {
        text   : 'Back'
    },
    rightButton : {
        //TODO: Add share button
    }
}); 

(function init() {
    $.navView.add(navBar.getView());
    
    addEventListeners();
    editPage();
})();

function addEventListeners() {
     $.navView.addEventListener('click', function(e){
        if(e.source.id.slice(0, 4) == 'left') {
            $.container.close({left : 400});
        } else {
            // Do nothing when not clicking a button
        }
    });      
    
    $.container.addEventListener('swipe', function(e){
        if(e.direction == 'right') {
            $.container.close({left : 400});
        } else {
            // Do nothing when swiping left
        }
    });
    
    $.container.addEventListener('close', function(){
        $.destroy();
    });  
};

function editPage() {
    $.titleLabel.text  = args.title;
    $.typeLabel.text   = args.type;
    $.authorLabel.text = args.author;
    $.dateLabel.text   = args.date;
    $.contentView.html = args.content;
    // args == model in JSON
    // Use the model to edit the page  
};