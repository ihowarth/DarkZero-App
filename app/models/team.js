exports.definition = {
	config: {
		columns: {
		    "name"            : "TEXT",
		    "occupation"      : "TEXT",
		    "favouriteGames"  : "TEXT",
		    "bio"             : "TEXT",
		    "image"           : "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "team"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};