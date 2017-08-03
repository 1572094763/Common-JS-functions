/*
	creatd by sjw 2017-7-27
*/
'use strict'

var comFun={
	//获取样式函数
	getCurSty: function (obj, name){
		if(obj.currentStyle){   //IE的方法
			return obj.currentStyle[name];
		}else{
			return getComputedStyle(obj, null)[name];
		}
	},
		
	//清除对象中值为空的属性
	//filterParams({a:"",b:null,c:"010",d:123})
	//Object {c: "010", d: 123}
	filterParams:function (obj){
		var newObj={};
		for(var attr in obj){
			 if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
	            _newPar[key] = obj[key];
	        }
		}
		return newObj;
	},
	
	//判断一个是不是空对象
	isParNull:function (obj){
		var isObj=Object.prototype.toString.call(obj);
		if(isObj !== '[object Object]')  return false;  //不是一个对象
		if(JSON.stringify(obj) == '{}') return true;  //是空对象
		return false;     //不是空对象
	},
	
	//去除字符串里全部空格
	trim:function (obj){
		return obj.replace(/\s+/g, '')
	},
	
	//去除首尾空格,有BUG，只能去除首尾第一个空格
	trimLfetRight:function (obj){
		var newObj='';
		newObj=obj.replace(/^\s+/, '');
		newObj=obj.replace(/\s+$/, '');
		return newObj;
	},
	
	//字符串首尾所有的空格都去除
	trimLfetRightAll:function (obj){
		var start=0, end=obj.length-1;
		while(start<=end && obj.charAt(start) == " "){
			start++;
		}
		while(start <= end && obj.charAt(end) == " "){
			end--;
		}
		return obj.substring(start, end + 1);
	},
	
	//到某一个时间的倒计时
	//getEndTime('2017/7/27 16:0:0')
	//"剩余时间6天 2小时 28 分钟20 秒"
	getEndTime:function (endTime){
		var startDate=new Date();  //开始时间，当前时间
	    var endDate=new Date(endTime); //结束时间，需传入时间参数
	    var t=endDate.getTime()-startDate.getTime();  //时间差的毫秒数
	    var d=0,h=0,m=0,s=0;
	    if(t>=0){
	      d=Math.floor(t/1000/3600/24);
	      h=Math.floor(t/1000/60/60%24);
	      m=Math.floor(t/1000/60%60);
	      s=Math.floor(t/1000%60);
	    }
	    return "剩余时间"+d+"天 "+h+"小时 "+m+" 分钟"+s+" 秒";
	},
	
	//适配rem
	getFontSize:function (){
		var doc=document,win=window;
	    var docEl = doc.documentElement,
	    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	    recalc = function () {
	        var clientWidth = docEl.clientWidth;
	        if (!clientWidth) return;
	        //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
	        if(clientWidth>750){clientWidth=750}
	        //设置根元素font-size大小
	        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
	    };
	    //屏幕大小改变，或者横竖屏切换时，触发函数
	    win.addEventListener(resizeEvt, recalc, false);
	    //文档加载完成时，触发函数
	    doc.addEventListener('DOMContentLoaded', recalc, false);
	},
	
	//缓冲运动函数,调用该函数时单位不用带px
	startMove:function (obj,json,fnEnd){
		var _that=this;
		clearInterval(obj.timer);
		obj.timer=setInterval(function ()
		{
			var bStop=true;           //假设：所有的值都到了；
			for(var attr in json){
				var cur=0;
				if(attr=='opacity'){
					cur=Math.round(parseFloat(_that.getCurSty(obj,attr))*100);	
				}
				else{
					cur=parseInt(_that.getCurSty(obj,attr));	
				}
				
				var speed=(json[attr]-cur)/6;
				speed=speed>0?speed=Math.ceil(speed):speed=Math.floor(speed);
				
				if(cur!==json[attr]) bStop=false;
				if(attr=='opacity'){
					obj.style.filter='alpha(opacity:'+(cur+speed)+')';
					obj.style.opacity=(cur+speed)/100;
				}else{
					obj.style[attr]=cur+speed+'px';	
				}
			}
			if(bStop){
				clearInterval(obj.timer);
				if(fnEnd)fnEnd();
			}
				
		},30)	
	}
	
	
	
}











