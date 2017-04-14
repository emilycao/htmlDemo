self.onmessage = function (event) {
	var strRetHTML = '<span><b>';
	strRetHTML += event.data + '</b>位随机数为：<b>';
	strRetHTML += RetRndNum(event.data);
	strRetHTML += '</b></span><br>';
	self.postMessage(strRetHTML);
}
function RetRndNum (n) {
	var strRnd = "";
	for (var intI = 0; intI < n; intI++) {
		strRnd += Math.floor(Math.random()*10);
	}
	return strRnd;
}