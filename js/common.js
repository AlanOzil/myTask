// 编辑模块中，点击控件，可编辑
function editTask(){
	$("#newTask #title").click(function(){
		var title = $(this).html();
		$(this).html("");
		$(this).unbind('click');

		$(this).html('<input id="edit-title">');
		$("#newTask #edit-title").val(title);
		$("#newTask #edit-title").focus();

		$("#newTask #edit-title").blur(function(event) {
			var newTitle = $(this).val();
			$("#newTask #title").html(newTitle);
			editTask();
		});
	});
}

function editDate(){
	$("#newTask #deadline").click(function(){
		var date = $(this).html();
		$(this).html("");
		// $(this).unbind('click');

		$(this).html('<input type="text" id="datepicker">');
		// $("#newTask #datepicker").val(date);

		// 日历控件初始化
		$("#datepicker").datepicker();
		$("#datepicker").datepicker("option", $.datepicker.regional["zh-CN"]);
		$("#datepicker").datepicker("option","dateFormat","yy-mm-dd");
		$("#datepicker").focus();

		$("#newTask #datepicker").change(function(event) {
			date = $(this).val();
			$("#newTask #deadline").html(date);
		});

		var isBlur = true;
		$("#ui-datepicker-div").click(function(){
			isBlur = false;
		});
		$("#ui-datepicker-div").blur(function(){
			isBlur = true;
		});
		$("#newTask #datepicker").blur(function(){
			setTimeout(function(){
				var newDate = $("#newTask #datepicker").val();
				if(newDate == "" && isBlur == true){
					$("#newTask #deadline").html(date);
					isBlur = true;
				}
			},500);
		})
	});
}

function editStatus(){
	$("#newTask input[type=checkbox]").change(function(){
		var check = $(this).attr("checked");
		if(check == "checked")
			$("#newTask #status").html("已完成");
		else
			$("#newTask #status").html("未完成");
	})
}

// 点击任务模块触发编辑
function bindTask(id){
	$(".task-content").click(function(){
		$(".mask-module").css("display","block");
		$("#" + id).fadeIn();
	});
}

function initTask(id){
	// 点击任务模块触发编辑
	bindTask(id)
	// 关闭按钮
	$(".pop-module .btn-cancel").click(function(){
		$("#" + id).fadeOut();
		$(".mask-module").css("display","none");
	});
	$(".pop-module .icon-remove").click(function(){
		$("#" + id).fadeOut();
		$(".mask-module").css("display","none");
	});

	// 确认按钮
	$(".pop-module .btn-confirm").click(function(){
		$("#" + id).fadeOut();
		$(".mask-module").css("display","none");
		var title = $("#"+id+" #title").html();
		var desc = $("#"+id+" #desc").html();
		var comment = $("#"+id+" #comment").html();
	});
	// 阻止事件冒泡
	$(".pop-module input[type=checkbox]").click(function(e){
		e.stopPropagation();
	});
	// 编辑模块中，点击控件，可编辑
	editTask();
	editDate();
	editStatus();

}