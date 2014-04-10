exports.definition = {
	config : {
		columns : {
		    'type'    : 'TEXT',
		    'time'    : 'TEXT',
		    'date'    : 'TEXT',
		    'title'   : 'TEXT',
		    'image'   : 'TEXT',
		    'author'  : 'TEXT',
		    'content' : 'TEXT',
		},
		defaults : {
		    'type'    : 'Type',
            'time'    : 'Time',
            'date'    : 'Date',
            'title'   : 'Title',
            'image'   : '/defaultCover.jpg',
            'author'  : 'Author',
            'content' : 'Content'
		},
		adapter : {
			type: "sql",
			collection_name: "posts"
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