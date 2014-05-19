exports.definition = {
	config : {
		columns : {
		    "type"  	    : "TEXT",
    		"title" 	    : "TEXT",
    		"platform" 	    : "TEXT",
    		"image"         : "TEXT",
    		"alsoAvailable" : "TEXT",
    		"publishTime"   : "TEXT",
    		"publisher"     : "TEXT",
			"developer"     : "TEXT",
    		"genre" 	  	: "TEXT",
			"author" 	    : "TEXT",
			"content"       : "TEXT",
			"score"         : "TEXT"
		},
		defaults : {
            "type"  	    : "Type",
    		"title" 	    : "Title",
    		"platform" 	    : "Platform",
    		"image"         : "/defaultCover.jpg",
    		"alsoAvailable" : "Also",
    		"publishTime"   : "Time",
    		"publisher"     : "Publisher",
			"developer"     : "Developer",
    		"genre" 	  	: "Genre",
			"author" 	    : "Author",
			"content" 		: "Content",
			"score"         : "Score"
		},
		adapter : {
			type			: "sql",
			collection_name : "posts"
		}
	},
	extendModel : function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};