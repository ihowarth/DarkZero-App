var animateOn = true;

var pageStack = [];
var viewStack = [];
var leftButtonStack = {};
var rightButtonStack = {};

exports.toggleAnimation = function() {
    animateOn != animateOn;
};

exports.editNavView = function(navBar) {
    $.navBar.height = navBar.height;
    $.navBar.backgroundColor = navBar.backgroundColor;
    $.shadow.visible = navBar.shadow;
};

exports.addNewView = function(content, left, right) {
    //If there is a controller to open, do so and add it to the view
    if (content.controller) {
        var view = Alloy.createController(content.controller).getView();
        $.content.add(view);
        viewStack.push(view);
    }

    //Style nav bar with buttons and a title
    setNavBar(content, left, right);

    //Add the JSON objects to stacks, to be used later on return to the page
    pageStack.push(content);
    leftButtonStack[content.title] = left;
    rightButtonStack[content.title] = right;
};

$.leftNavButtonView.addEventListener('click', function() {
    eventListener(leftButtonStack);
});

$.rightNavButtonView.addEventListener('click', function() {
    eventListener(rightButtonStack);
});

function setNavBar(content, left, right) {
    $.pageTitle.text = content.title;

    if (left.text) {
        $.leftNavButtonLabel.text = left.text;
        $.leftNavButtonImage.image = '/LeftNavArrow.png' || null;
        $.leftNavButtonLabel.visible = true;
        $.leftNavButtonView.visible = true;
    } else if (left.image) {
        $.leftNavButtonImage.image = left.image;
        $.leftNavButtonLabel.visible = false;
        $.leftNavButtonView.visible = true;
    } else {
        $.leftNavButtonView.visible = false;
    }

    if (right.text) {
        $.rightNavButtonLabel.text = right.text;
        $.rightNavButtonImage.image = '/RightNavArrow.png' || null;
        $.rightNavButtonLabel.visible = true;
        $.rightNavButtonView.visible = true;
    } else if (right.image) {
        $.rightNavButtonImage.image = right.image;
        $.rightNavButtonLabel.visible = false;
        $.rightNavButtonView.visible = true;
    } else {
        $.rightNavButtonView.visible = false;
    }
};

function eventListener(e) {
    //Save confusion by using some quick vars
    var content = pageStack[pageStack.length - 1];
    var prevContent = pageStack[pageStack.length - 2];

    if (e[content.title].callbackType == 'open') {
        //Add the new view on top and add it to the viewStack for removal later
        var view = Alloy.createController(e[content.title].callback).getView();

        viewStack.push(view);

        //If animation is true animate the view, otherwise just pop it on top
        if (animateOn)
            animateIn(e[content.title].animationDirection, view);
        else
            $.content.add(view);
    } else if (e[content.title].callbackType == 'close') {
        //Remove view from navigation, animating if it is set to true
        if (animateOn)
            animateOut(e[content.title].animationDirection, viewStack[viewStack.length - 1]);
        else
            $.content.remove(viewStack[viewStack.length - 1]);

        //Style buttons back to previous page
        setNavBar(prevContent, leftButtonStack[prevContent.title], rightButtonStack[prevContent.title]);

        //Remove the elements that are closed
        pageStack.pop();
        viewStack.pop();
        delete leftButtonStack[content.title];
        delete rightButtonStack[content.title];
    } else {
        e.source[content].callback();
    }
};

function animateIn(direction, view) {
    if (direction == 'left')
        view.right = APP.deviceWidth - 1;
    else if (direction == 'up')
        view.top = APP.deviceHeight - ($.navBar.height + 1);
    else if (direction == 'down')
        view.bottom = APP.deviceHeight - ($.navBar.height + 1);
    else
        view.left = APP.deviceWidth - 1;

    $.content.add(view);

    if (direction == 'left') {
        view.animate({
            right : 0
        });
    } else if (direction == 'up') {
        view.animate({
            top : 0
        });
    } else if (direction == 'down') {
        view.animate({
            bottom : 0
        });
    } else {
        view.animate({
            left : 0
        });
    }
};

function animateOut(direction, view) {
    var leftAnimation = Ti.UI.createAnimation({
        right : APP.deviceWidth - 1
    });
    var rightAnimation = Ti.UI.createAnimation({
        left : APP.deviceWidth - 1
    });
    var upAnimation = Ti.UI.createAnimation({
        bottom : APP.deviceHeight - ($.navBar.height + 1)
    });
    var downAnimation = Ti.UI.createAnimation({
        top : APP.deviceHeight - ($.navBar.height + 1)
    });

    if (direction == 'left') {
        view.animate(leftAnimation);
    } else if (direction == 'up') {
        view.animate(upAnimation);
    } else if (direction == 'down') {
        view.animate(downAnimation);
    } else {
        view.animate(rightAnimation);
    }

    leftAnimation.addEventListener('complete', function() {
        $.content.remove(view);
    });
    rightAnimation.addEventListener('complete', function() {
        $.content.remove(view);
    });
    upAnimation.addEventListener('complete', function() {
        $.content.remove(view);
    });
    downAnimation.addEventListener('complete', function() {
        $.content.remove(view);
    });
};