function isZuLiuOrZuSan(arr){
			if(arr[0]==arr[1]&&arr[1]==arr[2]){
				return 1;
	}else if(arr[0]==arr[1]||arr[0]==arr[2]||arr[1]==arr[2]){
		return 2;
	}else{
		return 3;
	}
}
function zuZhiText(arr){
			if(arr[0]==arr[1]&&arr[1]==arr[2]){
				return "豹子";
	}else if(arr[0]==arr[1]||arr[0]==arr[2]||arr[1]==arr[2]){
		return "组三";
	}else{
		return "组六";
	}
}
function bigSmallRateText(arr,boundary){
	var _small=0,_big=0;
	for(var i=0;i<arr.length;i++){
		if(arr[i]<boundary){
			_small++;
		}else{
			_big++;
		}
	}
	return _big+":"+_small;
}
function oddEvenRateText(arr){
	var odd=0;
	var even=0;
	for(var i=0;i<arr.length;i++){
		if(arr[i]%2==0){
			even++;
		}else{
			odd++;
		}
	}
	return odd+":"+even;
}
function zhiHeRateText(arr){
	var zhiShu=0;
	var heShu=0;
	for(var i=0;i<arr.length;i++)	{
		if(arr[i]==1||arr[i]==2||arr[i]==3||arr[i]==5||arr[i]==7||arr[i]==11||arr[i]==13||arr[i]==17||arr[i]==19||arr[i]==23||arr[i]==29||arr[i]==31){
			zhiShu++;
		}else{
			heShu++;
		}
	}
	return zhiShu+":"+heShu;
}
function luShuRateText(arr){
	var lu0Num=0;
	var lu1Num=0;
	var lu2Num=0;
	for(var i=0;i<arr.length;i++){
		var tmp=arr[i]%3;
		if(tmp==0){
			lu0Num++;
		}else if(tmp==1){
			lu1Num++;
		}else{
			lu2Num++;
		}
	}
	return lu0Num+":"+lu1Num+":"+lu2Num;
}
function threeAreaRateText(arr,boundary){
	var _small=0,_middle=0,_big=0;
	var boundary0=boundary,boundary1=2*boundary;
	for(var i=0;i<arr.length;i++){
		if(arr[i]<=boundary0){
			_small++;
		}else if(arr[i]<=boundary1){
			_middle++;
		}else{
			_big++;
		}
	}
	return _small+":"+_middle+":"+_big;
}
function getSum(arr){
	var sum=0;
	for(var i=0;i<arr.length;i++){
		sum+=arr[i];
	}
	return sum;
}
function getSpan(arr){
	var max=arr[0],min=arr[0];
	for(var i=0;i<arr.length;i++){
		if(arr[i]>max){
			max=arr[i];
		}
		if (arr[i]<min){
			min=arr[i];
		}
	}
	return max-min;
}
function ssqBlue(blue,boundary){
	var dx=["小","大"];
	var oe=["偶","奇"];
	var lu=["0路码","1路码","2路码"];
	var _dx=parseInt(blue/(boundary==undefined?9:boundary));
	var _oe=blue%2;
	var _lu=blue%3;
	return dx[_dx]+""+oe[_oe]+"号，"+lu[_lu];
}
function arrayToString(a,split,category,showInList){
	var str="";
	var isFc6Of33_Fc=false;
	var isTc5Of35_Tc=false;
	if(lotteryCategory=="Fc6Of33_Fc"){
		isFc6Of33_Fc=true;
	}else if(lotteryCategory=="Tc5Of35_Tc"){
		isTc5Of35_Tc=true;
	}
	if(isFc6Of33_Fc){
		for(var i=0;i<a.length-1;i++){
			str+=(category==1&&a[i]<10?"0"+a[i]:a[i])+split;
		}
		if(""!=split){
			str=str.substring(0,str.length-1);
		}
		str+=(showInList?"<span style='color:gray'>+</span>":"+");
		var blue=a[a.length-1];
		str+=(showInList?"<span style='color:blue'>"+(blue<10?"0"+blue:blue)+"</span>":(blue<10?"0"+blue:blue));
		return str;
	}else if(isTc5Of35_Tc){
		for(var i=0;i<a.length-2;i++){
			str+=(category==1&&a[i]<10?"0"+a[i]:a[i])+split;
		}
		if(""!=split){
			str=str.substring(0,str.length-1);
		}
		str+=(showInList?"<span style='color:gray'>+</span>":"+");
		var blue1=a[a.length-2];
		var blue2=a[a.length-1];
		str+=(showInList?"<span style='color:blue'>"+(blue1<10?"0"+blue1:blue1)+"</span>":(blue1<10?"0"+blue1:blue1));
		str+=" ";
		str+=(showInList?"<span style='color:blue'>"+(blue2<10?"0"+blue2:blue1)+"</span>":(blue2<10?"0"+blue2:blue2));
	}else{
		for(var i=0;i<a.length;i++){
			str+=(category==1&&a[i]<10?"0"+a[i]:a[i])+split;
		}
		if(""!=split){
			str=str.substring(0, str.length-1);
		}
	}
	return str;
}

function arrayToStr(a,split,category){
	var str="";
	for(var i=0;i<a.length;i++){
		str+=(category==1&&a[i]<10?"0"+a[i]:a[i])+split;
	}
	if(""!=split){
		str=str.substring(0, str.length-1);
	}
	return str;
}