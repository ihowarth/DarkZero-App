var args = arguments[0] || {};

function init() {
    
};
init();

exports.changeTheme = function() {
    $.mainView.backgroundColor    = Alloy.Globals.colors.background; 
    $.reviewTable.separatorColor  = Alloy.Globals.colors.tableSeparator;
    $.reviewTable.backgroundColor = Alloy.Globals.colors.tableBackground;
    //Loop through rows and change backgroundColor
};
