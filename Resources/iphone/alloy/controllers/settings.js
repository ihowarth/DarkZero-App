function Controller() {
    function init() {
        Alloy.Globals.NavigationWidget.addNewView({
            title: "Settings"
        }, {}, {
            image: "Information.png",
            callbackType: "close"
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#ffffff",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.settingsView = Ti.UI.createView({
        backgroundColor: "#ffffff",
        width: 300,
        id: "settingsView"
    });
    $.__views.container.add($.__views.settingsView);
    var __alloyId4 = [];
    $.__views.notificationRow = Ti.UI.createTableViewRow({
        height: 40,
        id: "notificationRow"
    });
    __alloyId4.push($.__views.notificationRow);
    $.__views.pushNotificationsLabel = Ti.UI.createLabel({
        left: 10,
        text: "Allow Push notifications",
        font: {
            fontSize: 12
        },
        color: "#707070",
        id: "pushNotificationsLabel"
    });
    $.__views.notificationRow.add($.__views.pushNotificationsLabel);
    $.__views.pushNotificationsSwitch = Ti.UI.createSwitch({
        right: 10,
        value: false,
        id: "pushNotificationsSwitch"
    });
    $.__views.notificationRow.add($.__views.pushNotificationsSwitch);
    $.__views.themeRow = Ti.UI.createTableViewRow({
        height: 40,
        id: "themeRow"
    });
    __alloyId4.push($.__views.themeRow);
    $.__views.themeLabel = Ti.UI.createLabel({
        left: 10,
        text: "Enable light theme",
        font: {
            fontSize: 12
        },
        color: "#707070",
        id: "themeLabel"
    });
    $.__views.themeRow.add($.__views.themeLabel);
    $.__views.themeSwitch = Ti.UI.createSwitch({
        right: 10,
        value: false,
        id: "themeSwitch"
    });
    $.__views.themeRow.add($.__views.themeSwitch);
    $.__views.soundsRow = Ti.UI.createTableViewRow({
        height: 40,
        id: "soundsRow"
    });
    __alloyId4.push($.__views.soundsRow);
    $.__views.soundsLabel = Ti.UI.createLabel({
        left: 10,
        text: "Enable sounds",
        font: {
            fontSize: 12
        },
        color: "#707070",
        id: "soundsLabel"
    });
    $.__views.soundsRow.add($.__views.soundsLabel);
    $.__views.soundsSwitch = Ti.UI.createSwitch({
        right: 10,
        value: false,
        id: "soundsSwitch"
    });
    $.__views.soundsRow.add($.__views.soundsSwitch);
    $.__views.settingsTable = Ti.UI.createTableView({
        top: 20,
        height: Ti.UI.SIZE,
        width: 300,
        scrollable: false,
        allowsSelection: false,
        data: __alloyId4,
        id: "settingsTable"
    });
    $.__views.settingsView.add($.__views.settingsTable);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;