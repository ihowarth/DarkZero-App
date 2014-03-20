var args = arguments[0] || {};

function init() {
    
};
init();

Alloy.Globals.changeFrontPageTheme = function() {
    $.mainView.backgroundColor    = Alloy.Globals.colors.background; 
    //TODO:Changing the seperator color doesn't update it, so I need to find a middleground color or leave transparent
    $.postTable.separatorColor    = Alloy.Globals.colors.frontPageSeparator;
    $.postTable.backgroundColor   = Alloy.Globals.colors.tableBackground;
    //Loop through rows and change backgroundColor
    for(var i = 0; i < $.postTable.data.length; i++) {
        $.postTable.data[i].backgroundColor = Alloy.Globals.colors.tableBackground;
    }
};
