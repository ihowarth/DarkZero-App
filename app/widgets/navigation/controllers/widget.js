var animateOn = true;

var pageStack = [];
var viewStack = [];
var leftButtonStack = {};
var rightButtonStack = {};

exports.toggleAnimation = function(){
    animationOn != animationOn;
};

exports.editNavView = function(navBar){
    $.navBar.height = navBar.height; 
    $.navBar.backgroundColor = navBar.backgroundColor;
    $.shadow.visible = navBar.shadow; 
};

exports.addNewView = function(content, left, right){   
    //If there is a controller to open, do so and add it to the view
    if(content.controller){
        var view = Alloy.createController(content.controller).getView(); 
        $.content.add(view);
        viewStack.push(view);
    }
    
    //Style nav bar with buttons and a title
    setNavBar(content, left, right);
    
    //Add the JSON objects to stacks, to be used later on return to the page
    pageStack.push(content);
    leftButtonStack[content.title] = left;
    rightButtonStack[content.title] = right;
};

$.leftNavButton.addEventListener('click', function(){
    //Save confusion by using some quick vars
    var content = pageStack[pageStack.length -1];
    var prevContent = pageStack[pageStack.length -2];
    
    if(leftButtonStack[content.title].callbackType == 'open'){
        //Add the new view on top and add it to the viewStack for removal later
        var view = Alloy.createController(leftButtonStack[content.title].callback).getView();
        $.content.add(view);
        viewStack.push(view);
    }
    else if(leftButtonStack[content.title].callbackType == 'close'){
        //Remove view from navigation
        $.content.remove(viewStack[viewStack.length - 1]);
        
        //Style buttons back to previous page
        setNavBar(prevContent, leftButtonStack[prevContent.title], rightButtonStack[prevContent.title]);
        
        //Remove the elements that are closed
        pageStack.pop();
        viewStack.pop();
        delete leftButtonStack[content.title];
        delete rightButtonStack[content.title];
    }
    else{
        leftButtonStack[content].callback();
    }
});

$.rightNavButton.addEventListener('click', function(){
    //Save confusion by using some quick vars
    var content = pageStack[pageStack.length -1];
    var prevContent = pageStack[pageStack.length -2];
    
    if(rightButtonStack[content.title].callbackType == 'open'){
        //Add the new view on top and add it to the viewStack for removal later
        var view = Alloy.createController(rightButtonStack[content.title].callback).getView();
        $.content.add(view);
        viewStack.push(view);
    }
    else if(rightButtonStack[content.title].callbackType == 'close'){
        //Remove view from navigation
        $.content.remove(viewStack[viewStack.length - 1]);
        
        //Style buttons back to previous page
        setNavBar(prevContent, leftButtonStack[prevContent.title], rightButtonStack[prevContent.title]);
        
        //Remove the elements that are closed
        pageStack.pop();
        viewStack.pop();
        delete leftButtonStack[content.title];
        delete rightButtonStack[content.title];
    }
    else{
        rightButtonStack[content].callback();
    }
});

function setNavBar(content, left, right){
    $.pageTitle.text = content.title;
    
    //If there are images for the buttons set them, otherwise hide them, so they can't be clicked or seen
    $.leftNavButton.image = left.image || null;
    if(!left.image)
    $.leftNavButton.visible = false;
    else
    $.leftNavButton.visible = true;
    
    $.rightNavButton.image = right.image || null;
    if(!right.image)
    $.rightNavButton.visible = false;
    else
    $.rightNavButton.visible = true;
};

function animateIn(direction, view){
    
};

function animateOut(direction, view){
    
};
