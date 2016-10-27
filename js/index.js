$(function(){
	// 读取cookie
	var sNewUserName = getCookie("username");
	if(sNewUserName!=="undefined"){
		$(".Register").hide();
		$(".login").text("尊敬的" + sNewUserName + "您好");
	}
	if(sNewUserName =="undefined"){
		$(".header-nav a").on("click",function(){
			window.location.href = "../html/login.html";
			window.location.href = "../html/login.html";
		});
	}
	//header-nav绑定鼠标移入移出渐变效果
	$(".header-nav a").each(function(index, element){
		var index = $(this).index();
		$(element).hover(function(){
			$(element).eq(index).animate({opacity:"0.5"});
		},function(){
			$(element).eq(index).animate({opacity:"1"});
		});
	});
	//给客户服务绑定事件 让其显示与隐藏
	$(".header-nav .serve").hover(function(){
		$(".customer-serve").show();
	},function(){
		iTime = setTimeout(function(){  //让鼠标滑出延时隐藏
			$(".customer-serve").hide();	
		},500);
	});
	//给隐藏部分绑定事件让鼠标滑过出现相应效果
	$(".customer-serve").hover(function(){
		clearTimeout(iTime);   //清除定时器
		$(".customer-serve").show();
	},function(){
		$(".customer-serve").hide();
	});
	//给卖家中心绑定事件 让其显示与隐藏
	$(".header-nav .seller").hover(function(){
		$(".Seller-central").show();
	},function(){
		iTime = setTimeout(function(){  //让鼠标滑出延时隐藏
			$(".Seller-central").hide();	
		},500);
	});
	//给隐藏部分绑定事件让鼠标滑过出现相应效果
	$(".Seller-central").hover(function(){
		clearTimeout(iTime);   //清除定时器
		$(".Seller-central").show();
	},function(){
		$(".Seller-central").hide();
	});
	//让输入框失去焦点(未实现，用CSS3 outline：none；实现)
	$("#search-txt,#search-btn").blur();
	//content-navcon 导航区域点击事件 更换点击背景颜色	
	$(".content-navcon li").each(function(index,element){
		var index = $(this).index();
		$(element).on("click",function(){
			$(".content-navcon li").eq(index).children("a").addClass("active").end()
									.siblings().children("a").removeClass("active");
		});
	});
	//搜店铺和搜宝贝的切换
	$(".search-choose").hover(function(){
		$(".search-con").show();
	},function(){
		iTime = setTimeout(function(){  //让鼠标滑出延时隐藏
			$(".search-con").hide();	
		},500);
	});
	$(".search-con").hover(function(){
		clearInterval(iTime);
		$(".search-con").show();
	},function(){
		$(".search-con").hide();	
	});


	//点击改变搜索的内容
	$(".search-con li").on("click",function(){
		$(".search-choose a").text($(this).text());
	});
	//banner 轮播图
	var $lis = $("#uls div"),//获取所有的banner 图片
		len  = $lis.length,  //获取一共有几张banner
		imgWidth = $lis.eq(0).width(), //每张banner的长度
		index = 0,   //当前显示的索引
		nextIndex = 1;  //下一张显示的索引
	//让鼠标移入banner时显示相关区域
	$(".banner").hover(function(){
		$("#page").show();
		clearTimeout(iTime);
	},function(){
		$("#page").hide();
		autoMove();
	});
	//给page 创建小圆点
	var html = "";
	for(var i = 0; i< len; i++){
		html += "<div></div>";
	}
	//将小圆点添加到页面 并帮定点击事件
	$(html).appendTo("#page").on("click",function(){
		index = $(this).index();
		autoMove();
	}).eq(0).addClass("active");
	console.log($lis.length);
	//自动轮播
	iTime = setInterval(function(){		
		autoMove();
	},3000);

	function autoMove(){
		$("#uls div").eq(index).fadeOut(500).animate({opacity:"0"});  //当前显示的淡出
			//切换小圆点的样式
			$("#page>div").eq(index).addClass("active").siblings().removeClass("active");
			$("#uls div").eq(nextIndex).fadeIn(500).animate({opacity:"1"});  //当前显示的淡入
			index = nextIndex;
			nextIndex++;
			if(nextIndex >= len){
				nextIndex = 0;
			}	
	}
	


	//设置 movie 的运动效果
	$(".movie").hover(function(){
		$(".movie img").stop(true).animate({
			// opacity:"0.3"
			left:"-10",
			top:"-10",
			height:"266"
		});
	},function(){
		$(".movie img").stop(true).animate({
			// opacity:"0.3"
			left:"0",
			top:"0",
			height:"252"
		});
	});
	//设置 products 的运动效果 内所有图片的动画效果 以及作者的字体透明变化
	$("#dls img").each(function(index,element){
		change(index,element);
	});
	//设置以及作者的字体透明变化
	$(".products-seller").each(function(index,element){
		$(element).hover(function(){
			$(element).children("span").stop(true).animate({opacity:"0.5"});
		},function(){
			$(element).children("span").stop(true).animate({opacity:"1"});
		});
	});

	//计算 border-x1 的长度，既是已经卖出的是否达到目标要求
	var iOldWidth = $(".border-x").width(),  //获取 border-x 的宽度
		iGoal = $(".goal").text(),  //获取 目标值 是一个字符串
		iSold = $(".sold").text();  //获取 售出值 是一个字符串
	var aSold = iSold.split("已售:");
		aSold = aSold.slice(1);   //将售出值转换为数组，并且得到删除第一个后的所有值
	var aGoal = iGoal.split("目标:");
		aGoal = aGoal.slice(1);   //将目标值转换为数组，并且得到删除第一个后的所有值
	$(".border-x1").each(function(index,element){
		var inum = aSold[index] / aGoal[index];
		if(inum > 1){
			inum = 1;
		}
		$(element).animate({
			width:inum * iOldWidth
		},3000);		
	});
	// 几个边框颜色的改变
	$(".activties").each(function(index,element){
		$(element).hover(function(){
			$(element).find(".border-1").css({
				"border":"2px solid #e54d42",
				"border-left":"none"
			}).end().find(".activities-right2").css({
				"border":"2px solid #ffc300",
				"border-left":"none"
			}).end().find(".activities-right3").css({
				"border":"2px solid #38cb73",
				"border-left":"none"
			}).end().find(".activities-right4").css({
				"border":"2px solid #3a99d9",
				"border-left":"none"
			});
		},function(){
			$(element).find(".activities-right1").css({
				"border":"2px solid #f4f4f4",
				"border-left":"none"
			});
		});
	});
	//设置屏幕到达一定高度时 让返回top的功能实现
	var iWinHeight = $(window).height();  //获取窗口的高度
	$(window).on("scroll",function(){
		var iScrollTop = $(this).scrollTop();  //获取滚动的高度
		if(iScrollTop > iWinHeight){
			$("#back-top").stop(true).fadeIn(300);
		}else{
			$("#back-top").stop(true).fadeOut(300);
		}
	});
	//点击回到顶部
	$("#back-top").click(function(){
		$("html,body").stop(true).animate({scrollTop : 0}, 1000);
	});
	//底部的展开与收起
	//设置初始状态
	$(".company").css({
		left:"93%",
		width:"80",
		height:"20"
	}).find(".company-in").css({
		width:"72"
	});
	// 展开
	$(".open").on("click",function(){
		$(".company").width("100%");
		$(".company-in").width("1000").children().show();
		$(".company").stop(true).animate({
			left:"0",
			height:"70"
		}).children().show().end().find(".open,#baiducredit").hide();
	});
	//收起
	$(".pack-up").on("click",function(){
		$(".company").stop(true).animate({
			left:"92%",
			width:"80",
			height:"20"
		}).end().find(".company-in,#baiducredit").show().css({width:"72"}).end().find(".open").show().end().find(".company-name,.total-time,.real-name,.company-search,.pack-up,.baiducredit").hide();
	});
	
	// 封装函数鼠标移入移出让 dl 下的图片 和 dd 中的文字改变
	function change(index,element){
		index = $(this).index();
		$(element).hover(function(){
			$(element).eq(index).stop(true).animate({
				left:"36",
				top:"-8",
				height:"164"
			}).parent().siblings().stop(true).animate({opacity:"0.5"});
		},function(){
			$(element).eq(index).stop(true).animate({
				left:"44",
				top:"0",
				height:"150"
			}).parent().siblings().stop(true).animate({opacity:"1"});
		});
	}
});