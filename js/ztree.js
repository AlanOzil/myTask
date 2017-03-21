var setting = {
	check: {
		enable: true
	},
	data: {
		simpleData: {
			enable: true
		}
	}
};

var zNodes =[
	{ id:1, pId:0, name:"展开、折叠 自定义图标不同", open:true, iconOpen:"/css/zTreeStyle/img/diy/1_open.png", iconClose:"/css/zTreeStyle/img/diy/1_close.png"},
	{ id:11, pId:1, name:"叶子节点1", icon:"/css/zTreeStyle/img/diy/2.png"},
	{ id:12, pId:1, name:"叶子节点2", icon:"/css/zTreeStyle/img/diy/3.png"},
	{ id:13, pId:1, name:"叶子节点3", icon:"/css/zTreeStyle/img/diy/5.png"},
	{ id:2, pId:0, name:"展开、折叠 自定义图标相同", open:true, icon:"/css/zTreeStyle/img/diy/4.png"},
	{ id:21, pId:2, name:"叶子节点1", icon:"/css/zTreeStyle/img/diy/6.png"},
	{ id:22, pId:2, name:"叶子节点2", icon:"/css/zTreeStyle/img/diy/7.png"},
	{ id:23, pId:2, name:"叶子节点3", icon:"/css/zTreeStyle/img/diy/8.png"},
	{ id:3, pId:0, name:"不使用自定义图标", open:true },
	{ id:31, pId:3, name:"叶子节点1"},
	{ id:32, pId:3, name:"叶子节点2"},
	{ id:33, pId:3, name:"叶子节点3"}
];

function setCheck() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
	type = { "Y" : "ps", "N" : "ps" };
	zTree.setting.check.chkboxType = type;
}

$(document).ready(function(){
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
	setCheck();
	$("#py").bind("change", setCheck);
	$("#sy").bind("change", setCheck);
	$("#pn").bind("change", setCheck);
	$("#sn").bind("change", setCheck);
});