/**
 * 
 */
var globalParam=new Map();
var baseDir="http://localhost:8080/Zjt";

var category=0;
var lotteryCategory=null;
var blueBigSmallBoundary=5;
var threeAreaBoundary=3;
var bigSmallBoundary=5;
var blueBigSmallBoundary=9;

function setParam(lotCategory){
	lotteryCategory=lotCategory;
}

function showParam(lotCategory){
	setParam(lotCategory);
	var div=$("<div style='font-size:12px;'></div>");
	if(category==0){
		div.append("【大数】"+bigSmallBoundary+"~"+"9");
    	div.append("<br/>").append("【小数】0"+"~"+(bigSmallBoundary-1));
	}else{
		
	}
	div.append("<br/>").append("【奇数】除以2余1的数");
	div.append("<br/>").append("【偶数】除以2余0的数");
	div.append("<br/>").append("【质数】除了1和它自身外，不能被其他自然数整除的数");
	div.append("<br/>").append("【合数】除了1和它自身外，还能被其他自然数整除的数");
	div.append("<br/>").append("【0路】除以3余数为0的数");
	div.append("<br/>").append("【1路】除以3余数为1的数");
	div.append("<br/>").append("【2路】除以3余数为2的数");
	
	if(category==0){
		div.append("<br/>").append("【1区】0、1、2、3");
    	div.append("<br/>").append("【2区】4、5、6");
    	div.append("<br/>").append("【3区】7、8、9");
	}else{
		
	}
	div.append("<br/>").append("【∞】数据大于等于1000，无参考意义");
	
	var alertDiv=$("<div style='position:fixed;left:0px;top:0px;background:#dddddd;width:98%;z-index:9999'></div>");
	var header=$("<div style='height:36px;line-height:36px;border-bottom:solid 1px lightgray;text-align:center;'>参数说明</div>");
	alertDiv.append(header);
	var body=$("<div style='padding:10px 2px;'></div>");
	alertDiv.append(body);
	body.append(div);
	var footer=$("<div style='height:36px;line-height:36px;border-bottom:solid 1px lightgray;text-align:center;color:blue;border-top:solid 1px white;font-size:14px;'>关闭</div>");
	footer.click(function(){
		alertDiv.remove();
	});
	alertDiv.append(footer);
	$("body").append(alertDiv);
	alertDiv.css({left:($(window).width()-alertDiv.width())/2+"px",top:($(window).height()-alertDiv.height())/2+"px"}).fadeIn();
	
}

var items=[{id:"index_page",text:"首页",cla:"menu",href:baseDir},
           {id:"apps_page",text:"手机客户端",cla:"menu",href:baseDir+"/html/apps.html"},
           {id:"newLottery_page",text:"开奖公告",cla:"menu",href:baseDir+"/html/newLottery.html"},
           {id:"news_page",text:"彩票资讯",cla:"menu",href:baseDir+"/html/news.html"},
           {id:"skills_page",text:"技巧专区",cla:"menu",href:baseDir+"/html/skills.html"},
           {id:"help_page",text:"帮助",cla:"menu",href:baseDir+"/html/help.html"}];


var aboutUsData=[{text:"软件介绍",url:baseDir+"/html/help.html?index=0"},{text:"广告服务",url:baseDir+"/html/help.html?index=1"},{text:"免责声明",url:baseDir+"/html/help.html?index=2"},{text:"常见问题",url:baseDir+"/html/help.html?index=3"},{text:"联系我们",url:baseDir+"/html/help.html?index=4"}];

var shengXiao=["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"];
function parseLotForM(lottery,ballClassName,productName){
	var lot=lottery.split(",");
    var lotNum=5;
    if(productName=="Magic3"||productName=="Quick3"){
        lotNum=3;
    }else if(productName=="Array5"){
        lotNum=5;
    }else if(productName.indexOf("Of")!=-1){
        var index=productName.indexOf("Of");
        lotNum=Number(productName.substr(index-1,1));
    }else if(productName.indexOf("kl10")!=-1){
       lotNum=8;
    }
    var div=$("<div></div>");
    var text;
    for(var i=0;i<lot.length;i++){
    	if(!(productName=="Tc14Sf_Tc"||productName=="TcAny9_Tc"||productName=="Tc4Score_Tc"||productName=="TcHalf6_Tc")){
    		if(i<lotNum){
                div.append("<span class='"+ballClassName+"'>"+lot[i]+"</span>");
            }else{
            	if(productName.indexOf("Fc6Of10")!=-1)
            		text=shengXiao[lot[i]-1];
            	else
            		text=lot[i];
            	div.append("<span class='"+ballClassName+"' style='background:blue;'>"+text+"</span>");
            }   
    	}else{
    		div.append("<span style='display:inline-block;margin-left:3px;width:12px;height:20px;line-height:20px;border-radius:2px;background:brown;color:white;font-size:14px;text-align:center;'>"+lot[i]+"</span>");
    	}
    }
    return div.children();
}

function makeMenu(){
	if(window.location.href.indexOf("android_app")==-1&&window.location.href.indexOf("ios_app")==-1){
		var menus=[{name:"home",text:"首页",img:"../images/ui/tab_home",url:"m_0.html"},{name:"hq",text:"开奖",img:"../images/ui/tab_zk",url:"m_1.html"},
		           {name:"tool",text:"缩水",img:"../images/ui/tab_bangdan",url:"m_2.html"},{name:"ziXun",text:"资讯",img:"../images/ui/tab_pinpai",url:"m_3.html"},
		           {name:"mime",text:"我的",img:"../images/ui/tab_more",url:"m_4.html"}];
		
		var tabBar=$("<div style='position:fixed;bottom:0px;padding:3px 0px 1px;background:#f5f5f5;width:100%;text-align:center;border-top:solid 1px lightgray;'></div>");
		var table=$("<table style='width:100%;'></table>");
		var tr=$("<tr></tr>");
		table.append(tr);
		for(var i=0;i<menus.length;i++){
			var menu=menus[i];
			var td=$("<td style='width:20%;vertical-align:top;'></td>").data(menu);
			var currentPage=false;
			if(window.location.href.indexOf(menu.url)!=-1){
				currentPage=true;
			}
			td.append("<img style='border:none;width:22px;height:21px;' src='"+(currentPage?menu.img+"_red":menu.img)+".png'/>");
			td.append("<div style='margin-top:-8px'><span style='font-size:11px;color:"+(currentPage?"red":"")+"'>"+menu.text+"</span></div>");
			td.click(function(){
                var menuUrl=$(this).data("url");
                var pp=window.location.href.split("?");
    			menuUrl=menuUrl+(pp.length==2?(menuUrl.indexOf("?")!=-1?"&":"?")+pp[1]:"");
				window.location.replace(menuUrl);
			});
			tr.append(td);
		}
		tabBar.append(table);
		$("body").append(tabBar);
	}
}

var logos={};
logos.Fc6Of33_Fc="ssq.png";
logos.Magic3_Fc3D="fc3d.png";
logos.Hd5Of15_Fc="hd5of15.png";
logos.Magic3_TcP3="pl3.png";
logos.Array5_Tc="pl5.png";
logos.Fc6Of10_Fc="l6j1.png";
logos.Fc7Of30_Fc="qlc.png";
logos.Tc5Of35_Tc="dlt.png";
logos.Ttl5Of22_Fc="ttl.png";
logos.Tc7Of10_Tc="s7.png";
logos.Tc14Sf_Tc="sf14.png";
logos.TcAny9_Tc="any9.png";
logos.Tc4Score_Tc="jq4.png";
logos.TcHalf6_Tc="score6.png";
logos.Fc4Of10_shangHai="ttc_4.png";
logos.Tc5Of20_Zj="zj5of20.png";
logos.Tc5Of20_heBei="he5of20.png";
logos.Ttl5Of22_fuJian="fj5of22.png";
logos.Ttl5Of22_heiLongJiang="hlj22_5.png";
logos.Ttl5Of22_heNan="zyfc22_5.png";
logos.Ttl5Of22_huBei="ctfc22_5.png";
logos.Tc6_1_Zj="tc6_1.png";
logos.Tc6_1_heiLongJiang="tc6_1.png";
logos.Fc5Of10_heBei="pl5.png";
logos.Fc7Of10_heBei="pl7.png";
logos.Tc4_1_haiNan="cp4_1.png";
logos.Ah5Of25_Fc="cp25_5.png";
logos.Fc5Of26_guangDong="cp26_5.png";
logos.Fc5Of30_huBei="cp30_5.png";
logos.Fc7Of36_guangDong="cp36_7.png";
logos.Fc7Of36_heiLongJiang="cp36_7.png";
logos.Tc7Of36_fuJian="cp36_7.png";
logos.Fc7Of35_liaoNing="cp35_7.png";
logos.Fc7Of35_xinJiang="cp35_7.png";
logos.Fc7Of35_shenZhun="cp35_7.png";
logos.Fc7Of18_xinJiang="cp18_7.png";
logos.Fc7Of25_xinJiang="cp25_7.png";
logos.Tc7Of31_fuJian="cp31_7.png";
logos.Tc7Of10_jiangSu="tc_7.png";
logos.P62_heiLongJiang="p62.png";
logos.Klsc_guangXi="klsc.png";
logos.Gdhc_guangDong="hc1.png";
logos.Hao2_heiBei="h2.png";
logos.Hao3_heiBei="h3.png";
logos.moreLot="morelot.png";
