
//保存cookie
//{expires:7,path:"/",domain:"",secure:true} domain表示域名  secure表示安全

function setCookie(key,value,options){
	//最基本的键值对
	var str = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	//失效时间
	if(options.expires){
		var expires = options.expires;
		//判断失效时间是什么类型
		if(typeof expires === "number"){
			expires = new Date();//当前本地日期时间对象
			expires.setDate(expires.getDate() + options.expires);//计算失效时间
		}
		str += ";expires=" + expires.toUTCString();//toUTCString转成字符串
	}
	// 路径
	if(options.path){
		str += ";path=" + options.path;
	}
	//域名
	if(options.domain){
		str += ";domain=" + options.domain;
	}
	//安全
	if(options.secure){
		str += ";secure";
	}
	//保存 cookie
	document.cookie = str;
}
//根据 key 获取 cookie 值
function getCookie(key) {
	var aCookie = document.cookie.split('; '); // 对cookie进行分组
	var oCookie = {};  // 存储切割完以后的cookie数据
	for(var i =0; i < aCookie.length; i++) {
		var aTemp = aCookie[i].split('=');
		oCookie[aTemp[0]] = aTemp[1];
	}
	return decodeURIComponent(oCookie[key]);
}
//移除 cookie 
function removeCookie (key,options){
	options.expires = -1;
	setCookie(key, "", options);
}