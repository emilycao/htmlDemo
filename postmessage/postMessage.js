function $$(id) {
	return document.getElementById(id);
}
var strOrigin = 'http://localhost';
function pageload () {
	window.addEventListener('message',
		function (event) {
			if (event.origin == strOrigin) {
				$$('pStatus').style.display = 'block';
				$$('pStatus').innerHTML += event.data;
			}
		},false);
}
//单击“请求”按钮时调用的函数
function btnSend_click () {
	//获取发送内容
	var strTxtValue = $$('txtNum').value;
	if (strTxtValue.legend > 0) {
		var targetOrigin = strOrigin;
		$$('ifrA').contentWindow.postMessage(strTxtValue,strOrigin);
		$$('txtNum').value = '';
	}
}
//iframe中子页面加载时调用的函数
function PageLoadForMessage () {
	window.addEventListener('message',
		function (event) {
			if (event.origin == strOrigin) {
				var strRetHTML = '<span><b>';
				strRetHTML += event.data + '</b>位随机数为：<b>';
				strRetHTML += RetRndNum(event.data);
				strRetHTML += '</b></span><br>';
				event.source.postMessage(strRetHTML,event.origin);
			}
		},false)
}
function RetRndNum (n) {
	var strRnd = "";
	for (var intI = 0; intI < n; intI++) {
		strRnd += Math.floor(Math.random()*10);
	}
	return strRnd;
}