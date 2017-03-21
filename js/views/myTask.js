$(function(){
	height = $(window).height();
	$("#myTask .module-content").css("height", height - 80);
	$('select').selectOrDie({
		onChange: function(){
			//alert('你选择了：' + $(this).val());
		}
	});

	//新建任务
	$("#myTask .new-task").click(function(){
		var id = $(this).parent().parent().attr("id");
		$(this).css("display","none");
		var html = newTaskTemplate();
		$(this).parent().append(html);
		$("#myTask .btn-cancel").click(function(){
			var $this = $(this).parent().parent();
			$this.parent().find(".new-task").css("display","block");
			$this.remove();
		});
		$("#myTask .btn-confirm").click(function(){
			var $this = $(this).parent().parent();
			var html = newTaskItemTemplate($this.find("input.task-title").val(), $this.find("textarea.task-content").val());
			$this.parent().parent().find(".container-content p").remove();
			$this.parent().parent().find(".container-content").append(html);
			$this.parent().find(".new-task").css("display","block");
			$this.remove();
		});
	});

	// 点击任务模块出发编辑
	$("#myTask .task-content").click(function(){
		$(".mask-module").css("display","block");
		$("#newTask").fadeIn();

		// 关闭按钮
		$("#newTask .btn-cancel").click(function(){
			$("#newTask").fadeOut();
			$(".mask-module").css("display","none");
		});
		$("#newTask .icon-remove").click(function(){
			$("#newTask").fadeOut();
			$(".mask-module").css("display","none");
		});

		// 确认按钮
		$("#newTask .btn-confirm").click(function(){
			$("#newTask").fadeOut();
			$(".mask-module").css("display","none");
			var title = $("#newTask #title").html();
			var desc = $("#newTask #desc").html();
			var comment = $("#newTask #comment").html();
		});
	});
	// 阻止事件冒泡
	$("#myTask input[type=checkbox]").click(function(e){
		e.stopPropagation();
	});

	// 编辑模块中，点击控件，可编辑
	editTask();
	editDate();
	editStatus();


	//页面切换
	$("#myTask .nav_tab ul li").click(function(){
		$("#myTask .nav_tab ul li").removeClass('active');
		$(this).addClass('active');
		var index = $(this).index();
		switch(index) {
			case 0:
				$("#report").css("display", "none");
				$("#task").css("display", "block");
				break;
			case 1:
				$("#report").css("display", "none");
				$("#task").css("display", "none");
				break;
			case 2:
				$("#report").css("display", "block");
				$("#task").css("display", "none");
				break;
			default: break;
		}
	});
});

function newTaskTemplate(){
	var html = "";			
	html += "<div class='entry-content'>";
	html += "<input class='task-title' placeholder='请输入任务标题''>";
	html += "<textarea class='task-content' placeholder='请输入任务内容''></textarea>";
	html += "<div class='btn-panel'>";
	html += "<input type='button' class='btn-confirm' value='确认''>";
	html += "<input type='button' class='btn-cancel' value='取消''>";
	html += "</div>";
	html += "</div>";
	return html;
}

function newTaskItemTemplate(title, content){
	var html = '';
	html += '<div class="task-content">';
	html += '<div class="content-header">';
	html += '<input type="checkbox"/> ' + title;
	html += '</div>';
	html += '<div class="content-content">';
	html += '<div class="title">';
	html += '<i class="icon-desktop"></i><span> ' + content + '</span>';
	html += '</div>';
	html += '<div class="status-todo">未完成</div>';
	html += '</div>';
	html += '<div class="clear"></div>';
	html += '</div>';
	return html;
}