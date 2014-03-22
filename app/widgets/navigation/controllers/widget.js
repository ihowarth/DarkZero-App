var pageStack        = [];
var viewStack        = [];
var controllerStack  = [];

var leftButtonStack  = {};
var rightButtonStack = {};

exports.editNavView = function(navBar) {
    $.navBar.height           = navBar.height          || 60;
    $.navBar.backgroundColor  = navBar.backgroundColor || '#f0f0f0';
    $.shadow.visible          = navBar.shadowVisible   || true;
    $.shadow.backgroundColor  = navBar.shadowColor     || '#909090';
    $.pageTitle.color         = navBar.titleColor      || '#000000';
    $.pageTitle.font          = navBar.titleFont       || {fontSize : 17};
};

//TODO: Allow UI elements to replace Title, so segmented controls can be used, for example
exports.addNewView = function(content, navBar, leftButton, rightButton) {
    //If there is a controller to open, do so and add it to the view
    if (content.controller) {
        var controller = Alloy.createController(content.controller);
        var view = controller.getView();
        $.contentView.add(view);
        viewStack.push(view);
        controllerStack.push(controller);
    }

    //Style nav bar, add buttons and a title
    //If title doesn't exist use previous title, if THAT doesn't exist, the label is empty
    $.pageTitle.text = navBar.title || $.pageTitle.text || '';
    navButtonSetup(leftButton, 'left');
    navButtonSetup(rightButton, 'right');

    //Add the JSON objects to stacks, to be used later on return to the page
    pageStack.push(navBar);
    leftButtonStack[navBar.title]  = leftButton;
    rightButtonStack[navBar.title] = rightButton;
};

$.leftNavButtonView.addEventListener('touchend', function() {
    if($.leftNavButtonView.touchEnabled == true){
        $.leftNavButtonView.touchEnabled = false;
        $.rightNavButtonView.touchEnabled = false;
        eventListener(leftButtonStack);
    }
});

$.rightNavButtonView.addEventListener('touchend', function() {
    if($.rightNavButtonView.touchEnabled == true){
        $.rightNavButtonView.touchEnabled = false;
        $.leftNavButtonView.touchEnabled = false;
        eventListener(rightButtonStack);
    }
});



function navButtonSetup(button, side) {
    if (side == 'left') {
        view        = $.leftNavButtonView;
        image       = $.leftNavButtonImage;
        label       = $.leftNavButtonLabel;
        image.image = '/LeftNavArrow.png' || null;
    } else {
        view        = $.rightNavButtonView;
        image       = $.rightNavButtonImage;
        label       = $.rightNavButtonLabel;
        image.image = '/RightNavArrow.png' || null;
    }

    //Style the button according to the side and passed JSON info
    if (button.text) {
        label.text    = button.text;
        label.color   = button.textColor || '#007aff';
        label.font    = button.textFont  || {fontSize : 15};
        label.visible = true;
        view.opacity = 1;
    } else if (button.image) {
        image.image  = button.image;
        label.text   = '';
        view.opacity = 1;
    } else {
        view.opacity = 0;
    }
    
    console.log(button);
    console.log('Side: ' + side + ' Visible: ' + view.visible);
};

function eventListener(button) {
    //Save confusion by using some quick vars
    var page     = pageStack[pageStack.length - 1];
    var prevPage = pageStack[pageStack.length - 2];

    if (button[page.title].callbackType == 'open') {
        //Add the new view on top and add it to the viewStack for removal later
        var controller = Alloy.createController(button[page.title].callback);
        var view = controller.getView();
        viewStack.push(view);
        controllerStack.push(controller);

        //If animation is true animate the view, otherwise just pop it on top
        if (button[page.title].animationOff) {
            $.contentView.add(view);
            $.leftNavButtonView.touchEnabled = true;
            $.rightNavButtonView.touchEnabled = true;
        } else {
            view.visible = false;
            animateIn(button[page.title].animationDirection, view);
        }

    } else if (button[page.title].callbackType == 'close') {
        //Remove view from navigation, animating if it is set to true
        if (button[page.title].animationOff) {
            $.contentView.remove(viewStack[viewStack.length - 1]);
            $.leftNavButtonView.touchEnabled = true;
        $.rightNavButtonView.touchEnabled = true;
        } else {
            animateOut(button[page.title].animationDirection, viewStack[viewStack.length - 1]);
        }
		 
		//Style nav bar and buttons back to previous page
		$.pageTitle.text = prevPage.title || $.pageTitle.text || '';
        navButtonSetup(leftButtonStack[prevPage.title], 'left');
        navButtonSetup(rightButtonStack[prevPage.title], 'right'); 
		 
        //Remove the elements that are closed
        controllerStack[controllerStack.length - 1].destroy();
        controllerStack.pop();
        pageStack.pop();
        viewStack.pop();
        delete leftButtonStack[page.title];
        delete rightButtonStack[page.title];
    } else {
        button[page.title].callback && button[page.title].callback();
    }
};


//FIXME: Animation jittering iOS, sometimes not animating Android
function animateIn(direction, view) {    
    $.contentView.add(view);
    
    var animation = Ti.UI.createAnimation({
        top       : 0,
        bottom    : 0,
        left      : 0,
        right     : 0,
        duration  : 500
    });
    
    //-1 because 1 pixel needs to be on screen to animate iOS
    var width  = view.size.width - 1;
    var height = view.size.height - 1;
    
    //Change the animation depending on the selected direction of slide-in
    if (direction == 'left') {
        view.left      = -width;
        view.right     = width;
    } else if (direction == 'right') {
        view.left      = width;
        view.right     = -width;
    } else if (direction == 'down') {
        view.top       = -height;
        view.bottom    = height;
    } else {
        view.top       = height;
        view.bottom    = -height;
    }
    
    view.visible = true;
    view.animate(animation);

    animation.addEventListener('complete', function() {
        $.leftNavButtonView.touchEnabled  = true;
        $.rightNavButtonView.touchEnabled = true;
    });
};

function animateOut(direction, view) {
    var animation = Ti.UI.createAnimation({duration : 500});
   
    //Change the animation to slide-out the view the opposite way the the view slid in
    if (direction == 'left') {
        animation.left   = -view.size.width;
        animation.right  = view.size.width;
    } else if (direction == 'right') {
        animation.right  = -view.size.width;
        animation.left   = view.size.width;
    } else if (direction == 'down') {
        animation.bottom = -view.size.height;
        animation.top    = view.size.height;
    } else {
        animation.top    = -view.size.height;
        animation.bottom = view.size.height;
    }
    
    view.animate(animation);

    //Let the animation finish before the view is removed
    animation.addEventListener('complete', function() {
        $.contentView.remove(view);
        $.leftNavButtonView.touchEnabled = true;
        $.rightNavButtonView.touchEnabled = true;
    });
};