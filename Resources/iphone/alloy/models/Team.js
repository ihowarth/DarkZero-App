exports.definition = {
    config: {
        columns: {
            name: "TEXT",
            occupation: "TEXT",
            favouriteGames: "TEXT",
            bio: "TEXT",
            image: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "team"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("team", exports.definition, []);

collection = Alloy.C("team", exports.definition, model);

exports.Model = model;

exports.Collection = collection;