$(function(){
	// 读取cookie
	var sNewUserName = getCookie("username");
		console.log(sNewUserName);
	if(sNewUserName!=="undefined"){
		$(".Register").hide();
		$(".login").text("尊敬的" + sNewUserName + "您好");
	}
	//读取 总价的cookie
	$.cookie.json = true;
	var iTotal = $.cookie("iTotal");
	var aGoods = $.cookie("aGoods");
	var iGoodsNum = $.cookie("iGoodsNum");
	console.log(aGoods);
	console.log(iTotal);
	console.log(iGoodsNum);
	$.each(aGoods,function(index,element){
		$(".pd").text(element.sex + "/" + element.quality + "/" + element.size);
		$(".one").text(element.sex + "/" + element.quality + "/" + element.size);
		$(".order-detail .goods-price").text(element.price);
		$(".order-detail .goods-number").text(iGoodsNum);
		$(".two").text(iGoodsNum);
		$(".store-title a").text(element.store);
		$(".goods-activties a").text(element.activties);
		$(".goods-info img").attr({src:element.smallimg});
		$(".order-detail .goods-total,.manney,.total-price,.should-pay").text(iTotal);
	});
	$(".more").on("click",function(){
		var iClickNum = parseInt($(".clicknum").text());
		$(".clicknum").text(iClickNum + 1);
		if(iClickNum % 2 === 1){
			$(".receipt-info").show();
		}
		else{
			$(".receipt-info").hide();
			$(".receipt-detail-in").hide();
		}
	});
	$(".receipt-info label").on("click",function(){
		$(".receipt-detail-in").show();
		$(".choose-bj").css({
			"background-position":"-47px 4px"
		});
	});
	$(".receipt-company").on("click",function(){
		$("#company").show();
		$(".choose-bj3").css({
			"background-position": "-167px 4px"
		});
		$(".choose-bj2").css({
			"background-position": "-118px 4px"
		});
	});
	$(".receipt-people").on("click",function(){
		$("#company").hide();
		$(".choose-bj2").css({
			"background-position": "-167px 4px"
		});
		$(".choose-bj3").css({
			"background-position": "-118px 4px"
		});
	});
	$(".receipt-info label").on("click",function(){
		var iClickNum = parseInt($(".clicknum").text());
		$(".clicknum").text(iClickNum + 1);
		if(iClickNum % 2 === 1){
			$(".choose-bj").css({
				"background-position": "2px 4px"
			});
		}
		else{
			$(".choose-bj").css({
				"background-position": "-47px 4px"
			});
		}
	});

	//获得地址信息
	$("#sure").on("click",function(){
		var iConsigner = $("#consigner").val();
		console.log(iConsigner);
		var iConsigner = $("#consigner").val();
		console.log(iConsigner);
		var iConsigner = $("#consigner").val();
		console.log(iConsigner);
		var iConsigner = $("#consigner").val();
		console.log(iConsigner);
		var iConsigner = $("#consigner").val();
		console.log(iConsigner);
		var iConsigner = $("#consigner").val();
		console.log(iConsigner);
		$(".order-goods").show();
		$("#pop").show();
	});
	$(".order-goods-sure").on("click",function(){
		alert("恭喜您订单成功,点击确定回到首页");
		window.location.href = "../index.html";
	});
})