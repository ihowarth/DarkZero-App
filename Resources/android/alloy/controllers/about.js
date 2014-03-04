function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        Alloy.Globals.NavigationWidget.pageTitle.text = "About";
        Alloy.Globals.NavigationWidget.changeLeftNavButton("close", "/Settings.png");
        Alloy.Globals.NavigationWidget.changeRightNavButton();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "about";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.aboutView = Ti.UI.createView({
        backgroundColor: "blue",
        id: "aboutView"
    });
    $.__views.aboutView && $.addTopLevelView($.__views.aboutView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;