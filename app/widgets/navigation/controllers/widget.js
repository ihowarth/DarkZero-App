var animateOn = true;

var pageStack = [];
var leftButtonStack = {};
var rightButtonStack = {};

exports.toggleAnimation = function(){
    animationOn != animationOn;
};

exports.newLevel = function(content, left, right){
    $.pageTitle = content.title || null;
    content.controller && $.content.add(Alloy.createController(content.controller).getView());
    
    $.leftNavButton.image = left.image || null;
    $.leftNavButton.title = left.title || null;
    
    $.rightNavButton.image = right.image || null;
    $.rightNavButton.title = right.title || null;
    
    pageStack.push();
    //leftButtonStack. = ;
    //rightButtonStack. = ;
};

$.leftNavButton.addEventListener('click', function(){

});

$.rightNavButton.addEventListener('click', function(){

});


function animateIn(direction){
    
};

function animateOut(direction){
    
};
