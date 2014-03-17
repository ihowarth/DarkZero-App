var args = arguments[0] || {};

function init() {
    
};
init();

Alloy.Globals.changeFrontPageTheme = function() {
    $.mainView.backgroundColor    = Alloy.Globals.colors.background; 
    $.reviewTable.separatorColor  = Alloy.Globals.colors.tableSeparator;
    $.reviewTable.backgroundColor = Alloy.Globals.colors.tableBackground;
    //Loop through rows and change backgroundColor
    for(var i = 0; i < $.reviewTable.data.length; i++) {
        $.reviewTable.data[i].backgroundColor = Alloy.Globals.colors.tableBackground; 
    }
};
