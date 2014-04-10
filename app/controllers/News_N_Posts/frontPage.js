var args = arguments[0] || {};

(function init() {
    addEventListeners();
})();

function addEventListeners() {
    // $.postsTable.addEventListener('swipe', function(e) {
        // if (e.direction == 'left') {
            // Alloy.createController('/Side_Pages/about').getView().open({
                // left : 0
            // });
        // } else {
            // Alloy.createController('/Side_Pages/settings').getView().open({
                // right : 0
            // });
        // }
    // });

    $.postsTable.addEventListener('click', function(e) {
        var model = Alloy.Collections.posts.at(e.index);
        var JSONModel = model.toJSON();
        
        Alloy.createController('/Details/detailsPage', JSONModel).getView().open({left : 0});
    });

    $.postsTable.addEventListener('postlayout', function(e) {
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