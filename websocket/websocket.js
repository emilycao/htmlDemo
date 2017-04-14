function $$(id) {
	return document.getElementById(id);
}
var strTip = '';
var objWs = null;
var conUrl = 'ws://localhost:3131/test/demo';
var SocketCreated = false;
var arrState = new Array('正在建立连接...','连接成功！','正在关闭连接...','连接已关闭！','正在初始化值...','连接出错！');
//自定义页面加载时函数 P263
function pageload () {
	if (SocketCreated && (objWs.readyState == 0 || objWs.readyState == 1)) {
		objWs.close();
	}else {
		Handle_list(arrState[4]);
		try {
			objWs = new WebSocket(conUrl);
			SocketCreated = true;
		}catch (ex) {
			Handle_list(ex);
			return;
		}
	}
	//添加Socket对象的打开事件
	objWs.onopen = function () {
		Handle_list(arrState[objWs.readyState]);
	}
	//添加Socket对象的接收服务器数据事件
	objWs.onmessage = function (event) {
		Handle_list('系统消息：' + event.data);
	}
	//添加socket对象的关闭事件
	objWs.onclose = function () {
		Handle_list(arrState[objWs.readyState]);
	}
	//添加socket对象的出错事件
	objWs.onerror = function () {
		Handle_list(arrState[5]);
	}
}
//自定义单击‘发送’按钮时调用的函数
function btnSend_click () {
	var strTxtMessage = $$('txtMessage').value;
	if (strTxtMessage.length > 0) {
		objWs.send(strTxtMessage);
		Handle_list('我说：'+ strTxtMessage);
		$$('txtMessage').value = '';
	}
}
//自定义显示与服务器交流内容的函数
function Handle_list (message) {
	strTip += message + '\n';
	$$('txtaList').innerHTML = strTip;
}