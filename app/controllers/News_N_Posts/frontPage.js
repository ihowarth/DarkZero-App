var args = arguments[0] || {};

(function init() {
    $.newsFeed.add(Alloy.createController('/News_N_Posts/frontNews').getView());
})();

Alloy.Globals.changeFrontPageTheme = function() {
    $.container.backgroundColor    = Alloy.Globals.colors.background; 
    $.postTable.separatorColor    = Alloy.Globals.colors.frontPageSeparator;
    $.postTable.backgroundColor   = Alloy.Globals.colors.tableBackground;
    //Loop through rows and change backgroundColor
    for(var i = 0; i < $.postTable.data.length; i++) {
        $.postTable.data[i].backgroundColor = Alloy.Globals.colors.tableBackground;
    }
};