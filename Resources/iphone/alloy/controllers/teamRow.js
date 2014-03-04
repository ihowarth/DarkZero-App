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
    this.__controllerPath = "teamRow";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        var $model = __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        top: 10,
        height: Ti.UI.SIZE,
        backgroundColor: "#ffffff",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.image = Ti.UI.createImageView({
        top: 10,
        left: 0,
        width: 75,
        height: 75,
        id: "image",
        image: "undefined" != typeof $model.__transform["image"] ? $model.__transform["image"] : $model.get("image")
    });
    $.__views.row.add($.__views.image);
    $.__views.labelContainer = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "labelContainer"
    });
    $.__views.row.add($.__views.labelContainer);
    $.__views.name = Ti.UI.createLabel({
        top: 5,
        left: 100,
        font: {
            fontSize: 9
        },
        id: "name",
        text: "undefined" != typeof $model.__transform["name"] ? $model.__transform["name"] : $model.get("name")
    });
    $.__views.labelContainer.add($.__views.name);
    $.__views.occupation = Ti.UI.createLabel({
        top: 5,
        left: 100,
        font: {
            fontSize: 9
        },
        id: "occupation",
        text: "undefined" != typeof $model.__transform["occupation"] ? $model.__transform["occupation"] : $model.get("occupation")
    });
    $.__views.labelContainer.add($.__views.occupation);
    $.__views.favouriteGames = Ti.UI.createLabel({
        top: 5,
        left: 100,
        font: {
            fontSize: 9
        },
        id: "favouriteGames",
        text: "undefined" != typeof $model.__transform["favouriteGames"] ? $model.__transform["favouriteGames"] : $model.get("favouriteGames")
    });
    $.__views.labelContainer.add($.__views.favouriteGames);
    $.__views.bio = Ti.UI.createLabel({
        top: 5,
        left: 100,
        font: {
            fontSize: 9
        },
        id: "bio",
        text: "undefined" != typeof $model.__transform["bio"] ? $model.__transform["bio"] : $model.get("bio")
    });
    $.__views.labelContainer.add($.__views.bio);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;