function $$(id) {
	return document.getElementById(id);
}
var objWorker = new Worker('work_1.js');
//自定义页面加载时调用的函数
function pageload () {
	objWorker.addEventLister('message',
		function (event) {
			$$('pStatus').style.display = 'block';
			$$('pStatus').innerHTML += event.data;
		},false);
}