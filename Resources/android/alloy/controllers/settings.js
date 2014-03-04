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
        Alloy.Globals.NavigationWidget.pageTitle.text = "Settings";
        Alloy.Globals.NavigationWidget.changeLeftNavButton();
        Alloy.Globals.NavigationWidget.changeRightNavButton("close", "/Information.png");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.settingsView = Ti.UI.createView({
        backgroundColor: "green",
        id: "settingsView"
    });
    $.__views.settingsView && $.addTopLevelView($.__views.settingsView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;