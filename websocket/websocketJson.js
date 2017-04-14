function $$(id) {
	return document.getElementById(id);
}
var strList = '';
var strUser = '';
var objWs = null;
var conUrl = 'ws://localhost:3131/test/JSON';
var SocketCreated = false;
var arrState = new Array('正在建立连接...','连接成功！','正在关闭连接...','连接已关闭！','正在初始化值...','连接出错！');
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
		var objJSON = JSON.parse(event.data);
		for (var intI = 0; intI < objJSON.length; intI++) {
			Handle_User(objJSON[intI].UserName);
			Handle_User(objJSON[intI].Status);
		}
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
function btnSend_click () {
	var strTxtMessage = $$('txtMessage').value;
	var strTime = new Date();
	if (strTxtMessage.length > 0) {
		objWs.send(JSON.stringify({
			content : strTxtMessage,
			datetime : strTime.toLocaleTimeString()
		}));
		Handle_list(strTime.toLocaleTimeString());
		Handle_list('我说：' + strTxtMessage);
		$$('txtMessage').value = '';
	}
}
//自定义显示对话记录内容的函数
function Handle_list (message) {
	strList += message + '\n';
	$$('txtaList').innerHTML = strList;
}
//自定义显示在线人员内容的函数
function Handle_User (message) {
	strUser += message + '\n';
	$$('txtaUser').innerHTML = strUser;
}