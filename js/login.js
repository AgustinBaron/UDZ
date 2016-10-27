$(function(){
	var 
		sNewUserName = getCookie("username");
		console.log(sNewUserName);
	var	sPassWord = getCookie("password");
		console.log(sPassWord);
	$("#user-login").on("click",function(){
		console.log($("#user-name").val() == sNewUserName);
		if($("#user-name").val() !== sNewUserName){
			alert("账号错误");
		}
		if($("#user-word").val() !== sPassWord){
			alert("密码错误");
		}
		if($("#user-name").val() === sNewUserName && $("#user-word").val() === sPassWord){
			alert("登录成功,点击确定后等待3s跳转到首页");
			setTimeout(function(){
				window.location.href = "../index.html";
			}, 3000);
		}
		return false;
	});
	
});