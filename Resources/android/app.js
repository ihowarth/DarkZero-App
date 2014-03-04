var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var debug = false;

var APP = {
    osname: "android",
    deviceWidth: Ti.Platform.displayCaps.platformWidth,
    deviceHeight: Ti.Platform.displayCaps.platformHeight
};

Alloy.createController("index");