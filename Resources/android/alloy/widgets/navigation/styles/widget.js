function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "navigation/" + s : s.substring(0, index) + "/navigation/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0002,
    key: "container",
    style: {
        layout: "vertical"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "navBar",
    style: {
        height: 60,
        backgroundColor: "#f0f0f0"
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "pageTitle",
    style: {
        bottom: 10,
        color: "#000000"
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "leftNavButton",
    style: {
        left: 10,
        bottom: 10,
        height: 20,
        width: 20
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "rightNavButton",
    style: {
        right: 10,
        bottom: 10,
        height: 20,
        width: 20
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "shadow",
    style: {
        bottom: 0,
        height: 1,
        backgroundColor: "#909090"
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "content",
    style: {}
} ];