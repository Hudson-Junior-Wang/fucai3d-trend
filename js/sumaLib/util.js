var host=window.location.protocol+"//"+((window.location.host.indexOf("localhost")!=-1||window.location.host.indexOf("192.168")!=-1)?(window.location.host+"/Zjt"):window.location.host);
function toJsonStr(obj){
	return JSON.stringify(obj);
}
function toJsonObj(jsonStr){
	try{
        return eval("("+jsonStr+")");
   }catch(e){
        //alert(e); 
   }
}
function callCSharp(param){
	var ret=window.external.callCSharp(toJsonStr(param));
	return ret;
}
function callAndroid(param){
	var ret=android.callAndroid(toJsonStr(param));
	return ret;
}
function callIos(param){
	//window.webkit.messageHandlers.callOc.postMessage(toJsonStr(param));
	callOc('ios://callOc'+toJsonStr(param));
}
function callCpp(json){
   var ret=window.external.execute(json);
   return eval("("+ret+")");
}
function showMsg(msg){
	var alertDiv=$("<div style='position:fixed;background:#535050;color:white;text-align:center;border-radius:10px;padding:10px;display:none;'></div>");
	$("body").append(alertDiv);
	alertDiv.text(msg);
	alertDiv.css({left:($(window).width()-alertDiv.width())/2+"px",bottom:"100px"}).fadeIn();
	setTimeout(function(){
		alertDiv.fadeOut();
	},3000);
}
function dynamicImport(obj) {
    if (obj.cssOrJs == "css") {
        var css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("type", obj.type);
        css.setAttribute("href", obj.path);
        if (obj.charset != undefined && obj.charset != null) {
            jsScript.setAttribute("charset", obj.charset);
        }
        document.getElementsByTagName("head")[0].appendChild(css);
    } else {
        var jsScript = document.createElement("script");
        jsScript.setAttribute("type", obj.type);
        jsScript.setAttribute("src", obj.path);
        if (obj.charset != undefined && obj.charset != null) {
            jsScript.setAttribute("charset", obj.charset);
        }
        document.getElementsByTagName("head")[0].appendChild(jsScript);
    }
}
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
function randomX(x){
	return Math.floor(Math.random()*x);
}
function en(str){
	var en="";
	var chars = ['0','1','2','3','4','5','6','7','8','9',
	             'a','b','c','d','e','f','j','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
	             'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	for(var i = 0; i < 20 ; i ++) {
        var id = randomX(62);
        en += chars[id];
    }
	en+=str;
	for(var i = 0; i < 20 ; i ++) {
        var id = randomX(62);
        en += chars[id];
    }
	return en;
}
function de(str){
	return str.substr(20,str.length-40)
}
function getAppCnName(){
	if(window.location.href.indexOf("1jzk")!=-1||window.location.href.indexOf("bk360")!=-1||window.location.href.indexOf("s8z88")!=-1){
		return "省吧赚吧";
	}else if(window.location.href.indexOf("soufan")!=-1){
		return "返利优惠券";
	}else if(window.location.href.indexOf("xinyuanxinxi")!=-1){
		return "天淘返利宝";
	}else{
		return "省吧赚吧";
	}
}
function callApp(method,param){
	var ret=null;
	try{
		if(browser.versions.android){
			var param={method:method};
			ret=android.callAndroid(toJsonStr(param));
		}else{
			
		}
	}catch(e){
		
	}
	
	return ret;
}
function callIos(param){
	window.webkit.messageHandlers.callOc.postMessage(toJsonStr(param));
}
/**
*
*/
function HttpUtils(){

}
/**
* 
* @param url
* @param param json对象
* @param callBack
* @param errorUrl
*/
HttpUtils.ajaxHttpGet=function(url,param,callBack,errorUrl){
   jQuery.support.cors = true;
   var pp=window.location.href.split("?");
   $.ajax({
       type:"GET",
       url:url+(pp.length==2?(url.indexOf("?")!=-1?"&":"?")+pp[1]:""),
       data:"param="+toJsonStr(param),
       dataType:"json"
   }).done(function(data,textStatus,jqXHR){
       callBack(data,textStatus,jqXHR);
   }).fail(function(jqXHR,textStatus,errorThrown){
   	if(errorUrl){
   		window.location.href=errorUrl;
   	}else{
   		if(jqXHR.status==500)
   			document.write("请求出现错误："+jqXHR.status);
   	}
      // alert("错误："+textStatus);
   });
}
/**
* @param url
* @param param
* @param callBack
* @param contentType
* @param errorUrl
*/
HttpUtils.ajaxHttpPost=function(url,param,callBack,errorUrl){
   jQuery.support.cors = true;
   var pp=window.location.href.split("?");
   $.ajax({
       type:"POST",
       url:url,
       data:"param="+toJsonStr(param),
       dataType:"json"
   }).done(function(data,textStatus,jqXHR){
       callBack(data,textStatus,jqXHR);
   }).fail(function(jqXHR,textStatus,errorThrown){
   	if(errorUrl){
   		window.location.href=errorUrl;
   	}else{
   		if(jqXHR.status==500)
   			document.write("请求出现错误："+jqXHR.status);
   	}
   });
}
function loading (){
	$("#loading").ajaxStart(function(){
		$(this).show();
	}).ajaxComplete(function(){
		$(this).hide();
	});
}
/**
* ajax方式上传文件，上传后不跳转，无需表单
* @param url 服务器端url
* @param fileElementId file input元素id
* @param addtionParam 附加参数,string 类型
* @param callBack 上传成功后回调
*/
HttpUtils.ajaxFileUpload=function(url,fileElementId,addtionParam,callBack){
   //loading();
   $.ajaxFileUpload({
      url:url, //你处理上传文件的服务端
      secureuri:false,
      fileElementId:fileElementId,
      dataType:'json',
      data:addtionParam,
      success:function(data) {
   	   callBack(data);
      }
	});
}
//map
function Map() {
    this.fields=new Array();
}
Map.prototype.getIndex=function(key){
   if(key==null||key==undefined){
        return -1;
    }
    for(var i=0;i<this.fields.length;i++){
        if(key===this.fields[i].key){
            return i;
        }
    }
    return -1;
}
Map.prototype.put=function(key,value){
    if(key==null||key==undefined){
        return;
    }
    var index=this.getIndex(key);
   if(index==-1){
        var entry=new Object();
        entry.key=key;
        entry.value=value;
        this.fields.push(entry);
    }else{
        this.fields[index].value=value;
    }
}
Map.prototype.get=function(key){
    var index=this.getIndex(key);
    return index==-1?null:this.fields[index].value;
}
Map.prototype.remove=function(key){
    var index=this.getIndex(key);
   if(index!=-1){
       this.fields.splice(index,1);
   }
}
Map.prototype.clear=function(key){
    this.fields.length=0;
}
Map.prototype.contains=function(key){
    var index=this.getIndex(key);
    return (index==-1)?false:true;
}
Map.prototype.size=function(key){
    return this.fields.length;
}
Map.prototype.getEntrys=function(key){
    return this.fields;
}
/**
 * TreeMap�������Ԫ������
 */
function TreeMap(){
    Map.call(this);
}
TreeMap.prototype=new Map();
TreeMap.prototype.put=function(key,value,sortFunctionOrField){
    if(key==null||key==undefined){
        return;
    }
   var index=this.getIndex(key);
   if(index==-1){
        var entry=new Object();
        entry.key=key;
        entry.value=value;
        this.fields.push(entry);
        if(sortFunctionOrField==undefined){//Ĭ�ϰ�key����ĸ������
            this.fields.sort(function(x,y){
                if(x["key"]>y["key"]){
                    return 1;
                }else{
                    return -1; 
                }
            });
        }else if(typeof sortFunctionOrField=="function"){//�Զ������򣬿��԰���value��ĳ���ֶ�����
            this.fields.sort(sortFunctionOrField);
        }else{//���԰���value��ĳ���ֶ�����
            this.fields.sort(function(x,y){
                if(x.value[sortFunctionOrField]>y.value[sortFunctionOrField]){
                    return 1;
                }else{
                    return -1; 
                }
            });
        }
    }else{
        this.fields[index].value=value;
    }
}
//��JSON����תΪJSON�ַ�
function jsonObjToString(O){
    //return JSON.stringify(jsonobj);
    var S=[];
    var J="";
    if(Object.prototype.toString.apply(O)==='[object Array]'){
        for(var i=0;i<O.length;i++)
            S.push(jsonObjToString(O[i]));
        J='['+S.join(',')+']';
    }else if(Object.prototype.toString.apply(O)==='[object Date]') {
        J="new Date("+O.getTime()+")";
    }else if(Object.prototype.toString.apply(O)==='[object RegExp]'||Object.prototype.toString.apply(O)==='[object Function]'){
        J= O.toString();
    }else if(Object.prototype.toString.apply(O)==='[object Object]'){
        for(var i in O) {
            O[i]=typeof(O[i])=='string'?'"'+O[i]+'"':(typeof(O[i])==='object'?jsonObjToString(O[i]):O[i]);
            S.push(i+':'+O[i]);
        }
        J='{'+S.join(',')+'}';
    }
    return J;
};
//生成num个[0,maxNumber)的整数
function random(num,maxNumber){
    var arr=new Array(maxNumber);
    for(var i=0;i<maxNumber;i++){
        arr[i]=i;
    }
    var resultSet=new Array();
    for(var i=0;i<num;i++){
        var tmp=Math.floor(Math.random()*maxNumber);
        resultSet.push(arr[tmp]);
        arr.splice(tmp,1);
        maxNumber--;
    } 
    return sortArray(resultSet);
}
//����num�����ظ���[0,maxNumber)�����
function random2(num,maxNumber,sort){
    //var arr=new Array(maxNumber);
    //for(var i=0;i<maxNumber;i++){
    //    arr[i]=i;
    //}
    var resultSet=new Array();
    for(var i=0;i<num;i++){
        var tmp=Math.floor(Math.random()*maxNumber);
        resultSet.push(tmp);
        //arr.splice(tmp,1);
        //maxNumber--;
    } 
    if(sort==true){
        return sortArray(resultSet);
    }else{
        return resultSet;
    }
}
/**
 * �ҵ�һ�����鲻�ظ���Ԫ��
 */
function findUnRepeatElement(array){
    var unRepeatedEle=new Array();
    for(var i=0;i<array.length;i++){
        var isRepeated=false;
        for(var j=0;j<array.length;j++){
            if(i!=j&&array[i]==array[j]){
               isRepeated=true;
                break;
            }       
        }  
        if(!isRepeated){
            unRepeatedEle.push(array[i]);
        }
    }
    return unRepeatedEle;
}
/**
 * �ҵ�һ���������ظ���Ԫ��
 */
function findRepeatElement(array){
    var repeatedEle=new Array();
    for(var i=0;i<array.length;i++){
        var tmp=array[i];
        for(var j=0;j<array.length;j++){
            if(i!=j&&tmp==array[j]){
                repeatedEle.push(array[j]);
                break;
            }       
        }  
    }
    return repeatedEle;
}
/**
 * ����������Ĳ
 */
function aMinusB(arrayA,arrayB){
    var longArray;
    var shortArray;
    if(arrayA.length>=arrayB.length){
        longArray=arrayA;
        shortArray=arrayB;
    }else{
        longArray=arrayB;
        shortArray=arrayA;
    }
    var result=new Array();
    for(var i=0;i<longArray.length;i++){
        var isAinB=false;
        for(var j=0;j<shortArray.length;j++){
            if(longArray[i]==shortArray[j]){
                isAinB=true;
                break;
            }
        }
        if(!isAinB){
            result.push(longArray[i]);
        }
    }
    return result;
}
/**
 * ����������Ľ���
 */
function aIntersectB(arrayA,arrayB){
    var result=new Array();
    for(var i=0;i<arrayA.length;i++){
        for(var j=0;j<arrayB.length;j++){
            if(arrayA[i]==arrayB[j]){
                result.push(arrayA[i]);
                break;
            }
        }
    }
    return result;
}

//
function tagNameOfJqueryObj(obj) {
    var jsObj=obj[0];
    alert(jsObj.tagName);
}
/**
 * �ж�����b�Ƿ���������a
 */
function arrayAcontainB(a,b){
    for(var i=0;i<b.length;i++){
        var isOk=false;
        for(var j=0;j<a.length;j++){
            if(b[i]===a[j]){
                isOk=true;
                break;
            }
        }
        if(!isOk){
            return false;
        }
    }
    return true;
}
/**
 * �ж�����a�Ƿ���b��ĳһ��Ԫ��
 */
function arrayAcontainAnyOfB(a,b){
    for(var i=0;i<b.length;i++){
        for(var j=0;j<a.length;j++){
           if(b[i]==a[j]){
               return true;
           }
        }
    }
    return false;
}
/**
 * type:0-a全部包含b为真，1-a含b中的任一个即为真
 * @param a
 * @param b
 * @param type
 * @return
 */
function arrayAcontainsAnyOfB(arrA,arrB,type){
	if(type==0){
		var is=false;
		for(var i=0;i<arrB.length;i++){
			is=false;
			for(var j=0;j<arrA.length;j++){
				if(arrB[i]==arrA[j]){
					is=true;//包含
					break;
				}
			}
			if(!is){
				return false;
			}
		}
		return true;
	}else{
		for(var i=0;i<arrB.length;i++){
			for(var j=0;j<arrA.length;j++){
				if(arrB[i]==arrA[j]){
					return true;
				}
			}
		}
		return false;
	}
}
/**
 * �ж�����a�Ƿ���ĳһ��Ԫ��
 */
function arrayAcontainEleB(a,b){
    for(var i=0;i<a.length;i++){
        if(b==a[i]){
            return true;
        }
    }
    return false;
}
/**
 *
 */
function myEval(json){
    try{
         return eval("("+json+")");
    }catch(e){
         //alert(e); 
    }
}
/**
 * 
 */
function arrayToParsedStr(array,rows,columns){
    var str="";
    for(var i=0;i<rows;i++){
        for(var j=0;j<columns;j++){
            var index=i*columns+j;
            if(index<array.length){
                str+=array[index]+",";
            }else{
                break;
            }
        }
        str+="<br/>";
    }
    return str.substring(0,str.length-6);
}
/**
 * �ܳ���Ϊcolumns�к�Ӧ�õõ�������
 */
function getRows(length,columns){
    var tmp=length%columns;
    if(tmp==0){
        return length/columns;
    }else{
        return parseInt(length/columns)+1;
    }
}
/**
 * �ܳ���Ϊrow�к�Ӧ�õõ�������
 */
function getColumnCount(length,rows){
    var tmp=length%rows;
    if(tmp==0){
        return alength/rows;
    }else{
        return parseInt(length/rows)+1;
    }
}
/**
 * ���򵥶��󡢶�������תΪxml�ַ�
 */
function plainObjToXmlStr(obj){
    if(obj.length==1){
        var xml="<item";
        for(var pro in obj){
            xml+=" "+pro+"=\""+obj[pro]+"\"";
        }
        xml+="/>";
        return xml;
    }else{
        var xml="";
        for(var i=0;i<obj.length;i++){
            xml+="<item";
            for(var pro in obj[i]){
                xml+=" "+pro+"=\""+obj[i][pro]+"\"";
            }
            xml+="/>";
        }
        return xml;
    }
}
/**
 * ��������ĵѿ����
 */
function concatArray(arrayA,arrayB){
    var newArray=new Array();
    for(var i=0;i<arrayA.length;i++){
        for(var j=0;j<arrayB.length;j++){
            newArray.push(arrayA[i]+arrayB[j]);
        }
    }
    return newArray;
}
/**
 * ��������
 * func����Ϊ��value,key,������
 */
function iterationObj(obj,func){
    for(var pro in obj){
       func(obj[pro],pro,obj);
    }
}
function getBrowserInfo() {
    var agent=navigator.userAgent.toLowerCase();

    var regStr_ie=/msie [\d.]+;/gi;
    var regStr_ff=/firefox\/[\d.]+/gi
    var regStr_chrome=/chrome\/[\d.]+/gi;
    var regStr_saf=/safari\/[\d.]+/gi;
    //IE
     return agent;
    //firefox
    if(agent.indexOf("firefox")>0) {
        return agent.match(regStr_ff);
    }
    //Chrome
    if(agent.indexOf("chrome")>0) {
        return agent.match(regStr_chrome);
    }
    //Safari
    if(agent.indexOf("safari")>0&&agent.indexOf("chrome")<0) {
        return agent.match(regStr_saf);
    }
}
/**
 * 
 */
function debug(obj){
    alert(JSON.stringify(obj));
}
/**
 * ������תΪ�ַ�
 * splitΪ�ָ����綺��
 */
function arrayToStr(arr,split){
    var str="";
    for(var i=0;i<arr.length;i++){
        str+=arr[i]+split;
    }
    return str.substring(0,str.length-split.length);
}
/**
 * ��������array-���飬orderProp-�����ֶ�����order-����
 * byNumberΪtrue�������ִ�С��������ĸ��
 */
function sortArray(array,orderProp,order,byNumber){
    if(order=="desc"){
        if(orderProp==undefined||orderProp==""){
            array.sort(function(x,y){
                if(byNumber){
                    if(Number(x)>Number(y)){
                        return -1;
                    }else{
                        return 1;
                    }
                }else{
                    if(x>y){
                        return -1;
                    }else{
                        return 1;
                    }
                }
            });
        }else{
            array.sort(function(x,y){
                if(byNumber){
                    if(Number(x[orderProp])>Number(y[orderProp])){
                        return -1;
                    }else{
                        return 1;
                    }
                }else{
                    if(x[orderProp]>y[orderProp]){
                        return -1;
                    }else{
                        return 1;
                    }
                }
            });
        }
    }else{
        if(orderProp==undefined||orderProp==""){
            array.sort(function(x,y){
                if(byNumber){
                    if(Number(x)>Number(y)){
                        return 1;
                    }else{
                        return -1;
                    }
                }else{
                    if(x>y){
                        return 1;
                    }else{
                        return -1;
                    }
                }
            });
        }else{
            array.sort(function(x,y){
                if(byNumber){
                    if(Number(x[orderProp])>Number(y[orderProp])){
                        return 1;
                    }else{
                        return -1;
                    }
                }else{
                    if(x[orderProp]>y[orderProp]){
                        return 1;
                    }else{
                        return -1;
                    }
                }
            });
        }
    }
    return array;
}
/**
 * xmlFilePathΪxml�ļ�·��
 */
function parseXmlFile(xmlFilePath){
    var xmlDoc=null;
    if(window.ActiveXObject){
        try{
            xmlDoc=new ActiveXObject("Msxml2.DOMDocument.6.0");
        }catch(e){
            alert(e);
        }
    }else if(document.implementation&&document.implementation.createDocument){
        try{
            /* document.implementation.createDocument('','',null); �������������˵��
                * ��һ�������ǰ��ĵ���ʹ�õ�����ռ�URI���ַ� 
                * �ڶ��������ǰ��ĵ���Ԫ����Ƶ��ַ� 
                * �����������Ҫ�������ĵ����ͣ�Ҳ��Ϊdoctype��
                */
            xmlDoc=document.implementation.createDocument('','',null);
        }catch(e){
        }
    }else{
       return null;
    }
    if(xmlDoc!=null){
        xmlDoc.async = false;
        xmlDoc.load(xmlFilePath);
    }
    return xmlDoc;
}
/**
 * ��xml�ַ�תxml element
 */
function parseXmlStr(xmlStr){
    var xmlDoc=null;
    if(window.ActiveXObject){
        try{
            xmlDoc=new ActiveXObject("Msxml2.DOMDocument.6.0");
            xmlDoc.async=false;
            xmlDoc.loadXML(xmlStr);
        }catch(e){
            alert(e);
        }
    }else if(document.implementation&&document.implementation.createDocument){
         try{
            var domParser=new DOMParser();
            xmlDoc=domParser.parseFromString(xmlStr,"text/xml");
        }catch(e){
            alert(e);
        }
    }else{
       return null;
    }
    return xmlDoc;
}
/**
 * ��xmlԪ��ת�ַ�
 */
function xmlElementToStr(xmlObj){
    if(document.all){ //IE�����
        return xmlObj.xml;
    }else{ //���������
        return (new XMLSerializer()).serializeToString(xmlObj);
    }
}
/**
 * 
 * @param format 日期格式
 * @returns
 */
function getDate(format){
    var date=new Date();
    return formatDate(date);
}
/**
 * 格式化日期
 * @param date
 * @param pattern yyyy-MM-dd
 */
function formatDate(date,pattern){
	var o = {
	        "M+": date.getMonth() + 1, //月份 
	        "d+": date.getDate(), //日 
	        "h+": date.getHours(), //小时 
	        "m+": date.getMinutes(), //分 
	        "s+": date.getSeconds(), //秒 
	        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
	        "S": date.getMilliseconds() //毫秒 
	    };
	var week = {         
		    "0" : "/u65e5",         
		    "1" : "/u4e00",         
		    "2" : "/u4e8c",         
		    "3" : "/u4e09",         
		    "4" : "/u56db",         
		    "5" : "/u4e94",         
		    "6" : "/u516d"        
		    };  
	    if (/(y+)/.test(pattern)) 
	    	pattern = pattern.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    if(/(E+)/.test(pattern)){         
	    	pattern=pattern.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[date.getDay()+""]);         
	    } 
	    for (var k in o)
	    	if (new RegExp("(" + k + ")").test(pattern)) pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return pattern;
	
//	if(pattern==undefined||pattern==null||pattern==""){
//        return date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
//    }else{
//    	var m=date.getMonth()+1;
//        return date.getFullYear()+pattern+(m<10?"0"+m:m)+pattern+date.getDate();
//    }
}
function getCnDayOfWeek(){
    var date=new Date();
    var dayOfWeek=date.getDay();
    var dateMapChinese=[[0,"星期日"],[1,"星期一"],[2,"星期二"],[3,"星期三"],[4,"星期四"],[5,"星期五"],[6,"星期六"]];
    var weekday;
    for(var i=0;i<dateMapChinese.length;i++){
        if(dayOfWeek==dateMapChinese[i][0]){
            weekday=dateMapChinese[i][1];
            break;
        }
    }
    return weekday;
}
function getDayOfWeekFromDate(y,m,d){
	var myDate=new Date();
	myDate.setFullYear(y,Number(m)-1,d);
	  var myddy=myDate.getDay();//获取存储当前日期
	  var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  return weekday[myddy];
}
/**
 * �׳˺���
 */
function factorial(n){
	if(n==0||n==1){
		return 1;
	}else{
		return n*factorial(n-1);
	}
}
/**
 * ����ϸ����xѡ��y�ĸ���
 */
function cXy(x,y){
    if(x<y){
        return 0;
    }
    var t=1;
    for(var i=0;i<y;i++){
		t*=(x-i);
	}
	var ret=t/factorial(y);
    //var ret=factorial(x)/(factorial(x-y)*factorial(y));
	return ret;
}
/**
 * �����и����xѡ��y��ȫ��
 */
function aXy(x,y){
    if(x<y){
        return 0;
    }
    var t=1;
    for(var i=0;i<y;i++){
		t*=(x-i);
	}
	return t;
}
/**
 * ������תΪǰ�油0���ַ���1->001
 * i:����length:����
 */
function intToZeroStartStr(_int,length){
    var iStr=_int.toString();
    var zero="";
    for(var i=0;i<length-iStr.length;i++){
        zero+="0";
    }
    return zero+iStr;
}
/**
 * ���޷ָ�����ַ�תΪ����
 * 
 */
function strToArray(str){
    var arr=new Array(str.length);
    for(var i=0;i<str.length;i++){
        arr[i]=str.substr(i,1); 
    }
    return arr;
}
/**
 * 
 */
function parseUndefinedOrNullToStr(obj){
    if(obj==undefined){
        return "";
    }else{
        return obj.toString();
    }
}
/**
 * 
 */
function parseUndefinedOrNullToZero(obj){
    if(obj==undefined||obj==""){
        return 0;
    }else{
        return Number(obj);
    }
}
/**
 *
 */
function miFunction(base,mi){
	if(mi==0){
		return 1;
	}else if(mi==1){
		return base;
	}
	if(base==0){
		return -1;
	}
	return base*miFunction(base,mi-1);
}
function getCenterCoordinate(parent,self){
    var xy={};
    xy.left=(parent.width()-self.width())/2;
    xy.top=(parent.height()-self.height())/2;
    return xy;
}
/**
 * 从数组中找到字段fieldName的值为fieldValue的项
 */
function findItem(array,fieldName,fieldValue){
    for(var i=0;i<array.length;i++){
    	var item=array[i];
        if(item[fieldName]==fieldValue){
            return item;
        }
    }
    return null;
}
/**
 * 从数组中找到字段fieldName的值为fieldValue的项
 */
function findItems(array,fieldName,fieldValue){
	var subArray=[];
    for(var i=0;i<array.length;i++){
    	var item=array[i];
        if(item[fieldName]==fieldValue){
        	subArray.push(item);
        }
    }
    return subArray;
}
/**
 * 
 */
function isNumber(val){
    return isNaN(val);
}
/**
 *
 */
function isInt(val){
}
/**
 *
 */
function isIntBorE0(val){
    if(/^\+?[0-9]*$/.test(val)){
        return true;
    }else{
        return false;
    }
}
/**
 * 
 * @param href
 */
function parseHrefToObj(href){
	var obj={};
	if(href.indexOf("#")!=-1){
		href=href.split("#")[0];
	}
	var paramsStr=href.split("?");
	if(paramsStr.length>1){
		var params=paramsStr[1].split("&");
		for(var i=0;i<params.length;i++){
			var param=params[i].split("=");
			obj[param[0]]=param[1];
		}
	}
	return obj;
}

function encodeHtml (s){
	var REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
    s = (s != undefined) ? s : this.toString();
    return (typeof s != "string") ? s :
        s.replace(REGX_HTML_ENCODE.REGX_HTML_ENCODE, 
                  function($0){
                      var c = $0.charCodeAt(0), r = ["&#"];
                      c = (c == 0x20) ? 0xA0 : c;
                      r.push(c); r.push(";");
                      return r.join("");
                  });
};
function encodeHTML(str){
	return str.replace(/&/g,'&amp;')
	.replace(/</g,'&lt;')
	.replace(/>/g,'&gt;')
	.replace(/"/g, "&quot;")
	.replace(/'/g, "&#39;")
	.replace(/\n/g, "")
	.replace(/\r/g, "");
}

function decodeHtml(s){
	var REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;
    var HTML_DECODE =  /(^\s*)|(\s*$)/g;

    s = (s != undefined) ? s : this.toString();
    return (typeof s != "string") ? s :
        s.replace(REGX_HTML_DECODE,
                  function($0, $1){
                      var c = HTML_DECODE[$0];
                      if(c == undefined){
                          // Maybe is Entity Number
                          if(!isNaN($1)){
                              c = String.fromCharCode(($1 == 160) ? 32:$1);
                          }else{
                              c = $0;
                          }
                      }
                      return c;
                  });
};
/**
 * 
 * @param oldObj
 * @param newObj
 */
function findChange(oldObj,newObj){
	var obj={};
	for(var p in newObj){
		if(newObj[p]!==oldObj[p]){
			obj[p]=newObj[p];
		}
	}
	return obj;
}
/**
 * 判断两个简单对象是否相等，注意，不能用于复杂对象
 * @param a
 * @param b
 */
function equals(a,b){
	for(var p in a){
		if(a[p]!=b[p]){
			return false;
		}
	}
	for(var p in b){
		if(a[p]!=b[p]){
			return false;
		}
	}
	return true;
}

function getCnDayOfWeek(){
    var date=new Date();
    var dayOfWeek=date.getDay();
    var dateMapChinese=[[0,"星期日"],[1,"星期一"],[2,"星期二"],[3,"星期三"],[4,"星期四"],[5,"星期五"],[6,"星期六"]];
    var weekday="";
    for(var i=0;i<dateMapChinese.length;i++){
        if(dayOfWeek==dateMapChinese[i][0]){
            weekday=dateMapChinese[i][1];
            break;
        }
    }
    return weekday;
}
/**
 * 格式化日期
 * @param date
 * @param pattern yyyy-MM-dd hh:mm:ss
 */
function formatDate(date,pattern){
	var o = {
	        "M+": date.getMonth() + 1, //月份 
	        "d+": date.getDate(), //日 
	        "h+": date.getHours(), //小时 
	        "m+": date.getMinutes(), //分 
	        "s+": date.getSeconds(), //秒 
	        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
	        "S": date.getMilliseconds() //毫秒 
	    };
	var week = {         
		    "0" : "日",         
		    "1" : "一",         
		    "2" : "二",         
		    "3" : "三",         
		    "4" : "四",         
		    "5" : "五",         
		    "6" : "六"        
		    };  
	    if (/(y+)/.test(pattern)) 
	    	pattern = pattern.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    if(/(E+)/.test(pattern)){         
	    	pattern=pattern.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[date.getDay()+""]);         
	    } 
	    for (var k in o)
	    	if (new RegExp("(" + k + ")").test(pattern)) pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return pattern;
	
//	if(pattern==undefined||pattern==null||pattern==""){
//        return date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
//    }else{
//    	var m=date.getMonth()+1;
//        return date.getFullYear()+pattern+(m<10?"0"+m:m)+pattern+date.getDate();
//    }
}

//收藏本站 bbs.ecmoban.com
function addFavorite(title, url) {
  try {
      window.external.addFavorite(url, title);
  }catch (e) {
     try {
       window.sidebar.addPanel(title, url, "");
    }catch (e) {
         alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D按键组合进行添加");
     }
  }
} 

var _hmt = _hmt || [];
function baiDuTongJi(key){
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?"+key;
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode.insertBefore(hm, s);
}
function isIE(){
	var isIe;
	if (!!window.ActiveXObject || "ActiveXObject" in window)  
		isIe=true;  
    else  
    	isIe=false; 
	return isIe;
}
function callOc(url) {
    var iFrame;
    iFrame = document.createElement("iframe");
    iFrame.setAttribute("src","http://"+window.location.host+"/b.html?"+url);
    iFrame.setAttribute("style","display:none;");
    iFrame.setAttribute("height","0px");
    iFrame.setAttribute("width","0px");
    iFrame.setAttribute("frameborder","0");
    document.body.appendChild(iFrame);
    // 发起请求后这个 iFrame 就没用了，所以把它从 dom 上移除掉
    iFrame.parentNode.removeChild(iFrame);
    iFrame = null;
}
function idMobile(){
	var mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire");    
	var browser = navigator.userAgent.toLowerCase();    
	for (var i=0; i<mobileAgent.length; i++){ 
		if (browser.indexOf(mobileAgent[i])!=-1){ 
		return true;
		} 
	}    
	return false;
}
//提示升级
function showSj(url){
	var alertDiv=$("<div style='position:fixed;background:#535050;color:white;text-align:center;border-radius:10px;'></div>");
	alertDiv.append("<div style='height:38px;line-height:38px;text-align:center;border-bottom:solid 1px lightgray;'><span>提示</span></div>");
	
	var con=$("<div></div>");
	con.append("<p style='text-indent:2em;font-size:12px;padding:10px 5px;'>本软件不在维护，请下载新软件！</p>");
	alertDiv.append(con);
	
	var footer=$("<table style='border-top:solid 1px lightgray;height:38px;width:100%;font-size:14px;' cellspacing='0' cellpadding='0'></table>");
	var tr=$("<tr></tr>");
	footer.append(tr);
	var okButton=$("<td style='border-right:solid 1px lightgray;'>立即下载</td>");
	okButton.click(function(){
		showMsg("即将下载......");
		alertDiv.remove();
		setTimeout(function(){
			window.location.href=url;
		},100);
		//var param={method:"download",packageName:"com.suma.cst",fileCnName:"今日牛股",url:url,fileName:"cst.apk"};
		//var ret=android.callAndroid(toJsonStr(param));
		
	});
	tr.append(okButton);
	
	var noButton=$("<td>暂不下载</td>");
	noButton.click(function(){
		alertDiv.remove();
	});
	tr.append(noButton);
	alertDiv.append(footer);
	$("body").append(alertDiv);
	alertDiv.css({left:($(window).width()-alertDiv.width())/2+"px",top:(($(window).height()-alertDiv.height())/2-30)+"px"});
}
function MyWin(title){
	var alertDiv=$("<div style='position:fixed;left:0px;top:0px;background:white;width:100%;height:100%;'></div>");
	var header=$("<div style='height:40px;border-bottom:solid 1px lightgray;'></div>");
	var table=$("<table style='width:100%;height:100%;vertical-align:middle;' border='0'></table>");
	var tr=$("<tr></tr>");
	this.td0=$("<td style='width:10%;'></td>");
	var back=$("<img style='height:22px;' src='../images/ui/adm.png'/>");
	var self=this;
	this.callbackOnClose=null;
	
	back.click(function(){
//		alertDiv.css({'left':-alertDiv.outerWidth()}).stop().animate({left:0});
//		setTimeout(function(){
			if(self.callbackOnClose){
				self.callbackOnClose();
			}
			alertDiv.remove();
//		},400);
		
	});
	this.td0.append(back);
	tr.append(this.td0);
	this.td1=$("<td style='text-align:center;font-size:13px;'>"+(title!=null?title:"")+"</td>");
	tr.append(this.td1);
	this.td2=$("<td style='width:10%;font-size:13px;'></td>");
	tr.append(this.td2);
	table.append(tr);
	header.append(table);
	alertDiv.append(header);
	
	this.body=$("<div style='height:100%;-webkit-overflow-scrolling:touch;overflow-y:scroll'></div>");
	alertDiv.append(this.body);
	
	$("body").append(alertDiv);
	//左滑进入
	alertDiv.css({'left':alertDiv.outerWidth()}).stop().animate({left:0});

	this.appendContent=function(div){
		this.body.append(div);
	}
	this.loadUrl=function(url){
		this.body.empty();
		this.body.append("<iframe style='width:100%;height:100%;border:none;-webkit-overflow-scrolling:touch;overflow-y:scroll;' src='"+url+"'></iframe>");
		
	}
	this.appendRight=function(div){
		this.td2.append(div);
	}
	
	this.onBack=function(f){
		this.callbackOnClose=f;
	}
	
	this.close=function(){
		alertDiv.remove();
	}
}
function arrayAHasEleB(arr,ele){
	for(var i=0;i<arr.length;i++){
		if(ele==arr[i]){
			return true;
		}
	}
	return false;
}

function arrayAHasPartEleB(arr,ele){
	for(var i=0;i<arr.length;i++){
		if(ele.indexOf(arr[i])!=-1){
			return true;
		}
	}
	return false;
}
function setCookie(name,value,days){
	if(days==undefined||days==null)
		days=30;
    var exp = new Date(); 
    exp.setTime(exp.getTime() + days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 

//读取cookies 
function getCookie(name) { 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null; 
}
function contain(strA,strB){
	if(strA.indexOf(strB)!=-1){
		return true;
	}
	return false;
}
function toBrowser(){
	var alertDiv=$("<div style='position:fixed;background:rgba(0,0,0,0.5);border:solid 1px lightgray;display:none;width:100%;height:100%;'></div>");
	$("body").append(alertDiv);
	if(browser.versions.android){
		alertDiv.append("<img style='width:100%;height:100%;' src='"+host+"/images/ui/android_tob.png'>");
	}else{
		alertDiv.append("<img style='width:100%;height:100%;' src='"+host+"/images/ui/ios_tob.png'>");
	}
	//alertDiv.append(button);
	alertDiv.css({left:($(window).width()-alertDiv.width())/2+"px",top:($(window).height()-alertDiv.height())/2+"px"}).fadeIn();
	//alertDiv.text(msg);
}
function openWin(uri,title,showAd){
	var h=window.location.protocol+"//"+((window.location.host.indexOf("localhost")!=-1||window.location.host.indexOf("192.168")!=-1)?(window.location.host+"/Zjt"):window.location.host);
	var appUrl;
	if(uri.indexOf("http://")!=-1||uri.indexOf("https://")!=-1){
		appUrl=uri;
	}else{
		appUrl=h+"/"+uri;
	}
	if(window.location.href.indexOf("android")!=-1){
		var param={method:"viewInWebView",title:(title==null?"":title),showAd:showAd,url:appUrl};
		var ret=android.callAndroid(toJsonStr(param));
		return ret;
	}else if(window.location.href.indexOf("from=ios_app")!=-1){
		
	}else if(browser.versions.mobile){
	//	var win=new MyWin(title);
	//	win.loadUrl(appUrl);
		window.location.href=appUrl;
	}else{
		if(window.location.href.indexOf("pc_client")!=-1){
            var param={method:"viewInWebView",title:title==null?"":title,showAd:false,url:appUrl};
            window.external.callCSharp(toJsonStr(param));
        }else{
             window.open(appUrl);
        }
	}
}
function openNoAdWin(uri,title){
	var h=window.location.protocol+"//"+((window.location.host.indexOf("localhost")!=-1||window.location.host.indexOf("192.168")!=-1)?(window.location.host+"/Zjt"):window.location.host);
	var appUrl;
	if(uri.indexOf("http://")!=-1||uri.indexOf("https://")!=-1){
		appUrl=uri;
	}else{
		appUrl=h+"/"+uri;
	}
	if(window.location.href.indexOf("android")!=-1){
		var param={method:"viewInNoAdWebView",title:title,showAd:false,url:appUrl};
		var ret=android.callAndroid(toJsonStr(param));
		return ret;
	}else if(window.location.href.indexOf("from=ios_app")!=-1){
		
	}else if(browser.versions.mobile){
	//	var win=new MyWin(title);
	//	win.loadUrl(appUrl);
		window.location.href=appUrl;
	}else{
		if(window.location.href.indexOf("pc_client")!=-1){
            var param={method:"viewInWebView",title:title==null?"":title,showAd:false,url:appUrl};
            window.external.callCSharp(toJsonStr(param));
        }else{
             window.open(appUrl);
        }
	}
}
function addScrollToTopBottom_app(bottom){
	var scrollArea=$("<div style='position:fixed;bottom:"+(bottom?bottom:140)+"px;right:1px;foot-size:13px;'></div>");
	var scrollToTop=$("<span style='display:inline-block;width:40px;height:40px;line-height:40px;text-align:center;border-radius:20px;border:solid 1px lightgray;cursor:default;'>顶</span>");
	scrollArea.append(scrollToTop).append("<br/>");
	var scrollToBottom=$("<span style='display:inline-block;width:40px;height:40px;line-height:40px;text-align:center;border-radius:20px;border:solid 1px lightgray;cursor:default;'>底</span>");
	scrollArea.append(scrollToBottom);
	$("body").append(scrollArea);
	scrollToTop.click(function(){
		$('html,body').animate({scrollTop:0},'quick');
	});
	scrollToBottom.click(function(){
		$('html, body, .content').animate({scrollTop: $(document).height()},300);
	});
}
function isIE(){
	if (window.navigator.userAgent.indexOf("MSIE")>=1){
		return true;
	}
	return false;
}
function showSearch(){
	var s=$('<span id="lastOne" style="position:fixed;right:0px;top:120px;display:inline-block;width:40px;height:40px;border:solid 1px lightgray;border-radius:40px;font-size:11px;line-height:40px;text-align:center;">搜索</span>');
	s.click(function(){
		var panel=$("<div id='searchPanel' style='position:fixed;top:50px;right:0px;font-size:13px;background:lightgray;padding:6px 10px 1px;'></div>");
		var input=$("<input style='width:100px;border:solid 1px lightgray;' type='text' placeholder=''/>");
		panel.append(input);
		
		var search=$("<span style='margin-left:5px;background:red;color:white;padding:3px 8px;'>搜索</span>");
		var index=0;var result=[];
		search.click(function(){
			index=0;
			result=[];
			var spans=$("span,p,a,b");
			var kw=input.val();
			if(kw==""){
				showMsg0("请输入关键词");
				return;
			}
			for(var i=0;i<spans.length;i++){
				var span=spans.eq(i);
				if(span.text().toLowerCase().indexOf(kw.toLowerCase())!=-1){
					result.push(span);
				}
			}
			if(result.length==0){
				showMsg0("没有搜索到所要结果");
				return;
			}
			var span=result[index];
			var b=span[0].offsetTop-100;
			span.css({background:"yellow"});
			$("html,body").animate({scrollTop:b},300);
		});
		
		panel.append(search);
		
		var next=$("<span style='margin-left:5px;background:red;color:white;padding:3px 5px;'>下一个</span>");
		next.click(function(){
			if(index>=result.length-1){
				showMsg0("已是最后一个");
				return;
			}
			index++;
			var span=result[index];
			var b=span[0].offsetTop;
			span.css({background:"yellow"});
			$("html,body").animate({scrollTop:b},300);
		});
		panel.append(next);
		
		var close=$("<span style='margin-left:5px;background:red;color:white;padding:3px 5px;'>关闭</span>");
		close.click(function(){
			$("#searchPanel").remove();
		});
		panel.append(close);
		
		panel.append("<div style='font-size:11px;color:gray;'>请输入关键字进行搜索</div>");
		$("body").append(panel);
		input.focus();
		
		$('#searchPanel').find("input").eq(0).bind('keyup',function(event) {
		    if (event.keyCode == "13"){
		    	search.click();
		    }
		});
	});
	$("body").append(s);
}
function addToDesk(){
	var alertDiv=$("<div style='position:fixed;background:rgba(243,242,242,0.9);display:none;width:80%;height:80%;'></div>");
	var header=$("<div style='padding:10px 0px;border-bottom:solid 1px lightgray;'></div>");
	var noShow=$("<span style='margin-left:10px;border:solid 1px lightgray;padding:3px;'>不再显示</span>");
	var close=$("<span style='border:solid 1px lightgray;padding:0px 5px;position:absolute;right:10px;'>关闭</span>");
	noShow.click(function(){
		alertDiv.remove();
		setCookie("noshowdest","1");
	});
	close.click(function(){
		alertDiv.remove();
	});
	header.append(noShow).append(close);
	alertDiv.append(header);
	if(window.location.href.indexOf("ios")==-1&&browser.versions.ios&&!browser.versions.weixin){
		alertDiv.append("<img style='width:100%;height:100%;' src='../images/ui/todesk.jpg'>");
		if(getCookie("noshowdest")!="1"){
			$("body").append(alertDiv);
			alertDiv.css({left:($(window).width()-alertDiv.width())/2+"px",bottom:"48px"}).fadeIn();
		}
	}
}
function fixDivWhenScroll(id,cssDefault,top){
	window.onload=function(){
        var oDiv = document.getElementById(id),
            H = (top||0),
            Y = oDiv;       
        while (Y) {
            H += Y.offsetTop; 
            Y = Y.offsetParent;
        }
        window.onscroll = function(){
            var s = document.body.scrollTop || document.documentElement.scrollTop;
            if(s>H) {
                oDiv.style = cssDefault+"position:fixed;top:"+(top||"0")+"px;";
            } else {
                oDiv.style = cssDefault;
            }
        }
    }
}
function openApp(imgUrl,title,description,url){
	var alertDiv=$("<div style='position:fixed;background:#f3f2f2;display:none;width:100%;'></div>");
	var table=$("<table style='width:100%;padding:10px 0px;'></table>");
	
	var tr=$("<tr></tr>");
	tr.append("<td><img style='margin-left:5px;width:50px;height:50px;border:none;vertical-align:top;' src='"+imgUrl+"'/></td>");
	tr.append("<td style='text-align:left;'><b>"+title+"</b><br/><span style='font-size:13px;'>"+description+"</span></td>");
	
	var button=$("<td style='text-align:right;padding-right:5px;'><span style='padding:5px 6px;border-radius:5px;background:red;color:white;text-align:right;vertical-align:middle;'>立即下载</span></td>");
	button.click(function(){
		window.location.href=url;
	});
	tr.append(button);
	table.append(tr);
	alertDiv.append(table);
	
	$("body").append(alertDiv);
	alertDiv.css({left:($(window).width()-alertDiv.width())/2+"px",bottom:"50px"}).fadeIn();
}
function getClipBoradText(){
	$("#keywords").on('click', function(e) {
		var pastedText = null;
		if (window.clipboardData && window.clipboardData.getData) { // IE
			pastedText = window.clipboardData.getData('Text');
		} else {
			pastedText = e.originalEvent.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
		}
		alert(pastedText);
	});
}
