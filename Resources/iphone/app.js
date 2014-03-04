var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var debug = false;

Alloy.Globals.darkZeroLib = require("darkZero");

Alloy.Collections.team = Alloy.createCollection("team");

var APP = {
    osname: Ti.Platform.osname,
    deviceWidth: Ti.Platform.displayCaps.platformWidth,
    deviceHeight: Ti.Platform.displayCaps.platformHeight,
    firstTime: Ti.App.Properties.getString("first", "true"),
    setFirstTimeFalse: function() {
        Ti.App.Properties.setString("first", "false");
    },
    checkNetwork: function() {
        return Titanium.Network.getOnline();
    }
};

Alloy.createController("index");