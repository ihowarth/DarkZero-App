var args = arguments[0] || false;

exports.editNavView = function(navBar) {
    $.navBar.backgroundColor     = navBar.backgroundColor || Alloy.Globals.colors.navBarBackground;
    
    $.shadow.visible             = navBar.shadowVisible   || true;
    $.shadow.backgroundColor     = navBar.shadowColor     || Alloy.Globals.colors.navBarShadow;
    
    $.pageTitle.color            = navBar.titleColor      || Alloy.Globals.colors.navBarTitle;
    $.pageTitle.font             = navBar.titleFont       || {fontSize : 17};
    
    $.leftNavButtonLabel.color   = navBar.buttonTextColor || Alloy.Globals.colors.navBarText;
    $.rightNavButtonLabel.color = navBar.buttonTextColor  || Alloy.Globals.colors.navBarText;
};

if(args) {
    $.pageTitle.text = args.title || "Default Title";
    navButtonSetup(args.leftButton, "left");
    navButtonSetup(args.rightButton, "right");
}

function navButtonSetup(button, side) {
    if (side == "left") {
        view        = $.leftNavButtonView;
        image       = $.leftNavButtonImage;
        label       = $.leftNavButtonLabel;
        image.image = "/LeftNavArrow.png" || null;
    } else {
        view        = $.rightNavButtonView;
        image       = $.rightNavButtonImage;
        label       = $.rightNavButtonLabel;
        image.image = "/RightNavArrow.png" || null;
    }

    //Style the button according to the side and passed JSON info
    if (button.text) {
        label.text    = button.text;
        label.color   = button.textColor || Alloy.Globals.colors.navBarText;
        label.font    = button.textFont  || {fontSize : 15};
        label.visible = true;
        view.opacity = 1;
    } else if (button.image) {
        image.image  = button.image;
        label.text   = "";
        view.opacity = 1;
    } else {
        view.opacity = 0;
    }
};