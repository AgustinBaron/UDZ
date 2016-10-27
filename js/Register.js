$(function(){
	// $("#submit-btn").attr("disabled",true); 
	var regPhone = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;	//验证输入的手机号
	var password = /^[a-z0-9_-]{6,18}$/;  //验证输入的密码
	$("#send-code").on("click",function(){
		$("#yanzheng").show();
		// 验证码
	var brr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
		index1=Math.round((brr.length-1)*Math.random());
		index2=Math.round((brr.length-1)*Math.random());
		index3=Math.round((brr.length-1)*Math.random());
		index4=Math.round((brr.length-1)*Math.random());
		var oCode = $("#yanzheng").text(brr[index1]+brr[index2]+brr[index3]+brr[index4]);
		//我已阅读并同意 的北京图片点击设置
		$(".user-choose-box").on("click",function(){
			$(".user-choose-con").css({
				"background-position":"-48px 0"
			}).addClass("active")/*.next().children().removeAttr("disabled")*/;
		});
		console.log($(".user-choose-box").next().children().attr("disabled"));
		$("#submit-btn").on("click",function(){			
			var iphone = regPhone.test($("#user-name").val());  //验证输入的手机号是否正确
			if(!iphone){
				alert("请输入正确的手机号码");
			}
			if(oCode.text()!==$("#input-code").val()){
				alert("您输入的验证码不正确");
			}
			if($("#user-password-1").val()!==$("#user-password-2").val()){
				alert("两次输入的密码不一致");
			}
			console.log($("#user-password-1").val(),$("#user-password-2").val());
			console.log(oCode.text()==$("#input-code").val());
			if($(".user-choose-con").attr("class") !== "user-choose-con active"){
				alert("请阅读服务条款");
			}
			console.log($(".user-choose-con").attr("class") === "user-choose-con active");
			if(iphone&&oCode.text()==$("#input-code").val()&&$("#user-password-1").val()==$("#user-password-2").val()&&$(".user-choose-con").attr("class") == "user-choose-con active"){
				setCookie("username",$("#user-name").val(),{expires:7,path:"/"});
				setCookie("password",$("#user-password-1").val(),{expires:7,path:"/"});
				console.log($("#user-name").val());
				alert("恭喜您，注册成功.点击确定后3s跳转到首页");
				setTimeout(function(){
					window.location.href = "../index.html";
				}, 3000);
			}
			return false;
		});

	});
	//我已阅读并同意 的北京图片设置
	$(".user-choose-con").hover(function(){
		$(".user-choose-con").css({
			"background-position":"-24px 0"
		});
	},function(){
		$(".user-choose-con").css({
			"background-position":"0 0"
		});
	});	
});