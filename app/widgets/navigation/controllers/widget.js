var pageStack        = [];
var viewStack        = [];

var leftButtonStack  = {};
var rightButtonStack = {};

exports.addNewView = function(content, navBar, leftButton, rightButton) {
    //If there is a controller to open, do so and add it to the view
    if (content.controller) {
        var view = Alloy.createController(content.controller).getView();
        $.contentView.add(view);
        viewStack.push(view);
    }

    //Style nav bar, add buttons and a title
    //If title doesn't exist use previous title, if THAT doesn't exist, the label is empty
    $.pageTitle.text = navBar.title || $.pageTitle.text || '';
    navBarSetup(navBar);
    navButtonSetup(leftButton, 'left');
    navButtonSetup(rightButton, 'right');

    //Add the JSON objects to stacks, to be used later on return to the page
    pageStack.push(navBar);
    leftButtonStack[navBar.title]  = leftButton;
    rightButtonStack[navBar.title] = rightButton;
};

$.leftNavButtonView.addEventListener('touchend', function() {
    eventListener(leftButtonStack);
});

$.rightNavButtonView.addEventListener('touchend', function() {
    eventListener(rightButtonStack);
});

function navBarSetup(navBar) {
    $.navBar.height           = navBar.height          || 60;
    $.navBar.backgroundColor  = navBar.backgroundColor || '#f0f0f0';
    $.shadow.visible          = navBar.shadow          || true;
    $.pageTitle.color         = navBar.titleColor      || '#000000';
    $.pageTitle.font          = navBar.font            || {fontSize : 17};
};

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
    var page     = pageStack[pageStack.length - 1];
    var prevPage = pageStack[pageStack.length - 2];

    if (button[page.title].callbackType == 'open') {
        //Add the new view on top and add it to the viewStack for removal later
        var view = Alloy.createController(button[page.title].callback).getView();

        viewStack.push(view);

        //If animation is true animate the view, otherwise just pop it on top
        if (button[page.title].animationOff) {
            $.contentView.add(view);
        } else {
            animateIn(button[page.title].animationDirection, view);
        }
    } else if (button[page.title].callbackType == 'close') {
        //Style nav bar and buttons back to previous page
        $.pageTitle.text = prevPage.title || $.pageTitle.text || '';
        navBarSetup(pageStack[pageStack.length - 1]);
        navButtonSetup(leftButtonStack[prevPage.title], 'left');
        navButtonSetup(rightButtonStack[prevPage.title], 'right');

        //Remove view from navigation, animating if it is set to true
        if (button[page.title].animationOff) {
            $.contentView.remove(viewStack[viewStack.length - 1]);
        } else {
            animateOut(button[page.title].animationDirection, viewStack[viewStack.length - 1]);
        }

        //Remove the elements that are closed
        pageStack.pop();
        viewStack.pop();
        delete leftButtonStack[page.title];
        delete rightButtonStack[page.title];
    } else {
        button[page.title].callback && button[page.title].callback();
    }

};

function animateIn(direction, view) {
    var animation = Ti.UI.createAnimation();

    //Change the animation depending on the selected direction of slide-in
    if (direction == 'left') {
        view.right      = APP.deviceWidth - 1;
        animation.right = 0;
    } else if (direction == 'right') {
        view.left      = APP.deviceWidth - 1;
        animation.left = 0;
    } else if (direction == 'down') {
        view.bottom      = APP.deviceHeight - ($.navBar.height + 1);
        animation.bottom = 0;
    } else {
        view.top      = APP.deviceHeight - ($.navBar.height + 1);
        animation.top = 0;      
    }

    $.contentView.add(view);

    view.animate(animation);
};

function animateOut(direction, view) {
    var animation = Ti.UI.createAnimation();
    
    //Change the animation to slide-out the view the opposite way the the view slid in
    if (direction == 'left') {
        animation.right = APP.deviceWidth - 1;    
    } else if (direction == 'right') {
        animation.left = APP.deviceWidth - 1;
    } else if (direction == 'down') {
        animation.bottom = APP.deviceHeight - ($.navBar.height + 1);
    } else {
        animation.top = APP.deviceHeight - ($.navBar.height + 1);
    }

    view.animate(animation);
    
    //Let the animation finish before the view is removed
    animation.addEventListener('complete', function() {
        $.contentView.remove(view);
    });
};