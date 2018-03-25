
p5.prototype.registerPreloadMethod('loadBytes');

p5.prototype.loadBytes = function(file, callback) {
  var self = this;
  var data = {};
  var oReq = new XMLHttpRequest();
  oReq.open("GET", file, true);
  oReq.responseType = "arraybuffer";
  oReq.onload = function(oEvent) {
    var arrayBuffer = oReq.response;
    if (arrayBuffer) {
      data.bytes = new Uint8Array(arrayBuffer);
      if (callback) {
        callback(data);
      }
      self._decrementPreload();
    }
  }
  oReq.send(null);
  return data;
}



// function loadImge()
// {
// 	var oReq = new XMLHttpRequest();
// 	oReq.open("GET", "cats1000.bin", true);
// 	oReq.responseType = "arraybuffer";

// 	oReq.onload = function (oEvent) 
// 	{
// 	  var arrayBuffer = oReq.response; // Note: not oReq.responseText
// 	  if (arrayBuffer) 
// 	  {
// 	    var byteArray = new Uint8Array(arrayBuffer);
// 	    // for (var i = 0; i < byteArray.byteLength; i++) 
// 	    // {
// 	    //   // do something with each byte in the array
//     	// }
//   		}	
// 	};

// 	oReq.send(null);
// 	return byteArray;
// }
