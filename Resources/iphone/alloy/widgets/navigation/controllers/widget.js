function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "navigation/" + s : s.substring(0, index) + "/navigation/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function setNavBar(content, left, right) {
        $.pageTitle.text = content.title;
        $.leftNavButton.image = left.image || null;
        $.leftNavButton.visible = left.image ? true : false;
        $.rightNavButton.image = right.image || null;
        $.rightNavButton.visible = right.image ? true : false;
    }
    function animateIn(direction, view) {
        "left" == direction ? view.right = APP.deviceWidth - 1 : view.left = APP.deviceWidth - 1;
        $.content.add(view);
        "left" == direction ? view.animate({
            right: 0
        }) : view.animate({
            left: 0
        });
    }
    function animateOut(direction, view) {
        var leftAnimation = Ti.UI.createAnimation({
            left: APP.deviceWidth - 1
        });
        var rightAnimation = Ti.UI.createAnimation({
            right: APP.deviceWidth - 1
        });
        "left" == direction ? view.animate(leftAnimation) : view.animate(rightAnimation);
        leftAnimation.addEventListener("complete", function() {
            $.content.remove(view);
        });
        rightAnimation.addEventListener("complete", function() {
            $.content.remove(view);
        });
    }
    new (require("alloy/widget"))("navigation");
    this.__widgetId = "navigation";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        if (content.controller) {
            var view = Alloy.createController(content.controller).getView();
            $.content.add(view);
            viewStack.push(view);
        }
        setNavBar(content, left, right);
        pageStack.push(content);
        leftButtonStack[content.title] = left;
        rightButtonStack[content.title] = right;
    };
    $.leftNavButton.addEventListener("click", function() {
        var content = pageStack[pageStack.length - 1];
        var prevContent = pageStack[pageStack.length - 2];
        if ("open" == leftButtonStack[content.title].callbackType) {
            var view = Alloy.createController(leftButtonStack[content.title].callback).getView();
            viewStack.push(view);
            animateOn ? animateIn("left", view) : $.content.add(view);
        } else if ("close" == leftButtonStack[content.title].callbackType) {
            animateOn ? animateOut("left", viewStack[viewStack.length - 1]) : $.content.remove(viewStack[viewStack.length - 1]);
            setNavBar(prevContent, leftButtonStack[prevContent.title], rightButtonStack[prevContent.title]);
            pageStack.pop();
            viewStack.pop();
            delete leftButtonStack[content.title];
            delete rightButtonStack[content.title];
        } else leftButtonStack[content].callback();
    });
    $.rightNavButton.addEventListener("click", function() {
        var content = pageStack[pageStack.length - 1];
        var prevContent = pageStack[pageStack.length - 2];
        if ("open" == rightButtonStack[content.title].callbackType) {
            var view = Alloy.createController(rightButtonStack[content.title].callback).getView();
            viewStack.push(view);
            animateOn ? animateIn("right", view) : $.content.add(view);
        } else if ("close" == rightButtonStack[content.title].callbackType) {
            animateOn ? animateOut("right", viewStack[viewStack.length - 1]) : $.content.remove(viewStack[viewStack.length - 1]);
            setNavBar(prevContent, leftButtonStack[prevContent.title], rightButtonStack[prevContent.title]);
            pageStack.pop();
            viewStack.pop();
            delete leftButtonStack[content.title];
            delete rightButtonStack[content.title];
        } else rightButtonStack[content].callback();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;