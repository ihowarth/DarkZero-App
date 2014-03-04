function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function initNavigation() {
        APP.setFirstTimeFalse();
        Alloy.Globals.NavigationWidget = $.navigationView;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.mainWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        layout: "vertical",
        id: "mainWin"
    });
    $.__views.mainWin && $.addTopLevelView($.__views.mainWin);
    $.__views.navigationView = Alloy.createWidget("navigation", "widget", {
        id: "navigationView",
        __parentSymbol: $.__views.mainWin
    });
    $.__views.navigationView.setParent($.__views.mainWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    initNavigation();
    $.mainWin.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;