var args = arguments[0] || {};

function init() {
    //TODO: Fill in the table
};
init();

Alloy.Globals.changeFrontPageTheme = function() {
    $.mainView.backgroundColor    = Alloy.Globals.colors.background; 
    $.postTable.separatorColor    = Alloy.Globals.colors.frontPageSeparator;
    $.postTable.backgroundColor   = Alloy.Globals.colors.tableBackground;
    //Loop through rows and change backgroundColor
    for(var i = 0; i < $.postTable.data.length; i++) {
        $.postTable.data[i].backgroundColor = Alloy.Globals.colors.tableBackground;
    }
};
