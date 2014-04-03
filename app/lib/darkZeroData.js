exports.sendGetRequest = function(){
	var xhr = Ti.Network.createHTTPClient();

    xhr.onload = function(e) {
        var data = JSON.parse(this.responseData);
        for (var i = 0; i < 20; i++) {
            console.log(JSON.stringify(data[i]));
        }
    };
    xhr.onerror = function(e) {
        alert("Error retireving data because \n" + JSON.stringify(e.error));
    };
    
    xhr.open('GET','http://darkzero.co.uk/?feed=json');
    xhr.send();
};

