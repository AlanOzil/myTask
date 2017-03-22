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
