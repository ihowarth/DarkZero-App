var animateOn = true;

var pageStack        = [];
var viewStack        = [];
var leftButtonStack  = {};
var rightButtonStack = {};

exports.toggleAnimation = function() {
    animateOn != animateOn;
};

exports.editNavView = function(navBar) {
    $.navBar.height          = navBar.height          || 60;
    $.navBar.backgroundColor = navBar.backgroundColor || '#f0f0f0';
    $.shadow.visible         = navBar.shadow          || true;
    $.pageTitle.color        = navBar.titleColor      || '#000000';
};

exports.addNewView = function(content, left, right) {
    //If there is a controller to open, do so and add it to the view
    if (content.controller) {
        var view = Alloy.createController(content.controller).getView();
        $.content.add(view);
        viewStack.push(view);
    }

    //Style nav bar with buttons and a title
    //If title doesn't exist use previous title, if THAT doesn't exist, the label is empty
    $.pageTitle.text = content.title || $.pageTitle.text || '';
    navButtonSetup(left, 'left');
    navButtonSetup(right, 'right');

    //Add the JSON objects to stacks, to be used later on return to the page
    pageStack.push(content);
    leftButtonStack[content.title]  = left;
    rightButtonStack[content.title] = right;
};

$.leftNavButtonView.addEventListener('touchend', function() {
    eventListener(leftButtonStack);
});

$.rightNavButtonView.addEventListener('touchend', function() {
    eventListener(rightButtonStack);
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
        label.visible = true;
        view.visible  = true;
    } else if (button.image) {
        image.image  = button.image;
        label.text   = '';
        view.visible = true;
    } else {
        view.visible = false;
    }
};

function eventListener(button) {
    //Save confusion by using some quick vars
    var content     = pageStack[pageStack.length - 1];
    var prevContent = pageStack[pageStack.length - 2];

    if (button[content.title].callbackType == 'open') {
        //Add the new view on top and add it to the viewStack for removal later
        var view = Alloy.createController(button[content.title].callback).getView();

        viewStack.push(view);

        //If animation is true animate the view, otherwise just pop it on top
        if (animateOn) {
            animateIn(button[content.title].animationDirection, view);
        } else {
            $.content.add(view);
        }
    } else if (button[content.title].callbackType == 'close') {
        //Style buttons back to previous page
        $.pageTitle.text = prevContent.title || $.pageTitle.text || '';
        navButtonSetup(leftButtonStack[prevContent.title], 'left');
        navButtonSetup(rightButtonStack[prevContent.title], 'right');

        //Remove view from navigation, animating if it is set to true
        if (animateOn) {
            animateOut(button[content.title].animationDirection, viewStack[viewStack.length - 1]);
        } else {
            $.content.remove(viewStack[viewStack.length - 1]);
        }

        //Remove the elements that are closed
        pageStack.pop();
        viewStack.pop();
        delete leftButtonStack[content.title];
        delete rightButtonStack[content.title];
    } else {
        button[content.title].callback();
    }

};

function animateIn(direction, view) {
    var animation = Ti.UI.createAnimation();

    //Change the animation depending on the selected direction of slide-in
    if (direction == 'left') {
        view.right      = APP.deviceWidth - 1;
        animation.right = 0;
    } else if (direction == 'up') {
        view.top      = APP.deviceHeight - ($.navBar.height + 1);
        animation.top = 0;
    } else if (direction == 'down') {
        view.bottom      = APP.deviceHeight - ($.navBar.height + 1);
        animation.bottom = 0;
    } else {
        view.left      = APP.deviceWidth - 1;
        animation.left = 0;
    }

    $.content.add(view);

    view.animate(animation);
};

function animateOut(direction, view) {
    var animation = Ti.UI.createAnimation();
    
    //Change the animation to slide-out the view the opposite way the the view slid in
    if (direction == 'left') {
        animation.right = APP.deviceWidth - 1;    
    } else if (direction == 'up') {
        animation.top = APP.deviceHeight - ($.navBar.height + 1);
    } else if (direction == 'down') {
        animation.bottom = APP.deviceHeight - ($.navBar.height + 1);
    } else {
        animation.left = APP.deviceWidth - 1;
    }

    view.animate(animation);
    
    //Let the animation finish before the view is removed
    animation.addEventListener('complete', function() {
        $.content.remove(view);
    });
};