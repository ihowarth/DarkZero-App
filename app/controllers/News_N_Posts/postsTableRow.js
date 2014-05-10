var args = arguments[0] || {};

var type = $model.get("type"); 

if ( type === "Review" ) {
	$.typeLabel.text = $model.get("platform") + ' ' + type;
} else {
	$.typeLabel.text = type;
}
