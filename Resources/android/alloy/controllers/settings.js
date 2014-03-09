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
        Alloy.Globals.NavigationWidget.newLevel({
            title: "Settings"
        }, {}, {
            title: "Back",
            callbackType: "close"
        });
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
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#ffffff",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.settingsView = Ti.UI.createView({
        backgrounColor: "#ffffff",
        width: 300,
        id: "settingsView"
    });
    $.__views.container.add($.__views.settingsView);
    $.__views.pushNotificationsSwitch = Ti.UI.createSwitch({
        right: 10,
        top: 35,
        value: false,
        id: "pushNotificationsSwitch"
    });
    $.__views.settingsView.add($.__views.pushNotificationsSwitch);
    $.__views.themeSwitch = Ti.UI.createSwitch({
        right: 10,
        top: 85,
        value: true,
        id: "themeSwitch"
    });
    $.__views.settingsView.add($.__views.themeSwitch);
    $.__views.soundsSwitch = Ti.UI.createSwitch({
        right: 10,
        top: 135,
        value: true,
        id: "soundsSwitch"
    });
    $.__views.settingsView.add($.__views.soundsSwitch);
    $.__views.pushNotificationsLabel = Ti.UI.createLabel({
        left: 10,
        top: 40,
        text: "Allow Push notifications",
        font: {
            fontSize: 12
        },
        color: "#707070",
        id: "pushNotificationsLabel"
    });
    $.__views.settingsView.add($.__views.pushNotificationsLabel);
    $.__views.themeLabel = Ti.UI.createLabel({
        left: 10,
        top: 90,
        text: "Enable light theme",
        font: {
            fontSize: 12
        },
        color: "#707070",
        id: "themeLabel"
    });
    $.__views.settingsView.add($.__views.themeLabel);
    $.__views.soundsLabel = Ti.UI.createLabel({
        left: 10,
        top: 140,
        text: "Enable sounds",
        font: {
            fontSize: 12
        },
        color: "#707070",
        id: "soundsLabel"
    });
    $.__views.settingsView.add($.__views.soundsLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;