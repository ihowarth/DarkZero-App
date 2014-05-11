var args = arguments[0] || {};

(function init() {
    addEventListeners();
})();

function addEventListeners() {
    $.postsTable.addEventListener("click", function(e) {
        var model = Alloy.Collections.posts.at(e.index);
        var JSONModel = model.toJSON();
        
        Alloy.createController("/Details/postDetailsPage", JSONModel).getView().open({left : 0});
    });
    
    $.newsView.addEventListener("click", function(e) {
    	alert(e.index);
    });

    $.postsTable.addEventListener("postlayout", function(e) {
        Alloy.Collections.posts.fetch();
    }); 
};

Alloy.Globals.changeFrontPageTheme = function() {
    $.container.backgroundColor    = Alloy.Globals.colors.background; 
    $.postsTable.separatorColor    = Alloy.Globals.colors.frontPageSeparator;
    $.postsTable.backgroundColor   = Alloy.Globals.colors.tableBackground;
    //Loop through rows and change backgroundColor
    for(var i = 0; i < $.postsTable.data.length; i++) {
        $.postsTable.data[i].backgroundColor = Alloy.Globals.colors.tableBackground;
    }
};

function editModels(e){
    var model = e.toJSON;
    return model;  
};