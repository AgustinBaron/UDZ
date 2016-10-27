$(function(){
	// 读取cookie
	var sNewUserName = getCookie("username");
		console.log(sNewUserName);
	if(sNewUserName!=="undefined"){
		$(".Register").hide();
		$(".login").text("尊敬的" + sNewUserName + "您好");
	}
	//进度条的显示	
	$(".border-x1").each(function(index,element){
		var iNum1 = $(".goal span").text(),
			iNum2 = $(".sell-number span").text(),
			iOldWidth = $(".border-x").width();
		iCur = iNum2 / iNum1;
		if(iCur > 1){
			iCur = 1;
		}
		$(element).animate({
			width:iCur * iOldWidth
		},3000);
	});	
	//设置屏幕到达一定高度时 让返回top的功能实现
	var iWinHeight = $(window).height();  //获取窗口的高度
	$(window).on("scroll",function(){
		var iScrollTop = $(this).scrollTop();  //获取滚动的高度
		if(iScrollTop > iWinHeight){
			$("#back-to-2").stop(true).fadeIn(300);
		}else{
			$("#back-to-2").stop(true).fadeOut(300);
		}
	});
	//点击回到顶部
	$("#back-to-2 em").click(function(){
		$("html,body").stop(true).animate({scrollTop : 0}, 500);
	});

	//商品详情右边性别和材质的点击事件
	//$(".user-choose p").each(function(index,element){
		/*var index = $(this).index();		
		$(element).hover(function(){	
			$(element).animate({
				opacity:"0.8",
			}).css({border:"1px solid #fc5454",color:"#fc5454"});
		},function(){
			$(element).animate({
				opacity:"1"
			}).css({border:"1px solid #ccc",color:"#000"});   //用c3 写成的  
		});*/
		/*$(element).on("click",function(ev){
			var iCur = parseInt($("#click-number").text());
			$("#click-number").text(iCur + 1);
			$(element).css({
				border:"2px solid #fc5454",
				color:"#fc5454"
			}).addClass("disable");
		});*/
	//});
	$(".sex p").on("click",function(){
		var iCur = parseInt($("#click-number-1").text());
		$("#click-number-1").text(iCur + 1);
		if(iCur % 2 === 1){
			$(this).css({
				border:"2px solid #fc5454",
				color:"#fc5454"
			}).addClass("disable");
		}
		else{
			$(this).css({
				border:"2px solid #F2F2F2",
				color:"#000"
			}).removeClass("disable");
		}		
	});

	$(".quality p").on("click",function(){
		var iCur = parseInt($("#click-number-2").text());
		$("#click-number-2").text(iCur + 1);
		if(iCur % 2 === 1){
			$(this).css({
				border:"2px solid #fc5454",
				color:"#fc5454"
			}).addClass("disable");
		}
		else{
			$(this).css({
				border:"2px solid #F2F2F2",
				color:"#000"
			}).removeClass("disable");
		}
	});
	//尺寸的点击事件
	$(".size li").each(function(index,element){
		var index = $(this).index();
		$(element).on("click",function(){
			$(".size li").eq(index).css({
				border:"2px solid #fc5454",
				color:"#fc5454"
			}).addClass("disable").siblings().css({
				border:"2px solid #F2F2F2",
				color:"#000"
			}).removeClass("disable");
		});
	});
	//商品数量点击增加
	$(".add-number").on("click",function(){
		var iNum1 = parseInt($(this).prev().text()); //获取数量值 prev是获得前一个同辈元素
		$(".default-number").text(iNum1+1);		
	});
	//商品数量点击减少
	$(".minus-number").on("click",function(){
		var iNum1 = parseInt($(this).next().text()); //获取数量值 next是获得后一个同辈元素
		if(iNum1 <=1){
			iNum1 = 2;
		}
		$(".default-number").text(iNum1-1);		
	});
	// 商品放大镜
	//鼠标移入 .middle-img 盒子范围 显示.pop的遮罩 和.big-img的大图  移出则隐藏
	$(".middle-img").hover(function(){
		$(".big-img,.pop").show();
	},function(){
		$(".big-img,.pop").hide();
	}).on("mousemove",function(ev){
		var iPopWidth    = $(".pop").width(),
			iPopHeight   = $(".pop").height(),
			iMidleWidth  = $(".middle-img").width(),
			iMidleHeight = $(".middle-img").height(),
			iBigWidth    = $(".big-img").width(),
			iBigHeight   = $(".big-img").height(),
			iRateX       = iBigWidth / iPopWidth,
			iRateY       = iBigHeight / iPopHeight;
		//设置 pop遮罩在文档中的绝对位置 将鼠标指针放在遮罩剧中的位置
		$(".pop").offset({
			top:ev.pageY- iPopWidth /2,
			left:ev.pageX - iPopHeight/2
		});
		//获取 pop 相对有定位的父元素 middle 的相对定位位置
		var oPosition = $(".pop").position(),
			iTop = oPosition.top,
			iLeft = oPosition.left;
		// 判断 iTop 与 iLeft 的取值，既是给遮罩层限定在 middle-img内
		if(iTop < 0){
			iTop = 0;
		}else if(iTop > iMidleHeight - iPopHeight){
			iTop = iMidleHeight - iPopHeight;
		}
		if(iLeft < 0){
			iLeft = 0;
		}else if(iLeft > iMidleWidth - iPopWidth){
			iLeft = iMidleWidth - iPopWidth
		}
		// 重新设置 .pop的相对定位位置
		$(".pop").css({
			top:iTop,
			left:iLeft
		});
		//设置放置 .big 框中图片定位位置
		$(".big-img img").css({
			top:-iRateY * iTop,
			left:-iRateX * iLeft
		});		
	});
	//点击小图片更换中等图片和大图片
	$(".small-img li").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
		var _src = $(this).children("img").attr("src");
		console.log(_src);
		$(".middle-img img").attr("src",_src.replace("360","720"));
		$(".big-img img").attr("src",_src.replace("360","1020"));
	});
	//微信二维码的显示与隐藏
	$(".share-3").hover(function(){
		$(".wechat img").show();
	},function(){
		$(".wechat img").hide();
	});
	// 加入购物车
	
	$(".add-cart,.buy").on("click",function(){  //循环找到被点击的哪一个尺寸

		$(".size li").each(function(index,element){
			var index = $(this).index();
			if($(".size li").eq(index).attr("class") === "disable"){ //为 true 的哪一个index
				var booler1 = $(".sex p").attr("class") === "disable", //定义性别被选择为 true
					booler2 = $(".quality p").attr("class") === "disable",//定义材质被选择为 true
					booler3 = $(".size li").eq(index).attr("class") === "disable",//定义尺寸被选择为 true
					//设置遮罩层的高
					iwinHeight = $(".footer").height() + $(".content").height() + $(".header").height(),
					//设置遮罩层的宽
					iwinWidth = $(window).width();			
				$(".pop-all").height(iwinHeight); //将遮罩层的宽高显示到页面上
				$(".pop-all").width(iwinWidth);
				if(booler1&&booler2&&booler3){ //同时选择了性别 材质 尺寸则加入购物车成功 且显示遮罩层
					$(".pop-all").show();
					$(".add-cart-successful").show();
					//加入购物车成功后让其保存到Cookie中
					var oGoods = {
						activties : $(".title").text(),
						store     : $(".shop-name").text(),
						smallimg  : $(".middle-img img").attr("src"),
						price     : $(".price-number i").text(),
						number    : $(".default-number").text(),
						size      : $(".size .disable").text(),
						quality   : $(".quality p").text(),
						sex       : $(".sex p").text()
					};
					//将创建的商品数量保存到数组中去，再保存会cookie
					$.cookie.json = true;
					//创建一个空数组来保存商品信息
					var aGoods = [];
					// 将商品信息添加到数组中去
					aGoods.push(oGoods);
					console.log(aGoods);
					//将数组保存回 cookie
					$.cookie("aGoods",aGoods,{expires:7,path:"/"});	
				}else{
					$("#choose-type").show(); //未选择成功则提示用户 1s
					$(".pop-all").hide();
					setTimeout(function(){
						$("#choose-type").hide();
					}, 1000);
				}
			}
		});
		
		$(".close,.add-cart-2").on("click",function(){ //事件委托将继续购物  或者关闭弹出的提示框
			$(".pop-all").hide();
			$(".add-cart-successful").hide();
		});
	});
	//点击弹出的对话提示框中的 立即购买 跳转到 购物车中
	$(".buy-2").on("click",function(){
		window.location.href = "../html/Cart.html";
	});
	//倒计时的实现
	// 设置定时器
	setInterval(function(){
		showTime();
	},1000);
	//封装时间函数
	function showTime(){
		var 
			iTimeStart = new Date().getTime(), //设定当前时间
			iTimeEnd   = new Date("2017/01/01 00:00:00").getTime(), //设定目标时间
			iTimeDiff  = iTimeEnd - iTimeStart;  //设定相差多少秒
		var iDay = Math.floor(iTimeDiff/86400000);
			iTimeDiff -= iDay * 86400000;     //天
		var iHour = Math.floor(iTimeDiff/3600000);
			iTimeDiff -= iHour * 3600000;     //小时
		var iMinute = Math.floor(iTimeDiff/60000);
			iTimeDiff -= iMinute * 60000;     //分
		var iSecond = Math.floor(iTimeDiff/1000);
		//当为单数时候前面加0
		iDay = iDay < 10 ? "0" + iDay : iDay;
		iHour = iHour < 10 ? "0" + iHour : iHour;
		iMinute = iMinute < 10 ? "0" + iMinute : iMinute;
		iSecond = iSecond < 10 ? "0" + iSecond : iSecond;
		// 显示到网页上
		$("#days").text(iDay);
		$("#hours").text(iHour);
		$("#minutes").text(iMinute);
		$("#seconds").text(iSecond);
	}
	// 点击加入购物车将物品加入到购物车

});