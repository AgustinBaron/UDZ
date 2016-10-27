$(function(){
	// 读取cookie
	var sNewUserName = getCookie("username");
		console.log(sNewUserName);
	if(sNewUserName!=="undefined"){
		$(".Register").hide();
		$(".login").text("尊敬的" + sNewUserName + "您好");
	}
	//读取商品信息 Cookie 
	$.cookie.json = true;
	var aGoods = $.cookie("aGoods");
	console.log(aGoods);
	if(aGoods.length !== 0){
		//数组的长度不为0 z则让购物车为空隐藏
		$(".no-goods").hide();
		//循环数组  并将数组中的 数据显示到页面上
		$.each(aGoods,function(index,element){
			//创建容器 存放店铺数据
			$('<div class="store"><label class="check-all" for=""><input type="checkbox" class="checkbox" /></label><div class="store-in"> 店铺 : '+ element.store + '</div></div>').insertBefore(".cart-coprate");
			
			$("#shop-detail:first").clone().insertBefore(".cart-coprate").data("data",element)
					//商品勾选数据的创建
					.children(".choose-all").html('<label class="check-all" for=""><input type="checkbox" class="checkbox goods-number" /></label>').end()
					//s商品活动 以及星号  详情显示到页面
					.children(".goods-info").html('<div class="goods-activties">【下单即生产20天发货】将心注入 满满的爱18K戒指R9918KR0127</div><a href="javascript:;"><img class="goodsimg" src="'+ element.smallimg +'" alt="" /></a><p class="pd"> '+ element.sex +' / '+ element.quality +' /  '+ element.size +'</p>').end()
					//商品单价
					.children(".goods-price").text(element.price).end()
					//商品数量的 增加减少 创建 并显示在页面中
					.children(".goods-number").html('<div class="minus-number"><a href="javascript:;">-</a></div><div class="default-number">'+ element.number +'</div><div class="add-number"><a href="javascript:;">+</a></div>').end()
					//商品 价格的小计
					.children(".goods-total").text(element.number * element.price ).end()
					//对 此商品的操作
					.children(".goods-coprate").html("<a class='operation' href='javascript:;'>删除</a>");			
		});
	}
	else{
		//数组长度为 0 显示 购物车为空
		$(".no-goods").show();
	}

	//删除 购物车中的商品
	$(".operation").on("click",function(){
		// 定义需要删除的数据对象
		var $del = $(this).parents("#shop-detail");
		//获取缓存数据
		var oData = $del.data("data");
		//获取当前商品在数组中是第几个元素
		var index = $.inArray(oData,aGoods);
		//从数组中删除
		aGoods.splice(index,1);
		//将删除后的 数组重新 保存到 cookie中
		$.cookie("aGoods",aGoods,{expires:7,path:"/"});	
		//从页面中删除
		$del.remove();
	});
	//全选
	//此处注意class名的混淆 
	$(".product").click(function(){
		$(".checkbox").prop("checked",$(this).prop("checked"));
	});

	//数量的增加
	$(".add-number").on("click",function(){
	//获取原有的数量
		var iNum = parseInt($(".default-number").text());
	// 增加 1 并显示在页面中
		$(".default-number").text(iNum + 1);
	//获取物品的单价
		var iPrice = parseInt($(this).parent().prev().text());
	//计算小计
		$(this).parent().next().text(iPrice * (iNum+1));
	});

	//数量的减少
	$(".minus-number").on("click",function(){
	//获取原有的数量
		var iNum = parseInt($(".default-number").text());
		if(iNum <=1){
			iNum = 2;
		}
	// 减少 1 并显示在页面中
		$(".default-number").text(iNum - 1);
	//获取物品的单价
		var iPrice = parseInt($(this).parent().prev().text());
	//计算小计
		$(this).parent().next().text(iPrice * (iNum - 1));
	});

	// ..删除选中行
	$(".delete-con").on("click",function(){
		$(".checkbox").each(function(index,element){
			if($(this).is(":checked")){
				//定义需要删除的对象
					var $del = $(this).parents("#shop-detail");
				//获取缓存数据
					var oData = $del.data("data");
				//获取当前商品在数组中是第几个元素
					var index = $.inArray(oData,aGoods);
				//从数组中删除
					aGoods.splice(index,1);
				//将删除后的 数组重新 保存到 cookie中
					$.cookie("aGoods",aGoods,{expires:7,path:"/"});	
				//从页面中删除
					$del.remove();
			}

		});
	});
	//选择商品的个数
	$(".choosed i").text($("input:checkbox:checked").length);
	console.log($("input:checkbox:checked").length);
	$(".goods-number").on("click",function(){
			var iGoodsNum = parseInt($(".choosed i").text());
		console.log(iGoodsNum);
	});
	//计算总价
	$(".goods-number").on("click",function(){
		var total = 0;
		$(".goods-number:checked").parents("#shop-detail").find(".goods-total").each(function(index,element){
			total += parseFloat($(this).text());
			console.log(total);
		});
		$("#span-allprice").children("em").text(total);
		var iGoodsNum = $(".default-number").text();
		//保存总价到 结算页面中
		$.cookie("iGoodsNum",iGoodsNum,{expires:7,path:"/"});
		$.cookie("iTotal",total,{expires:7,path:"/"});
		$.cookie("aGoods",aGoods,{expires:7,path:"/"});	
	});
	$(".go-balance").on("click",function(){
		window.location.href = "../html/Order.html";
	});
})

