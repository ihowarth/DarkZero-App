function Controller() {
    function __alloyId3(e) {
        if (e && e.fromAdapter) return;
        __alloyId3.opts || {};
        var models = __alloyId2.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId0 = models[i];
            __alloyId0.__transform = addHeaders(__alloyId0);
            var __alloyId1 = Alloy.createController("teamRow", {
                $model: __alloyId0,
                __parentSymbol: __parentSymbol
            });
            rows.push(__alloyId1.getViewEx({
                recurse: true
            }));
        }
        $.__views.teamTable.setData(rows);
    }
    function init() {
        Alloy.Globals.NavigationWidget.addNewView({
            title: "About"
        }, {
            image: "Settings.png",
            callbackType: "close"
        }, {});
        addEventListeners();
    }
    function addEventListeners() {
        $.emailLink.addEventListener("click", function() {
            APP.checkNetwork() ? Ti.UI.createEmailDialog({
                subject: "Message from DarkZero App",
                toRecipients: [ "team@darkzero.co.uk" ],
                messageBody: "DarkZero is awesome!"
            }).open() : Ti.UI.createAlertDialog({
                title: "No Network Connection",
                message: "You must be connected to the internet to send an e-mail",
                ok: "Okay"
            }).open();
        });
    }
    function addHeaders(model) {
        var transform = model.toJSON();
        transform.name = "Name: " + transform.name;
        transform.occupation = "Occupation: " + transform.occupation;
        transform.favouriteGames = "Favourite Games: " + transform.favouriteGames;
        transform.bio = "Bio: " + transform.bio;
        return transform;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "about";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#ffffff",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.aboutView = Ti.UI.createScrollView({
        width: 300,
        layout: "vertical",
        id: "aboutView"
    });
    $.__views.container.add($.__views.aboutView);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo"
    });
    $.__views.aboutView.add($.__views.logo);
    $.__views.info = Ti.UI.createLabel({
        text: "We are based in both the UK and the US and welcome emails from readers, publishers, developers, advertisers and PR agencies. \n \n If you would like us to review your game, please just ask! We try to cover as many as we can.\n \n",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 9
        },
        id: "info"
    });
    $.__views.aboutView.add($.__views.info);
    $.__views.emailLink = Ti.UI.createLabel({
        text: "team@darkzero.co.uk",
        color: "blue",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 9
        },
        id: "emailLink"
    });
    $.__views.aboutView.add($.__views.emailLink);
    $.__views.follow = Ti.UI.createLabel({
        text: "\n Follow us!",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 10
        },
        id: "follow"
    });
    $.__views.aboutView.add($.__views.follow);
    $.__views.socialContainer = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        id: "socialContainer"
    });
    $.__views.aboutView.add($.__views.socialContainer);
    $.__views.facebook = Ti.UI.createImageView({
        id: "facebook"
    });
    $.__views.socialContainer.add($.__views.facebook);
    $.__views.twitter = Ti.UI.createImageView({
        id: "twitter"
    });
    $.__views.socialContainer.add($.__views.twitter);
    $.__views.meet = Ti.UI.createLabel({
        text: "\n Meet the team",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 9
        },
        id: "meet"
    });
    $.__views.aboutView.add($.__views.meet);
    $.__views.teamTable = Ti.UI.createTableView({
        top: 10,
        height: Ti.UI.SIZE,
        scrollable: false,
        separatorColor: "#ffffff",
        allowsSelection: false,
        id: "teamTable"
    });
    $.__views.aboutView.add($.__views.teamTable);
    var __alloyId2 = Alloy.Collections["team"] || team;
    __alloyId2.on("fetch destroy change add remove reset", __alloyId3);
    exports.destroy = function() {
        __alloyId2.off("fetch destroy change add remove reset", __alloyId3);
    };
    _.extend($, $.__views);
    arguments[0] || {};
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;