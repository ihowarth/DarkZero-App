var args = arguments[0] || {};

var navBar = Alloy.createController("/navView", {
    title : "Secret Page",
    leftButton : {
        // No left button
    },
    rightButton : {
        text : "Back"
    }
}); 

(function init() {
    $.navView.add(navBar.getView());
    
    addEventListeners();
})();

function addEventListeners() {
    $.navView.addEventListener("click", function(e){
        if(e.source.id.slice(0, 4) == "righ") {
            $.container.close({right : 400});
        } else {
            // Do nothing when not clicking a button
        }
    });
    
    $.container.addEventListener("swipe", function(e) {
        if (e.direction == "left") {
            $.container.close({right : 400});
        } else {
            // Do nothing when swiping right
        }
    });
    
    $.container.addEventListener("close", function(){
        $.destroy();
    });   
};