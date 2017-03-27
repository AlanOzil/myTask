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
			$("#myTask .task-content").unbind();
			bindTask("newTask");
		});
	});

	initTask("newTask");

	//页面切换
	$("#myTask .nav_tab ul li").click(function(){
		$("#myTask .nav_tab ul li").removeClass('active');
		$(this).addClass('active');
		var index = $(this).index();
		switch(index) {
			case 0:
				$("#report").css("display", "none");
				$("#task").css("display", "block");
                $("#calendar").css("display", "none");
				break;
			case 1:
				$("#report").css("display", "none");
				$("#task").css("display", "none");
                $("#calendar").css("display", "block");
                $("#calendar").children().remove();
                initCalendar();
				break;
			case 2:
				$("#report").css("display", "block");
				$("#task").css("display", "none");
                $("#calendar").css("display", "none");loadWeeklyTask();
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

function initCalendar(){
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end, allDay) {
            var title = prompt('Event Title:');
            if (title) {
                calendar.fullCalendar('renderEvent',
                    {
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay
                    },
                    true // make the event "stick"
                );
            }
            calendar.fullCalendar('unselect');
        },
        editable: true,
        events: [
            {
                title: 'All Day Event',
                start: new Date(y, m, 1)
            },
            {
                title: 'Long Event',
                start: new Date(y, m, d-5),
                end: new Date(y, m, d-2)
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d-3, 16, 0),
                allDay: false
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d+4, 16, 0),
                allDay: false
            },
            {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false
            },
            {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d+1, 19, 0),
                end: new Date(y, m, d+1, 22, 30),
                allDay: false
            },
            {
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/'
            }
        ]
    });

    $(".fc-header-right").children().remove();
}

function loadWeeklyTask(){
	top.startLoading();
	$.post("http://localhost:8016/Ashx/BingoTaskHandler.ashx?action=WeeklyTask-GetCurrentWeekInfo", 
		{},
		function(data){
			data = JSON.parse(data);
			if(data.Success){
				var param = {args:"{UserId:'admin',BelongYear:2017,WeekOfYear:"+data.Data.WeekOfYear+"}"}
				$.post("http://localhost:8016/Ashx/BingoTaskHandler.ashx?action=WeeklyTask-GetWeeklyTask", 
						param,  
						function(res){
							res = JSON.parse(res);
							top.endLoading();
							if(res.Success){
							}
						});
			}
		}
	);

	
}