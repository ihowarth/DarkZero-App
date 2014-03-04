function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "navigation/" + s : s.substring(0, index) + "/navigation/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function animateViewIn(direction) {
        var controller = direction;
        controller = "left" == controller ? leftButtonController : rightButtonController;
        newView = Alloy.createController(controller).getView();
        imageStack.push({
            view: newView,
            direction: direction
        });
        "left" == direction ? newView.right = APP.deviceWidth - 1 : newView.left = APP.deviceWidth - 1;
        $.content.add(newView);
        "left" == direction ? newView.animate({
            right: 0
        }) : newView.animate({
            left: 0
        });
    }
    function animateViewOut() {
        imageStack[imageStack.length - 1].view;
        var leftAnimation = Ti.UI.createAnimation({
            right: APP.deviceWidth - 1
        });
        var rightAnimation = Ti.UI.createAnimation({
            left: APP.deviceWidth - 1
        });
        "left" == imageStack[imageStack.length - 1].direction ? newView.animate(leftAnimation) : newView.animate(rightAnimation);
        leftAnimation.addEventListener("complete", function() {
            $.content.remove(newView);
            newView = null;
            imageStack.shift();
        });
        rightAnimation.addEventListener("complete", function() {
            $.content.remove(newView);
            newView = null;
            imageStack.shift();
        });
    }
    new (require("alloy/widget"))("navigation");
    this.__widgetId = "navigation";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        layout: "vertical",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.navBar = Ti.UI.createView({
        height: 60,
        backgroundColor: "#f0f0f0",
        id: "navBar"
    });
    $.__views.container.add($.__views.navBar);
    $.__views.pageTitle = Ti.UI.createLabel({
        bottom: 10,
        color: "#000000",
        id: "pageTitle"
    });
    $.__views.navBar.add($.__views.pageTitle);
    $.__views.leftNavButton = Ti.UI.createImageView({
        left: 10,
        bottom: 10,
        height: 20,
        width: 20,
        id: "leftNavButton"
    });
    $.__views.navBar.add($.__views.leftNavButton);
    $.__views.rightNavButton = Ti.UI.createImageView({
        right: 10,
        bottom: 10,
        height: 20,
        width: 20,
        id: "rightNavButton"
    });
    $.__views.navBar.add($.__views.rightNavButton);
    $.__views.shadow = Ti.UI.createView({
        bottom: 0,
        height: 1,
        backgroundColor: "#909090",
        id: "shadow"
    });
    $.__views.navBar.add($.__views.shadow);
    $.__views.content = Ti.UI.createView({
        id: "content"
    });
    $.__views.container.add($.__views.content);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var leftButtonController = null;
    var rightButtonController = null;
    var imageStack = [];
    var animationOn = true;
    exports.toggleAnimation = function() {
        animationOn != animationOn;
    };
    var closeCurrentView = exports.closeCurrentView = function() {
        if (imageStack.length > 0) if (animationOn) animateViewOut(); else {
            $.content.remove[imageStack.length - 1];
            imageStack.shift();
        }
    };
    exports.changeLeftNavButton = function(leftNavButtonController, leftNavButtonImage) {
        leftButtonController = leftNavButtonController;
        if (leftNavButtonImage) {
            $.leftNavButton.visible = true;
            $.leftNavButton.image = leftNavButtonImage;
        } else $.leftNavButton.visible = false;
    };
    exports.changeRightNavButton = function(rightNavButtonController, rightNavButtonImage) {
        rightButtonController = rightNavButtonController;
        if (rightNavButtonImage) {
            $.rightNavButton.visible = true;
            $.rightNavButton.image = rightNavButtonImage;
        } else $.rightNavButton.visible = false;
    };
    $.leftNavButton.addEventListener("click", function() {
        if ("close" == leftButtonController) closeCurrentView(); else if (animationOn) animateViewIn("left"); else {
            $.content.add(Alloy.createController(leftButtonController).getView());
            imageStack.push(Alloy.createController(leftButtonController).getView());
        }
    });
    $.rightNavButton.addEventListener("click", function() {
        if ("close" == rightButtonController) closeCurrentView(); else if (animationOn) animateViewIn("right"); else {
            $.content.add(Alloy.createController(rightButtonController).getView());
            imageStack.push(Alloy.createController(rightButtonController).getView());
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;