$(function(){
	height = $(window).height();
	$("#statistics .module-content").css("height", height - 80);
	loadEcharts("main1");
	loadEcharts("main2");
	loadEcharts("main3");
	//页面切换
	$("#statistics .nav_tab ul li").click(function(){
		$("#statistics .nav_tab ul li").removeClass('active');
		$(this).addClass('active');
		var index = $(this).index();
		switch(index) {
			case 0:
				$("#personal").css("display", "none");
				$("#department").css("display", "block");
				break;
			case 1:
				$("#department").css("display", "none");
				$("#personal").css("display", "block");
				break;
			default: break;
		}
	});
})

function loadEcharts(id){
		var myChart = echarts.init(document.getElementById(id));

        // 指定图表的配置项和数据
        var option = {
            backgroundColor: '#2c343c',

            title: {
                text: 'Customized Pie',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 80,
                max: 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:274, name:'联盟广告'},
                        {value:235, name:'视频广告'},
                        {value:400, name:'搜索引擎'}
                    ].sort(function (a, b) { return a.value - b.value}),
                    roseType: 'angle',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
}