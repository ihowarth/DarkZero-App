function Controller() {
    function initNavigation() {
        APP.setFirstTimeFalse();
        Alloy.Globals.NavigationWidget.editNavView({
            height: 60,
            backgroundColor: "#f0f0f0",
            shadow: true
        });
        Alloy.Globals.NavigationWidget.addNewView({
            title: "DarkZero",
            controller: "frontPage"
        }, {
            image: "Settings.png",
            callback: "settings",
            callbackType: "open"
        }, {
            image: "Information.png",
            callback: "about",
            callbackType: "open"
        });
        $.mainWin.add(Alloy.Globals.NavigationWidget.getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.mainWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        layout: "vertical",
        id: "mainWin"
    });
    $.__views.mainWin && $.addTopLevelView($.__views.mainWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    initNavigation();
    $.mainWin.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;