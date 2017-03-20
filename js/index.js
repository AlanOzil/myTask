$(document).ready(function(){$(".vertical-nav").verticalnav({speed: 400,align: "left"});}); //左侧菜单

$(function(){
	$(".showhide").css("display","block"); //左侧菜单顶部
	height = $(window).height();
	$(".vertical-nav").css("height", height); //左侧菜单高度
	$("iframe").css("height", height); //iframe高度
	$(".business-panel").css("width", document.body.scrollWidth - 200); //右侧业务区域宽度

	$(".kePublic .content .vertical-nav li").click(function(){
		var index = $(this).index();
		switch(index) {
			case 1:
				$("iframe").src = "views/myTask.html";
				break;
			case 2:
				$("iframe").src = "views/myTask.html";
				break;
			case 3:
				$("iframe").src = "views/myTask.html";
				break;
			default: break;
		}
	})
});