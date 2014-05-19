/**
 * @author  Ian Howarth <geekkingcloud@gmail.com>
 * @version BlueWave__ActivityIndicator__May_2014
 * 
 */

var isShown = false;

function show( data ) {
	if ( isShown == false ) {
		isShown == true;
		
		if ( data && data.text ) {
			$.messageLabel.text  = data.text;
			$.messageLabel.color = data.color || "#ffffff";
			$.messageLabel.font  = data.font  || {
		   		fontFamily : "Helvetica Neue",
		   		fontSize   : 18
		   };
		}
	
		if ( data && data.image ) {
			$.backgroundView.backgroundImage = data.image;
		}
		
		$.activityIndicator.show();
		$.mainWin.open();
	} else {
		
	}
};

function hide() {
	isShown = true;
	$.mainWin.close();
};

exports.show = show;
exports.hide = hide; 