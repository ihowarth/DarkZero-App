function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "navBar";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.header = Ti.UI.createView({
        height: 60,
        backgroundColor: "#f0f0f0",
        id: "header"
    });
    $.__views.header && $.addTopLevelView($.__views.header);
    $.__views.pageTitle = Ti.UI.createLabel({
        left: Alloy.Globals.middleWidth,
        bottom: 10,
        text: "DarkZero",
        id: "pageTitle"
    });
    $.__views.header.add($.__views.pageTitle);
    $.__views.leftNavButton = Ti.UI.createImageView({
        left: 10,
        bottom: 10,
        height: 20,
        width: 20,
        image: "Settings.png",
        id: "leftNavButton"
    });
    $.__views.header.add($.__views.leftNavButton);
    $.__views.rightNavButton = Ti.UI.createImageView({
        right: 10,
        bottom: 10,
        height: 20,
        width: 20,
        image: "Information.png",
        id: "rightNavButton"
    });
    $.__views.header.add($.__views.rightNavButton);
    $.__views.shadow = Ti.UI.createView({
        height: 1,
        backgroundColor: "#909090",
        bottom: 0,
        id: "shadow"
    });
    $.__views.header.add($.__views.shadow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    exports.changePageTitle = function(param) {
        $.pageTitle.text = param;
    };
    exports.changeleftNavButton = function(param) {
        $.leftNavButton.image = param;
    };
    exports.changeRightNavButton = function(param) {
        $.rightNavButton.image = param;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;