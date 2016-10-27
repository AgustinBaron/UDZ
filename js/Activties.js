$(function(){
	// 读取cookie
	var sNewUserName = getCookie("username");
		console.log(sNewUserName);
	if(sNewUserName!=="undefined"){
		$(".Register").hide();
		$(".login").text("尊敬的" + sNewUserName + "您好");
	}
	//设置 products 的运动效果 内所有图片的动画效果 以及作者的字体透明变化
	$("#dls img").each(function(index,element){
		change(index,element);
	});
	function change(index,element){
		index = $(this).index();
		$(element).hover(function(){
			$(element).eq(index).stop(true).animate({
				left:"25",
				top:"5",
				height:"185"
			}).parent().siblings().stop(true).animate({opacity:"0.5"});
		},function(){
			$(element).eq(index).stop(true).animate({
				left:"34",
				top:"15",
				height:"170"
			}).parent().siblings().stop(true).animate({opacity:"1"});
		});
	}
	//.search-type li 下面的导航点击事件
	$(".search-type li").each(function(index,element){
		var index = $(this).index();
		$(element).on("click",function(){
			$(".search-type li").eq(index).children("a").addClass("active").end()
							.siblings().children("a").removeClass("active");
		});
	});	
	//导航第四个第五个的背景设置
	$(".search-price").on("click",function(){
		var 
			iClick = parseInt($("#click-number").text());
		$("#click-number").text(iClick + 1);
		if(iClick % 2 === 1){
			$("#search-price").css({
			"background-position":"-15px -90px"
			});
		}else{
			$("#search-price").css({
			"background-position":"0 -90px"
			});
		}
	});
	$(".search-post").on("click",function(){
		$("#search-post").css({
			"background-position":"-14px -112px"
		});
	});
	//翻页的点击事件
	$(".pages li:not(.list)").each(function(index,element){
		 var index = $(this).index();
		$(element).on("click",function(){
			$(".pages li").eq(index).children("a").addClass("active").end()
						.siblings().children("a").removeClass("active");
			$("#pages").text(index);
			console.log(index);
			// 左按钮点击
			$(".pages li:first").on("click",function(){
				var 
					iCur1 = parseInt($("#pages").text());
				if(iCur1 <= 1){
					iCur1 = 2;
				}
				$(".pages li").eq(iCur1-1).children("a").addClass("active").end().siblings().children("a").removeClass("active");
				$("#pages").text(iCur1-1);
			});
			// 右按钮点击
			$(".pages li:last").on("click",function(){
				var 
					iCur = parseInt($("#pages").text());
					console.log(iCur);
				if(iCur >= 9){
					iCur = 8;
				}
				$(".pages li").eq(iCur+1).children("a").addClass("active").end().siblings().children("a").removeClass("active");
				$("#pages").text(iCur+1);
			});
		});
	});	
	//点击翻页除了第一个让向上翻页显示出来
	$(".page:not(:first)").on("click",function(){
		$(".prev").show();
	});
	//点击翻页第一个让向上翻页隐藏
	$(".page:first").on("click",function(){
		$(".prev").hide();
	});
});