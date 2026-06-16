function debug(obj){
    alert(JSON.stringify(obj));
}
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

function setHeadWidth(head){
	var colNum=0;
	for(var i=0;i<head.length;i++){
		var row0=head[i];
		if(row0.children){
			for(var j=0;j<row0.children.length;j++){
				colNum++;
			}
		}else{
			colNum++;
		}
	}
	var w=(document.body.clientWidth-2*0)/colNum;
	for(var i=0;i<head.length;i++){
		var row0=head[i];
		if(row0.children){
			for(var j=0;j<row0.children.length;j++){
				row0.children[j].width=w;
			}
		}else{
			row0.width=w;
		}
	}
}

function createBaseHead(){
	var head;
	if(href.lotteryCategory.indexOf("Magic3")!=-1||href.lotteryCategory.indexOf("star3")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
	         {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
	         {field:"shape",title:"类型",colSpan:2,rowSpan:1,children:[{field:"shape",title:"类型",width:30},{field:"sameNum",title:"同号",width:30}]},
	         {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
	         {field:"span",title:"跨度",colSpan:1,rowSpan:2,width:30},
	         {field:"shapeRate",title:"形态比",colSpan:5,rowSpan:1,children:[{field:"bigSmallRate",title:"大小比",width:45},{field:"oddEvenRate",title:"奇偶比",width:45},{field:"zhiHeRate",title:"质合比",width:45},{field:"luShuRate",title:"012路比",width:45},{field:"threeAreaRate",title:"三区比",width:45}]},
	         ];
	}else if(href.lotteryCategory.indexOf("Quick3")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:50},
		         {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
		         {field:"shape",title:"类型",colSpan:2,rowSpan:1,children:[{field:"shape",title:"类型",width:30},{field:"sameNum",title:"同号",width:30}]},
		         {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		         {field:"span",title:"跨度",colSpan:1,rowSpan:2,width:30},
		         {field:"shapeRate",title:"形态比",colSpan:5,rowSpan:1,children:[{field:"bigSmallRate",title:"大小比",width:45},{field:"oddEvenRate",title:"奇偶比",width:45},{field:"zhiHeRate",title:"质合比",width:45},{field:"luShuRate",title:"012路比",width:45},{field:"threeAreaRate",title:"三区比",width:45}]},
		         ];
		}else if(href.lotteryCategory.indexOf("Fc6Of33")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
	         {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:130},
	         {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
	         {field:"span",title:"跨度",colSpan:1,rowSpan:2,width:30},
	         {field:"shapeRate",title:"形态比",colSpan:5,rowSpan:1,children:[{field:"bigSmallRate",title:"大小比",width:45},{field:"oddEvenRate",title:"奇偶比",width:45},{field:"zhiHeRate",title:"质合比",width:45},{field:"luShuRate",title:"012路比",width:45},{field:"threeAreaRate",title:"三区比",width:45}]},
	         ];
	}else if(href.lotteryCategory.indexOf("Fc7Of30")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
	         {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:155},
	         {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
	         {field:"span",title:"跨度",colSpan:1,rowSpan:2,width:30},
	         {field:"shapeRate",title:"形态比",colSpan:5,rowSpan:1,children:[{field:"bigSmallRate",title:"大小比",width:45},{field:"oddEvenRate",title:"奇偶比",width:45},{field:"zhiHeRate",title:"质合比",width:45},{field:"luShuRate",title:"012路比",width:45},{field:"threeAreaRate",title:"三区比",width:45}]},
	         ];
	}else if(href.lotteryCategory.indexOf("Tc5Of35")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		         {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:155},
		         {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		         {field:"span",title:"跨度",colSpan:1,rowSpan:2,width:30},
		         {field:"shapeRate",title:"形态比",colSpan:5,rowSpan:1,children:[{field:"bigSmallRate",title:"大小比",width:45},{field:"oddEvenRate",title:"奇偶比",width:45},{field:"zhiHeRate",title:"质合比",width:45},{field:"luShuRate",title:"012路比",width:45},{field:"threeAreaRate",title:"三区比",width:45}]},
		         ];
	}else if(href.lotteryCategory.indexOf("Array5")!=-1||href.lotteryCategory.indexOf("star5")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		         {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:55},
		         {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		         {field:"span",title:"跨度",colSpan:1,rowSpan:2,width:30},
		         {field:"shapeRate",title:"形态比",colSpan:5,rowSpan:1,children:[{field:"bigSmallRate",title:"大小比",width:45},{field:"oddEvenRate",title:"奇偶比",width:45},{field:"zhiHeRate",title:"质合比",width:45},{field:"luShuRate",title:"012路比",width:45},{field:"threeAreaRate",title:"三区比",width:45}]},
		         ];
	}else if(href.lotteryCategory.indexOf("Tc7Of10")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		         {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:80},
		         {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		         {field:"span",title:"跨度",colSpan:1,rowSpan:2,width:30},
		         {field:"shapeRate",title:"形态比",colSpan:5,rowSpan:1,children:[{field:"bigSmallRate",title:"大小比",width:45},{field:"oddEvenRate",title:"奇偶比",width:45},{field:"zhiHeRate",title:"质合比",width:45},{field:"luShuRate",title:"012路比",width:45},{field:"threeAreaRate",title:"三区比",width:45}]},
		         ];
	}else if(href.lotteryCategory.indexOf("5Of11")!=-1&&href.lotteryCategory.indexOf("ahead")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		         {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:60},
		         {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		         {field:"span",title:"跨度",colSpan:1,rowSpan:2,width:30},
		         {field:"shapeRate",title:"形态比",colSpan:5,rowSpan:1,children:[{field:"bigSmallRate",title:"大小比",width:45},{field:"oddEvenRate",title:"奇偶比",width:45},{field:"zhiHeRate",title:"质合比",width:45},{field:"luShuRate",title:"012路比",width:45},{field:"threeAreaRate",title:"三区比",width:45}]},
		         ];
	}else if(href.lotteryCategory.indexOf("Hd5Of15")!=-1||href.lotteryCategory.indexOf("5Of22")!=-1||href.lotteryCategory.indexOf("5Of20")!=-1||href.lotteryCategory.indexOf("5Of11")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		         {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:100},
		         {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		         {field:"span",title:"跨度",colSpan:1,rowSpan:2,width:30},
		         {field:"shapeRate",title:"形态比",colSpan:5,rowSpan:1,children:[{field:"bigSmallRate",title:"大小比",width:45},{field:"oddEvenRate",title:"奇偶比",width:45},{field:"zhiHeRate",title:"质合比",width:45},{field:"luShuRate",title:"012路比",width:45},{field:"threeAreaRate",title:"三区比",width:45}]},
		         ];
	}
	
	return head;
}
function createNumDistriHead(){
	var head;
	if(href.lotteryCategory.indexOf("Magic3")!=-1||href.lotteryCategory.indexOf("star3")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
         {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:40},
         {field:"shape",title:"类型",colSpan:2,rowSpan:1,children:[{field:"shape",title:"类型",width:40},{field:"sameNum",title:"同号",width:40}]},
         {field:"area0",title:"一区",colSpan:4,rowSpan:1,children:[{field:"pos0",title:"0",width:26},{field:"pos1",title:"1",width:26},{field:"pos2",title:"2",width:26},{field:"pos3",title:"3",width:26}]},
         {field:"area1",title:"二区",colSpan:3,rowSpan:1,children:[{field:"pos4",title:"4",width:26},{field:"pos5",title:"5",width:26},{field:"pos6",title:"6",width:26}]},
         {field:"area2",title:"三区",colSpan:3,rowSpan:1,children:[{field:"pos7",title:"7",width:26},{field:"pos8",title:"8",width:26},{field:"pos9",title:"9",width:26}]},
         ];
	}else if(href.lotteryCategory.indexOf("Quick3")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:50},
		         {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:40},
		         {field:"shape",title:"类型",colSpan:2,rowSpan:1,children:[{field:"shape",title:"类型",width:40},{field:"sameNum",title:"同号",width:40}]},
		         {field:"area0",title:"一区",colSpan:2,rowSpan:1,children:[{field:"pos0",title:"1",width:26},{field:"pos1",title:"2",width:26}]},
		         {field:"area1",title:"二区",colSpan:2,rowSpan:1,children:[{field:"pos2",title:"3",width:26},{field:"pos3",title:"4",width:26}]},
		         {field:"area2",title:"三区",colSpan:2,rowSpan:1,children:[{field:"pos4",title:"5",width:26},{field:"pos5",title:"6",width:26}]},
		         ];
			}else if(href.lotteryCategory.indexOf("Fc6Of33")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:130},
		      {field:"area0",title:"一区",colSpan:11,rowSpan:1,children:[]},
		      {field:"area1",title:"二区",colSpan:11,rowSpan:1,children:[]},
		      {field:"area2",title:"三区",colSpan:11,rowSpan:1,children:[]},
		      ];
		for(var i=0;i<11;i++){
			head[2].children.push({field:"pos"+i,title:i+1,width:20});
			head[3].children.push({field:"pos"+(11+i),title:i+12,width:20});
			head[4].children.push({field:"pos"+(22+i),title:i+23,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Fc7Of30")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:155},
		      {field:"area0",title:"一区",colSpan:10,rowSpan:1,children:[]},
		      {field:"area1",title:"二区",colSpan:10,rowSpan:1,children:[]},
		      {field:"area2",title:"三区",colSpan:10,rowSpan:1,children:[]},
		      ];
		for(var i=0;i<10;i++){
			head[2].children.push({field:"pos"+i,title:i+1,width:20});
			head[3].children.push({field:"pos"+(10+i),title:i+11,width:20});
			head[4].children.push({field:"pos"+(20+i),title:i+21,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Tc5Of35")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:155},
		      {field:"area0",title:"一区",colSpan:12,rowSpan:1,children:[]},
		      {field:"area1",title:"二区",colSpan:12,rowSpan:1,children:[]},
		      {field:"area2",title:"三区",colSpan:11,rowSpan:1,children:[]},
		      ];
		for(var i=0;i<12;i++){
			head[2].children.push({field:"pos"+i,title:i+1,width:20});
			head[3].children.push({field:"pos"+(12+i),title:i+13,width:20});
			if(i<11)
				head[4].children.push({field:"pos"+(24+i),title:i+25,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Array5")!=-1||href.lotteryCategory.indexOf("star5")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		         {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:55},
		         {field:"differNum",title:"0~9开出(个)",colSpan:1,rowSpan:2,width:30},
		         {field:"sameNum",title:"同号",colSpan:1,rowSpan:2,width:30},
		         {field:"area0",title:"一区",colSpan:4,rowSpan:1,children:[{field:"pos0",title:"0",width:28},{field:"pos1",title:"1",width:28},{field:"pos2",title:"2",width:28},{field:"pos3",title:"3",width:28}]},
		         {field:"area1",title:"二区",colSpan:3,rowSpan:1,children:[{field:"pos4",title:"4",width:28},{field:"pos5",title:"5",width:28},{field:"pos6",title:"6",width:28}]},
		         {field:"area2",title:"三区",colSpan:3,rowSpan:1,children:[{field:"pos7",title:"7",width:28},{field:"pos8",title:"8",width:28},{field:"pos9",title:"9",width:28}]},
		         ];
	}else if(href.lotteryCategory.indexOf("Tc7Of10")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		         {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:80},
		         {field:"differNum",title:"0~9开出(个)",colSpan:1,rowSpan:2,width:30},
		         {field:"sameNum",title:"同号",colSpan:1,rowSpan:2,width:30},
		         {field:"area0",title:"一区",colSpan:4,rowSpan:1,children:[{field:"pos0",title:"0",width:28},{field:"pos1",title:"1",width:28},{field:"pos2",title:"2",width:28},{field:"pos3",title:"3",width:28}]},
		         {field:"area1",title:"二区",colSpan:3,rowSpan:1,children:[{field:"pos4",title:"4",width:28},{field:"pos5",title:"5",width:28},{field:"pos6",title:"6",width:28}]},
		         {field:"area2",title:"三区",colSpan:3,rowSpan:1,children:[{field:"pos7",title:"7",width:28},{field:"pos8",title:"8",width:28},{field:"pos9",title:"9",width:28}]},
		         ];
	}else if(href.lotteryCategory.indexOf("5Of11")!=-1&&href.lotteryCategory.indexOf("ahead")!=-1){
		var num=11;
		if(num==11){
			areaNum12=4;
			areaNum3=3;
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:60},
		      {field:"area0",title:"一区",colSpan:areaNum12,rowSpan:1,children:[]},
		      {field:"area1",title:"二区",colSpan:areaNum12,rowSpan:1,children:[]},
		      {field:"area2",title:"三区",colSpan:areaNum3,rowSpan:1,children:[]},
		      ];
		for(var i=0;i<areaNum12;i++){
			head[2].children.push({field:"pos"+i,title:i+1,width:20});
			head[3].children.push({field:"pos"+(areaNum12+i),title:i+areaNum12+1,width:20});
		}
		for(var i=0;i<areaNum3;i++){
			head[4].children.push({field:"pos"+(2*areaNum12+i),title:i+2*areaNum12+1,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Hd5Of15")!=-1||href.lotteryCategory.indexOf("5Of22")!=-1||href.lotteryCategory.indexOf("5Of20")!=-1||href.lotteryCategory.indexOf("5Of11")!=-1){
		var num=15;
		var s=href.lotteryCategory.indexOf("Of");
		num=Number(href.lotteryCategory.substr(s+2,2));
		var areaNum12=5,areaNum3=5;//1、2区号码个数，3区号码个数
		if(num==20||num==22){
			areaNum12=7;
		}
		if(num==20){
			areaNum3=6;
		}else if(num==22){
			areaNum3=8;
		}
		if(num==11){
			areaNum12=4;
			areaNum3=3;
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:100},
		      {field:"area0",title:"一区",colSpan:areaNum12,rowSpan:1,children:[]},
		      {field:"area1",title:"二区",colSpan:areaNum12,rowSpan:1,children:[]},
		      {field:"area2",title:"三区",colSpan:areaNum3,rowSpan:1,children:[]},
		      ];
		for(var i=0;i<areaNum12;i++){
			head[2].children.push({field:"pos"+i,title:i+1,width:20});
			head[3].children.push({field:"pos"+(areaNum12+i),title:i+areaNum12+1,width:20});
		}
		for(var i=0;i<areaNum3;i++){
			head[4].children.push({field:"pos"+(2*areaNum12+i),title:i+2*areaNum12+1,width:20});
		}
	}
	return head;
}

function createBlueHead(){
	var head;
	if(href.lotteryCategory.indexOf("Fc6Of33")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:130},
		      {field:"oddEven",title:"大小",colSpan:1,rowSpan:2,width:30},
		      {field:"bigSmall",title:"奇偶",colSpan:1,rowSpan:2,width:30},
		      {field:"area0",title:"一区",colSpan:8,rowSpan:1,children:[]},
		      {field:"area1",title:"二区",colSpan:8,rowSpan:1,children:[]}
		      ];
		for(var i=0;i<8;i++){
			head[4].children.push({field:"pos"+i,title:i+1,width:20});
			head[5].children.push({field:"pos"+(8+i),title:i+9,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Fc7Of30")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:155},
		     // {field:"oddEven",title:"大小",colSpan:1,rowSpan:2,width:30},
		    //  {field:"bigSmall",title:"奇偶",colSpan:1,rowSpan:2,width:30},
		      {field:"area0",title:"一区",colSpan:10,rowSpan:1,children:[]},
		      {field:"area1",title:"二区",colSpan:10,rowSpan:1,children:[]},
		      {field:"area2",title:"三区",colSpan:10,rowSpan:1,children:[]}
		      ];
		for(var i=0;i<10;i++){
			head[2].children.push({field:"pos"+i,title:i+1,width:20});
			head[3].children.push({field:"pos"+(10+i),title:i+11,width:20});
			head[4].children.push({field:"pos"+(20+i),title:i+21,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Tc5Of35")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:155},
		      {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		      {field:"span",title:"跨度",colSpan:1,rowSpan:2,width:30},
		      {field:"oddEvenRate",title:"奇偶比",colSpan:1,rowSpan:2,width:30},
		      {field:"area0",title:"一区",colSpan:6,rowSpan:1,children:[]},
		      {field:"area1",title:"二区",colSpan:6,rowSpan:1,children:[]}
		      ];
		for(var i=0;i<6;i++){
			head[5].children.push({field:"pos"+i,title:i+1,width:20});
			head[6].children.push({field:"pos"+(6+i),title:i+7,width:20});
		}
	}
	return head;
}


function createPosHead(posI,lotteyCategory){
	var head;
	if(href.lotteryCategory.indexOf("Magic3")!=-1||href.lotteryCategory.indexOf("star3")!=-1){
		var title=["百位分布","十位分布","个位分布"];
		var pos={field:"pos"+posI,title:"",colSpan:10,rowSpan:1,children:[]};
		if(lotteyCategory.indexOf("Magic3")!=-1){
			pos.title=title[posI];
		}
		for(var i=0;i<10;i++){
			var field={field:"pos"+posI+i,title:i,colSpan:1,rowSpan:1,width:26};
			pos.children.push(field);
		}
		var head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:30},
		          {field:"weiLot",title:"号码",colSpan:1,rowSpan:2,width:30},
		          pos,
		          {field:"character",title:"形态特征",colSpan:5,rowSpan:1,children:[{field:"bigSmall",title:"大小",width:26},{field:"oddEven",title:"奇偶",width:26},{field:"zhiHe",title:"质合",width:26},{field:"luShu",title:"0l2路",width:26},{field:"threeArea",title:"三区",width:26}]}
		          ];
	}else if(href.lotteryCategory.indexOf("Quick3")!=-1){
		var title=["百位分布","十位分布","个位分布"];
		var pos={field:"pos"+posI,title:"",colSpan:6,rowSpan:1,children:[]};
		for(var i=0;i<6;i++){
			var field={field:"pos"+posI+i,title:i+1,colSpan:1,rowSpan:1,width:26};
			pos.children.push(field);
		}
		var head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:50},
		          {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:30},
		          {field:"weiLot",title:"号码",colSpan:1,rowSpan:2,width:30},
		          pos,
		          {field:"character",title:"形态特征",colSpan:5,rowSpan:1,children:[{field:"bigSmall",title:"大小",width:26},{field:"oddEven",title:"奇偶",width:26},{field:"zhiHe",title:"质合",width:26},{field:"luShu",title:"0l2路",width:26},{field:"threeArea",title:"三区",width:26}]}
		          ];
	}else if(href.lotteryCategory.indexOf("Fc6Of33")!=-1){
		var t=["一","二","三","四","五","六"];
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		   //   {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130},
		      {field:"weiLot",title:"号码",colSpan:1,rowSpan:2,width:30},
		      {field:"pos"+posI,title:"红"+t[posI],colSpan:28,rowSpan:1,children:[]},
		      {field:"character",title:"形态特征",colSpan:5,rowSpan:1,children:[{field:"bigSmall",title:"大小",width:30},{field:"oddEven",title:"奇偶",width:30},{field:"zhiHe",title:"质合",width:30},{field:"luShu",title:"0l2路",width:30},{field:"threeArea",title:"三区",width:30}]}
		      ];
		for(var i=0;i<28;i++){
			head[2].children.push({field:"pos"+posI+i,title:i+1+Number(posI),width:20});
		}
	}else if(href.lotteryCategory.indexOf("Fc7Of30")!=-1){
		var t=["一","二","三","四","五","六","七"];
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		   //   {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130},
		      {field:"weiLot",title:"号码",colSpan:1,rowSpan:2,width:30},
		      {field:"pos"+posI,title:"红"+t[posI],colSpan:24,rowSpan:1,children:[]},
		      {field:"character",title:"形态特征",colSpan:5,rowSpan:1,children:[{field:"bigSmall",title:"大小",width:30},{field:"oddEven",title:"奇偶",width:30},{field:"zhiHe",title:"质合",width:30},{field:"luShu",title:"0l2路",width:30},{field:"threeArea",title:"三区",width:30}]}
		      ];
		for(var i=0;i<24;i++){
			head[2].children.push({field:"pos"+posI+i,title:i+1+Number(posI),width:20});
		}
	}else if(href.lotteryCategory.indexOf("Tc5Of35")!=-1){
		var t=["一","二","三","四","五"];
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		   //   {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130},
		      {field:"weiLot",title:"号码",colSpan:1,rowSpan:2,width:30},
		      {field:"pos"+posI,title:"前"+t[posI],colSpan:31,rowSpan:1,children:[]},
		      {field:"character",title:"形态特征",colSpan:5,rowSpan:1,children:[{field:"bigSmall",title:"大小",width:30},{field:"oddEven",title:"奇偶",width:30},{field:"zhiHe",title:"质合",width:30},{field:"luShu",title:"0l2路",width:30},{field:"threeArea",title:"三区",width:30}]}
		      ];
		for(var i=0;i<31;i++){
			head[2].children.push({field:"pos"+posI+i,title:i+1+Number(posI),width:20});
		}
	}else if(href.lotteryCategory.indexOf("Array5")!=-1||href.lotteryCategory.indexOf("star5")!=-1){
		var title=["万位分布","千位分布","百位分布","十位分布","个位分布"];
		var pos={field:"pos"+posI,title:"",colSpan:10,rowSpan:1,children:[]};
		pos.title=title[posI];
		for(var i=0;i<10;i++){
			var field={field:"pos"+posI+i,title:i,colSpan:1,rowSpan:1,width:26};
			pos.children.push(field);
		}
		var head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,rowSpan:2,width:55},
		          {field:"weiLot",title:"号码",colSpan:1,rowSpan:2,rowSpan:2,width:30},
		          pos,
		          {field:"character",title:"形态特征",colSpan:5,rowSpan:1,children:[{field:"bigSmall",title:"大小",width:30},{field:"oddEven",title:"奇偶",width:30},{field:"zhiHe",title:"质合",width:30},{field:"luShu",title:"0l2路",width:30},{field:"threeArea",title:"三区",width:30}]}
		          ];
	}else if(href.lotteryCategory.indexOf("Tc7Of10")!=-1){
		var title=["定位(1)","定位(2)","定位(3)","定位(4)","定位(5)","定位(6)","定位(7)"];
		var pos={field:"pos"+posI,title:"",colSpan:10,rowSpan:1,children:[]};
		pos.title=title[posI];
		for(var i=0;i<10;i++){
			var field={field:"pos"+posI+i,title:i,colSpan:1,rowSpan:1,width:26};
			pos.children.push(field);
		}
		var head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,rowSpan:2,width:80},
		          {field:"weiLot",title:"号码",colSpan:1,rowSpan:2,rowSpan:2,width:30},
		          pos,
		          {field:"character",title:"形态特征",colSpan:5,rowSpan:1,children:[{field:"bigSmall",title:"大小",width:30},{field:"oddEven",title:"奇偶",width:30},{field:"zhiHe",title:"质合",width:30},{field:"luShu",title:"0l2路",width:30},{field:"threeArea",title:"三区",width:30}]}
		          ];
	}else if(href.lotteryCategory.indexOf("5Of11")!=-1&&href.lotteryCategory.indexOf("ahead")!=-1){
		var num=11;
		var s=href.lotteryCategory.indexOf("Of");
		num=Number(href.lotteryCategory.substr(s+2,2));
		var t=["定位(1)","定位(2)","定位(3)"];
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		   //   {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130},
		      {field:"weiLot",title:"号码",colSpan:1,rowSpan:2,width:30},
		      {field:"pos"+posI,title:t[posI],colSpan:num,rowSpan:1,children:[]},
		      {field:"character",title:"形态特征",colSpan:5,rowSpan:1,children:[{field:"bigSmall",title:"大小",width:30},{field:"oddEven",title:"奇偶",width:30},{field:"zhiHe",title:"质合",width:30},{field:"luShu",title:"0l2路",width:30},{field:"threeArea",title:"三区",width:30}]}
		      ];
		for(var i=0;i<num;i++){
			head[2].children.push({field:"pos"+posI+i,title:i+1,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Hd5Of15")!=-1||href.lotteryCategory.indexOf("5Of22")!=-1||href.lotteryCategory.indexOf("5Of20")!=-1||href.lotteryCategory.indexOf("5Of11")!=-1){
		var num=15;
		var s=href.lotteryCategory.indexOf("Of");
		num=Number(href.lotteryCategory.substr(s+2,2));
		var t=["定位(1)","定位(2)","定位(3)","定位(4)","定位(5)"];
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		   //   {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130},
		      {field:"weiLot",title:"号码",colSpan:1,rowSpan:2,width:30},
		      {field:"pos"+posI,title:t[posI],colSpan:num-4,rowSpan:1,children:[]},
		      {field:"character",title:"形态特征",colSpan:5,rowSpan:1,children:[{field:"bigSmall",title:"大小",width:30},{field:"oddEven",title:"奇偶",width:30},{field:"zhiHe",title:"质合",width:30},{field:"luShu",title:"0l2路",width:30},{field:"threeArea",title:"三区",width:30}]}
		      ];
		for(var i=0;i<num-4;i++){
			head[2].children.push({field:"pos"+posI+i,title:i+1+Number(posI),width:20});
		}
	}
	return head;
}
function createHeZhiHead(lotteyCategory){
	var head;
	if(href.lotteryCategory.indexOf("Magic3")!=-1||href.lotteryCategory.indexOf("star3")!=-1){
		var pos={field:"heZhi",title:"和值分布",colSpan:28,rowSpan:1,children:[]};
		
		for(var i=0;i<28;i++){
			var field={field:"sum"+i,title:i,colSpan:1,rowSpan:1,width:26};
			pos.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
		          {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		          pos,
		          {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30},
		          ];
	}else if(href.lotteryCategory.indexOf("Quick3")!=-1){
		var pos={field:"heZhi",title:"和值分布",colSpan:16,rowSpan:1,children:[]};
		for(var i=0;i<16;i++){
			var field={field:"sum"+i,title:i+3,colSpan:1,rowSpan:1,width:26};
			pos.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:50},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
		          {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		          pos,
		          {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30},
		          ];
	}else if(href.lotteryCategory.indexOf("5Of11")!=-1&&href.lotteryCategory.indexOf("ahead")!=-1){
		var heNum=19,smallest=3;
		if(href.lotteryCategory.indexOf("ahead3")!=-1){
			heNum=25;
			smallest=6;
		}
		var pos={field:"heZhi",title:"和值分布",colSpan:heNum,rowSpan:1,children:[]};
		for(var i=0;i<heNum;i++){
			var field={field:"sum"+i,title:smallest+i,colSpan:1,rowSpan:1,width:26};
			pos.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:60},
		          {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		          pos,
		          {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30},
		          ];
	}else if(href.lotteryCategory.indexOf("5Of11")!=-1){
		var pos={field:"heZhi",title:"和值分布",colSpan:31,rowSpan:1,children:[]};
		
		for(var i=0;i<31;i++){
			var field={field:"sum"+i,title:15+i,colSpan:1,rowSpan:1,width:26};
			pos.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:100},
		          {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		          pos,
		          {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30},
		          ];
	}else if(href.lotteryCategory.indexOf("Fc6Of33")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130},
		      {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		      {field:"heZhi",title:"和值分布",colSpan:11,rowSpan:1,children:[{field:"sum0",title:"21-35",width:60},{field:"sum1",title:"36-50",width:60},{field:"sum2",title:"51-65",width:60},{field:"sum3",title:"66-80",width:60},{field:"sum4",title:"81-95",width:60},{field:"sum5",title:"96-110",width:60},{field:"sum6",title:"111-125",width:60},{field:"sum7",title:"126-140",width:60},{field:"sum8",title:"141-155",width:60},{field:"sum9",title:"156-170",width:60},{field:"sum10",title:"171-183",width:60}]},
		      {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30}
		      ];
	}else if(href.lotteryCategory.indexOf("Fc7Of30")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:155},
		      {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		      {field:"heZhi",title:"和值分布",colSpan:10,rowSpan:1,children:[{field:"sum0",title:"28-42",width:60},{field:"sum1",title:"43-57",width:60},{field:"sum2",title:"58-72",width:60},{field:"sum3",title:"73-87",width:60},{field:"sum4",title:"103-117",width:60},{field:"sum5",title:"118-132",width:60},{field:"sum6",title:"133-147",width:60},{field:"sum7",title:"148-162",width:60},{field:"sum8",title:"163-177",width:60},{field:"sum9",title:"178-189",width:60}]},
		      {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30}
		      ];
	}else if(href.lotteryCategory.indexOf("Tc5Of35")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:155},
		      {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		      {field:"heZhi",title:"和值分布",colSpan:10,rowSpan:1,children:[{field:"sum0",title:"15-29",width:60},{field:"sum1",title:"30-44",width:60},{field:"sum2",title:"45-59",width:60},{field:"sum3",title:"60-74",width:60},{field:"sum4",title:"75-89",width:60},{field:"sum5",title:"90-104",width:60},{field:"sum6",title:"105-119",width:60},{field:"sum7",title:"120-134",width:60},{field:"sum8",title:"135-149",width:60},{field:"sum9",title:"150-165",width:60}]},
		      {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30}
		      ];
	}else if(href.lotteryCategory.indexOf("Array5")!=-1||href.lotteryCategory.indexOf("star5")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:55},
		      {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		      {field:"heZhi",title:"和值分布",colSpan:9,rowSpan:1,children:[{field:"sum0",title:"0-4",width:40},{field:"sum1",title:"5-9",width:40},{field:"sum2",title:"10-14",width:40},{field:"sum3",title:"15-19",width:40},{field:"sum4",title:"20-24",width:40},{field:"sum5",title:"25-29",width:40},{field:"sum6",title:"30-34",width:40},{field:"sum7",title:"35-39",width:40},{field:"sum8",title:"40-45",width:40}]},
		      {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30}
		      ];
	}else if(href.lotteryCategory.indexOf("Tc7Of10")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:80},
		      {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		      {field:"heZhi",title:"和值分布",colSpan:13,rowSpan:1,children:[{field:"sum0",title:"0-4",width:40},{field:"sum1",title:"5-9",width:40},{field:"sum2",title:"10-14",width:40},{field:"sum3",title:"15-19",width:40},{field:"sum4",title:"20-24",width:40},{field:"sum5",title:"25-29",width:40},{field:"sum6",title:"30-34",width:40},{field:"sum7",title:"35-39",width:40},{field:"sum8",title:"40-44",width:40},{field:"sum9",title:"45-49",width:40},{field:"sum10",title:"50-54",width:40},{field:"sum11",title:"55-59",width:40},{field:"sum8",title:"60-63",width:40}]},
		      {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30}
		      ];
	}else if(href.lotteryCategory.indexOf("Hd5Of15")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:100},
		      {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		      {field:"heZhi",title:"和值分布",colSpan:10,rowSpan:1,children:[{field:"sum0",title:"15-19",width:60},{field:"sum1",title:"20-24",width:60},{field:"sum2",title:"25-29",width:60},{field:"sum3",title:"30-34",width:60},{field:"sum4",title:"35-39",width:60},{field:"sum5",title:"40-44",width:60},{field:"sum6",title:"45-49",width:60},{field:"sum7",title:"50-54",width:60},{field:"sum8",title:"55-59",width:60},{field:"sum9",title:"60-65",width:60}]},
		      {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30}
		      ];
	}else if(href.lotteryCategory.indexOf("5Of22")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:100},
		      {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		      {field:"heZhi",title:"和值分布",colSpan:11,rowSpan:1,children:[{field:"sum0",title:"15-22",width:60},{field:"sum1",title:"23-30",width:60},{field:"sum2",title:"31-38",width:60},{field:"sum3",title:"39-46",width:60},{field:"sum4",title:"47-54",width:60},{field:"sum5",title:"55-62",width:60},{field:"sum6",title:"63-70",width:60},{field:"sum7",title:"71-78",width:60},{field:"sum8",title:"79-86",width:60},{field:"sum9",title:"87-94",width:60},{field:"sum10",title:"95-100",width:60}]},
		      {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30}
		      ];
	}else if(href.lotteryCategory.indexOf("5Of20")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:100},
		      {field:"sum",title:"和值",colSpan:1,rowSpan:2,width:30},
		      {field:"heZhi",title:"和值分布",colSpan:11,rowSpan:1,children:[{field:"sum0",title:"15-21",width:60},{field:"sum1",title:"22-28",width:60},{field:"sum2",title:"29-35",width:60},{field:"sum3",title:"36-42",width:60},{field:"sum4",title:"43-49",width:60},{field:"sum5",title:"50-56",width:60},{field:"sum6",title:"57-63",width:60},{field:"sum7",title:"64-70",width:60},{field:"sum8",title:"71-77",width:60},{field:"sum9",title:"78-84",width:60},{field:"sum10",title:"85-90",width:60}]},
		      {field:"sumTail",title:"和尾",colSpan:1,rowSpan:2,width:30}
		      ];
	}
	
	return head;
}
function createKuaDuHead(lotteyCategory){
	var head;
	if(href.lotteryCategory.indexOf("Magic3")!=-1||href.lotteryCategory.indexOf("star3")!=-1){
		var pos={field:"span",title:"跨度分布",colSpan:10,rowSpan:1,children:[]};
		
		for(var i=0;i<10;i++){
			var field={field:"span"+i,title:i,colSpan:1,rowSpan:1,width:26};
			pos.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
		          {field:"kuaDu",title:"跨度",colSpan:1,rowSpan:2,width:30},
		          {field:"maxMin",title:"极值",colSpan:2,rowSpan:1,children:[{field:"minNum",title:"最小",width:30},{field:"maxNum",title:"最大",width:30}]},
		          pos,
		          {field:"lingHaoLag",title:"邻最大距",colSpan:1,rowSpan:2,width:30},
		          ];
	}else if(href.lotteryCategory.indexOf("Quick3")!=-1){
		var pos={field:"span",title:"跨度分布",colSpan:6,rowSpan:1,children:[]};
		for(var i=0;i<6;i++){
			var field={field:"span"+i,title:i,colSpan:1,rowSpan:1,width:26};
			pos.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:50},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
		          {field:"kuaDu",title:"跨度",colSpan:1,rowSpan:2,width:30},
		          {field:"maxMin",title:"极值",colSpan:2,rowSpan:1,children:[{field:"minNum",title:"最小",width:30},{field:"maxNum",title:"最大",width:30}]},
		          pos,
		          {field:"lingHaoLag",title:"邻最大距",colSpan:1,rowSpan:2,width:30},
		          ];
	}else if(href.lotteryCategory.indexOf("Fc6Of33")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130},
		      {field:"kuaDu",title:"跨度",colSpan:1,rowSpan:2,width:30},
		      {field:"maxMin",title:"极值",colSpan:2,rowSpan:1,children:[{field:"minNum",title:"龙头",width:30},{field:"maxNum",title:"凤尾",width:30}]},
		      {field:"span",title:"跨度分布",colSpan:28,rowSpan:1,children:[]},
		      {field:"lingHaoLag",title:"邻最大距",colSpan:1,rowSpan:2,width:30}
		      ];
		for(var i=0;i<28;i++){
			head[4].children.push({field:"span"+i,title:i+5,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Fc7Of30")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:155},
		      {field:"kuaDu",title:"跨度",colSpan:1,rowSpan:2,width:30},
		      {field:"maxMin",title:"极值",colSpan:2,rowSpan:1,children:[{field:"minNum",title:"龙头",width:30},{field:"maxNum",title:"凤尾",width:30}]},
		      {field:"span",title:"跨度分布",colSpan:28,rowSpan:1,children:[]},
		      {field:"lingHaoLag",title:"邻最大距",colSpan:1,rowSpan:2,width:30}
		      ];
		for(var i=0;i<24;i++){
			head[4].children.push({field:"span"+i,title:i+5,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Tc5Of35")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:155},
		      {field:"kuaDu",title:"跨度",colSpan:1,rowSpan:2,width:30},
		      {field:"maxMin",title:"极值",colSpan:2,rowSpan:1,children:[{field:"minNum",title:"龙头",width:30},{field:"maxNum",title:"凤尾",width:30}]},
		      {field:"span",title:"跨度分布",colSpan:31,rowSpan:1,children:[]},
		      {field:"lingHaoLag",title:"邻最大距",colSpan:1,rowSpan:2,width:30}
		      ];
		for(var i=0;i<31;i++){
			head[4].children.push({field:"span"+i,title:i+4,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Array5")!=-1||href.lotteryCategory.indexOf("star5")!=-1){
		var pos={field:"span",title:"跨度分布",colSpan:10,rowSpan:1,children:[]};
		for(var i=0;i<10;i++){
			var field={field:"span"+i,title:i,colSpan:1,rowSpan:1,width:20};
			pos.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:55},
		          {field:"kuaDu",title:"跨度",colSpan:1,rowSpan:2,width:30},
		          {field:"maxMin",title:"极值",colSpan:2,rowSpan:1,children:[{field:"minNum",title:"最小",width:30},{field:"maxNum",title:"最大",width:30}]},
		          pos,
		          {field:"lingHaoLag",title:"邻最大距",colSpan:1,rowSpan:2,width:30},
		          ];
	}else if(href.lotteryCategory.indexOf("Tc7Of10")!=-1){
		var pos={field:"span",title:"跨度分布",colSpan:10,rowSpan:1,children:[]};
		for(var i=0;i<10;i++){
			var field={field:"span"+i,title:i,colSpan:1,rowSpan:1,width:20};
			pos.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:80},
		          {field:"kuaDu",title:"跨度",colSpan:1,rowSpan:2,width:30},
		          {field:"maxMin",title:"极值",colSpan:2,rowSpan:1,children:[{field:"minNum",title:"最小",width:30},{field:"maxNum",title:"最大",width:30}]},
		          pos,
		          {field:"lingHaoLag",title:"邻最大距",colSpan:1,rowSpan:2,width:30},
		          ];
	}else if(href.lotteryCategory.indexOf("5Of11")!=-1&&href.lotteryCategory.indexOf("ahead")!=-1){
		var num=15;
		var s=href.lotteryCategory.indexOf("Of");
		num=Number(href.lotteryCategory.substr(s+2,2));
		var kuaNum=10,smallest=1;
		if(href.lotteryCategory.indexOf("ahead3")!=-1){
			kuaNum=9;
			smallest=2;
		}
		
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:60},
		      {field:"kuaDu",title:"跨度",colSpan:1,rowSpan:2,width:30},
		      {field:"maxMin",title:"极值",colSpan:2,rowSpan:1,children:[{field:"minNum",title:"龙头",width:30},{field:"maxNum",title:"凤尾",width:30}]},
		      {field:"span",title:"跨度分布",colSpan:kuaNum,rowSpan:1,children:[]},
		      {field:"lingHaoLag",title:"邻最大距",colSpan:1,rowSpan:2,width:30}
		      ];
		for(var i=0;i<kuaNum;i++){
			head[4].children.push({field:"span"+i,title:i+smallest,width:26});
		}
	}else if(href.lotteryCategory.indexOf("Hd5Of15")!=-1||href.lotteryCategory.indexOf("5Of22")!=-1||href.lotteryCategory.indexOf("5Of20")!=-1||href.lotteryCategory.indexOf("5Of11")!=-1){
		var num=15;
		var s=href.lotteryCategory.indexOf("Of");
		num=Number(href.lotteryCategory.substr(s+2,2));
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:100},
		      {field:"kuaDu",title:"跨度",colSpan:1,rowSpan:2,width:30},
		      {field:"maxMin",title:"极值",colSpan:2,rowSpan:1,children:[{field:"minNum",title:"龙头",width:30},{field:"maxNum",title:"凤尾",width:30}]},
		      {field:"span",title:"跨度分布",colSpan:num-4,rowSpan:1,children:[]},
		      {field:"lingHaoLag",title:"邻最大距",colSpan:1,rowSpan:2,width:30}
		      ];
		for(var i=0;i<num-4;i++){
			head[4].children.push({field:"span"+i,title:i+4,width:26});
		}
	}
	return head;
}
//大小奇偶质合
function createBsOeZhHead(index,lotteyCategory){
	var head;
	if(href.lotteryCategory.indexOf("Magic3")!=-1||href.lotteryCategory.indexOf("star3")!=-1){
		var title={bigSmall:"大小",oddEven:"奇偶",zhiHe:"质合"};
		var rateValue=["3","12","21","30"];
		var rateText=["0:3","1:2","2:1","3:0"];
		var rate={field:"rate",title:title[index]+"比",colSpan:4,rowSpan:1,children:[]};
		for(var i=0;i<rateValue.length;i++){
			var field={field:index+"Rate"+rateValue[i],title:rateText[i],colSpan:1,rowSpan:1,width:30};
			rate.children.push(field);
		}
		
		var orderValue=[0,1,10,100,11,101,110,111];
		var orderText={bigSmall:["小小小","小小大","小大小","大小小","小大大","大小大","大大小","大大大"],
					   oddEven:["偶偶偶","偶偶奇","偶奇偶","奇偶偶","偶奇奇","奇偶奇","奇奇偶","奇奇奇"],
					   zhiHe:["合合合","合合质","合质合","质合合","合质质","质合质","质质合","质质质"]};
		var fb={field:"paiWei",title:title[index]+"分布",colSpan:8,rowSpan:1,children:[]};
		for(var i=0;i<orderValue.length;i++){
			var field={field:index+orderValue[i],title:orderText[index][i],colSpan:1,rowSpan:1,width:45};
			fb.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
		          rate,
		          {field:"pW",title:title[index],colSpan:1,rowSpan:2,width:40},
		          fb];
	}else if(href.lotteryCategory.indexOf("Quick3")!=-1){
		var title={bigSmall:"大小",oddEven:"奇偶",zhiHe:"质合"};
		var rateValue=["3","12","21","30"];
		var rateText=["0:3","1:2","2:1","3:0"];
		var rate={field:"rate",title:title[index]+"比",colSpan:4,rowSpan:1,children:[]};
		for(var i=0;i<rateValue.length;i++){
			var field={field:index+"Rate"+rateValue[i],title:rateText[i],colSpan:1,rowSpan:1,width:30};
			rate.children.push(field);
		}
		
		var orderValue=[0,1,10,100,11,101,110,111];
		var orderText={bigSmall:["小小小","小小大","小大小","大小小","小大大","大小大","大大小","大大大"],
					   oddEven:["偶偶偶","偶偶奇","偶奇偶","奇偶偶","偶奇奇","奇偶奇","奇奇偶","奇奇奇"],
					   zhiHe:["合合合","合合质","合质合","质合合","合质质","质合质","质质合","质质质"]};
		var fb={field:"paiWei",title:title[index]+"分布",colSpan:8,rowSpan:1,children:[]};
		for(var i=0;i<orderValue.length;i++){
			var field={field:index+orderValue[i],title:orderText[index][i],colSpan:1,rowSpan:1,width:45};
			fb.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:50},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
		          rate,
		          {field:"pW",title:title[index],colSpan:1,rowSpan:2,width:40},
		          fb];
	}else if(href.lotteryCategory.indexOf("Fc6Of33")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130}
		      ];
		if(index=="bigSmall"){
			head.push({field:"rate",title:"大小比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="oddEven"){
			head.push({field:"rate",title:"奇偶比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="zhiHe"){
			head.push({field:"rate",title:"质合比",colSpan:1,rowSpan:2,width:30});
		}
		head.push({field:"rateDis",title:"比值分布",colSpan:7,rowSpan:1,children:[{field:"rate0",title:"0:6",width:30},{field:"rate1",title:"1:5",width:30},{field:"rate2",title:"2:4",width:30},{field:"rate3",title:"3:3",width:30},{field:"rate4",title:"4:2",width:30},{field:"rate5",title:"5:1",width:30},{field:"rate6",title:"6:0",width:30}]});
		var ttt=["一","二","三","四","五","六"];
		if(index=="bigSmall"){
			for(var i=0;i<6;i++){
				head.push({field:"pos"+i,title:"红"+ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"大",width:30},{field:"pos"+i+"0",title:"小",width:30}]});
			}
		}else if(index=="oddEven"){
			for(var i=0;i<6;i++){
				head.push({field:"pos"+i,title:"红"+ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"奇",width:30},{field:"pos"+i+"0",title:"偶",width:30}]});
			}
		}else if(index=="zhiHe"){
			for(var i=0;i<6;i++){
				head.push({field:"pos"+i,title:"红"+ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"质",width:30},{field:"pos"+i+"0",title:"合",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("Fc7Of30")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:155}
		      ];
		if(index=="bigSmall"){
			head.push({field:"rate",title:"大小比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="oddEven"){
			head.push({field:"rate",title:"奇偶比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="zhiHe"){
			head.push({field:"rate",title:"质合比",colSpan:1,rowSpan:2,width:30});
		}
		head.push({field:"rateDis",title:"比值分布",colSpan:8,rowSpan:1,children:[{field:"rate0",title:"0:7",width:30},{field:"rate1",title:"1:6",width:30},{field:"rate2",title:"2:5",width:30},{field:"rate3",title:"3:4",width:30},{field:"rate4",title:"4:3",width:30},{field:"rate5",title:"5:2",width:30},{field:"rate6",title:"6:1",width:30},{field:"rate7",title:"7:0",width:30}]});
		var ttt=["一","二","三","四","五","六","七"];
		if(index=="bigSmall"){
			for(var i=0;i<7;i++){
				head.push({field:"pos"+i,title:"红"+ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"大",width:30},{field:"pos"+i+"0",title:"小",width:30}]});
			}
		}else if(index=="oddEven"){
			for(var i=0;i<7;i++){
				head.push({field:"pos"+i,title:"红"+ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"奇",width:30},{field:"pos"+i+"0",title:"偶",width:30}]});
			}
		}else if(index=="zhiHe"){
			for(var i=0;i<7;i++){
				head.push({field:"pos"+i,title:"红"+ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"质",width:30},{field:"pos"+i+"0",title:"合",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("Tc5Of35")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130}
		      ];
		if(index=="bigSmall"){
			head.push({field:"rate",title:"大小比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="oddEven"){
			head.push({field:"rate",title:"奇偶比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="zhiHe"){
			head.push({field:"rate",title:"质合比",colSpan:1,rowSpan:2,width:30});
		}
		head.push({field:"rateDis",title:"比值分布",colSpan:6,rowSpan:1,children:[{field:"rate0",title:"0:5",width:30},{field:"rate1",title:"1:4",width:30},{field:"rate2",title:"2:3",width:30},{field:"rate3",title:"3:2",width:30},{field:"rate4",title:"4:1",width:30},{field:"rate5",title:"5:0",width:30}]});
		var ttt=["一","二","三","四","五"];
		if(index=="bigSmall"){
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:"前"+ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"大",width:30},{field:"pos"+i+"0",title:"小",width:30}]});
			}
		}else if(index=="oddEven"){
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:"前"+ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"奇",width:30},{field:"pos"+i+"0",title:"偶",width:30}]});
			}
		}else if(index=="zhiHe"){
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:"前"+ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"质",width:30},{field:"pos"+i+"0",title:"合",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("Array5")!=-1||href.lotteryCategory.indexOf("star5")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:55}
		      ];
		if(index=="bigSmall"){
			head.push({field:"rate",title:"大小比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="oddEven"){
			head.push({field:"rate",title:"奇偶比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="zhiHe"){
			head.push({field:"rate",title:"质合比",colSpan:1,rowSpan:2,width:30});
		}
		head.push({field:"rateDis",title:"比值分布",colSpan:6,rowSpan:1,children:[{field:"rate0",title:"0:5",width:30},{field:"rate1",title:"1:4",width:30},{field:"rate2",title:"2:3",width:30},{field:"rate3",title:"3:2",width:30},{field:"rate4",title:"4:1",width:30},{field:"rate5",title:"5:0",width:30}]});
		var ttt=["万位","千位","百位","十位","个位"];
		if(index=="bigSmall"){
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"大",width:30},{field:"pos"+i+"0",title:"小",width:30}]});
			}
		}else if(index=="oddEven"){
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"奇",width:30},{field:"pos"+i+"0",title:"偶",width:30}]});
			}
		}else if(index=="zhiHe"){
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"质",width:30},{field:"pos"+i+"0",title:"合",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("Tc7Of10")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:80}
		      ];
		if(index=="bigSmall"){
			head.push({field:"rate",title:"大小比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="oddEven"){
			head.push({field:"rate",title:"奇偶比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="zhiHe"){
			head.push({field:"rate",title:"质合比",colSpan:1,rowSpan:2,width:30});
		}
		head.push({field:"rateDis",title:"比值分布",colSpan:8,rowSpan:1,children:[{field:"rate0",title:"0:7",width:30},{field:"rate1",title:"1:6",width:30},{field:"rate2",title:"2:5",width:30},{field:"rate3",title:"3:4",width:30},{field:"rate4",title:"4:3",width:30},{field:"rate5",title:"5:2",width:30},{field:"rate6",title:"6:1",width:30},{field:"rate7",title:"7:0",width:30}]});
		var ttt=["定位(1)","定位(2)","定位(3)","定位(4)","定位(5)","定位(6)","定位(7)"];
		if(index=="bigSmall"){
			for(var i=0;i<7;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"大",width:30},{field:"pos"+i+"0",title:"小",width:30}]});
			}
		}else if(index=="oddEven"){
			for(var i=0;i<7;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"奇",width:30},{field:"pos"+i+"0",title:"偶",width:30}]});
			}
		}else if(index=="zhiHe"){
			for(var i=0;i<7;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"质",width:30},{field:"pos"+i+"0",title:"合",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("5Of11")!=-1&&href.lotteryCategory.indexOf("ahead")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:60}
		      ];
		if(index=="bigSmall"){
			head.push({field:"rate",title:"大小比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="oddEven"){
			head.push({field:"rate",title:"奇偶比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="zhiHe"){
			head.push({field:"rate",title:"质合比",colSpan:1,rowSpan:2,width:30});
		}
		var ttt;
		if(href.lotteryCategory.indexOf("ahead2")!=-1){
			ttt=["定位(1)","定位(2)"];
			head.push({field:"rateDis",title:"比值分布",colSpan:3,rowSpan:1,children:[{field:"rate0",title:"0:2",width:30},{field:"rate1",title:"1:1",width:30},{field:"rate2",title:"2:0",width:30}]});
		}else{
			ttt=["定位(1)","定位(2)","定位(3)"];
			head.push({field:"rateDis",title:"比值分布",colSpan:4,rowSpan:1,children:[{field:"rate0",title:"0:3",width:30},{field:"rate1",title:"1:2",width:30},{field:"rate2",title:"2:1",width:30},{field:"rate3",title:"3:0",width:30}]});
		}
		if(index=="bigSmall"){
			for(var i=0;i<ttt.length;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"大",width:30},{field:"pos"+i+"0",title:"小",width:30}]});
			}
		}else if(index=="oddEven"){
			for(var i=0;i<ttt.length;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"奇",width:30},{field:"pos"+i+"0",title:"偶",width:30}]});
			}
		}else if(index=="zhiHe"){
			for(var i=0;i<ttt.length;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"质",width:30},{field:"pos"+i+"0",title:"合",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("Hd5Of15")!=-1||href.lotteryCategory.indexOf("5Of22")!=-1||href.lotteryCategory.indexOf("5Of20")!=-1||href.lotteryCategory.indexOf("5Of11")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:100}
		      ];
		if(index=="bigSmall"){
			head.push({field:"rate",title:"大小比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="oddEven"){
			head.push({field:"rate",title:"奇偶比",colSpan:1,rowSpan:2,width:30});
		}else if(index=="zhiHe"){
			head.push({field:"rate",title:"质合比",colSpan:1,rowSpan:2,width:30});
		}
		head.push({field:"rateDis",title:"比值分布",colSpan:6,rowSpan:1,children:[{field:"rate0",title:"0:5",width:30},{field:"rate1",title:"1:4",width:30},{field:"rate2",title:"2:3",width:30},{field:"rate3",title:"3:2",width:30},{field:"rate4",title:"4:1",width:30},{field:"rate5",title:"5:0",width:30}]});
		var ttt=["定位(1)","定位(2)","定位(3)","定位(4)","定位(5)"];
		if(index=="bigSmall"){
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"大",width:30},{field:"pos"+i+"0",title:"小",width:30}]});
			}
		}else if(index=="oddEven"){
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"奇",width:30},{field:"pos"+i+"0",title:"偶",width:30}]});
			}
		}else if(index=="zhiHe"){
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:2,rowSpan:1,children:[{field:"pos"+i+"1",title:"质",width:30},{field:"pos"+i+"0",title:"合",width:30}]});
			}
		}
	}
	return head;
}

function createLuRateHead(index,lotteyCategory){
	var head;
	if(href.lotteryCategory.indexOf("Magic3")!=-1||href.lotteryCategory.indexOf("star3")!=-1){
		var title={luShuRate:"012路比(0路个数:1路个数:2路个数)",threeAreaRate:"三区比(1区个数:2区个数:3区个数)"};
		var pos={field:"rate",title:title[index],colSpan:10,rowSpan:1,children:[]};
		
		var value=[3,12,21,30,102,111,120,201,210,300];
		var text=["0:0:3","0:1:2","0:2:1","0:3:0","1:0:2","1:1:1","1:2:0","2:0:1","2:1:0","3:0:0"];
		for(var i=0;i<value.length;i++){
			var field={field:index+value[i],title:text[i],colSpan:1,rowSpan:1,width:40};
			pos.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
		          {field:"v",title:"比值",colSpan:1,rowSpan:2,width:30},
		          pos,
		          ];
	}if(href.lotteryCategory.indexOf("Quick3")!=-1){
		var title={luShuRate:"012路比(0路个数:1路个数:2路个数)",threeAreaRate:"三区比(1区个数:2区个数:3区个数)"};
		var pos={field:"rate",title:title[index],colSpan:10,rowSpan:1,children:[]};
		
		var value=[3,12,21,30,102,111,120,201,210,300];
		var text=["0:0:3","0:1:2","0:2:1","0:3:0","1:0:2","1:1:1","1:2:0","2:0:1","2:1:0","3:0:0"];
		for(var i=0;i<value.length;i++){
			var field={field:index+value[i],title:text[i],colSpan:1,rowSpan:1,width:40};
			pos.children.push(field);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:50},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
		          {field:"v",title:"比值",colSpan:1,rowSpan:2,width:30},
		          pos,
		          ];
	}
	return head;
}
function createW5Head(index){
	var w5=["01249","01268","01346","01467","01569","02357","02458","03789","12359","12378","12589","13478","14579","23456","24679","34689","35678"];
	var w6=["012346","012359","012489","013789","026789","045678","123457","156789","234568","345679"];
	var w7=["0123489","0345679","0156789","1234567","0245678","2356789"];

	var w={w5:w5,w6:w6,w7:w7};
	var t={w5:"万能5码",w6:"万能6码",w7:"万能7码"};
	var pos0={field:index,title:t[index],colSpan:w5.length,rowSpan:1,children:[]};
	for(var i=0;i<w[index].length;i++){
		var field={field:"w"+w[index][i],title:w[index][i],colSpan:1,rowSpan:1,width:50};
		pos0.children.push(field);
	}
		
	var head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
	          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
	          pos0,
	          ];
	return head;
}
function createLuHead(index,lotteyCategory){
	var head;
	if(href.lotteryCategory.indexOf("Magic3")!=-1||href.lotteryCategory.indexOf("star3")!=-1){
		var pos0={field:"pos0",title:"百位",colSpan:3,rowSpan:1,children:[]};
		var pos1={field:"pos1",title:"十位",colSpan:3,rowSpan:1,children:[]};
		var pos2={field:"pos2",title:"个位",colSpan:3,rowSpan:1,children:[]};
		for(var i=0;i<3;i++){
			var field={field:"pos0"+i,title:index=="luShuD"?i+"路":(i+1)+"区",colSpan:1,rowSpan:1,width:30};
			pos0.children.push(field);
			
			var field1={field:"pos1"+i,title:index=="luShuD"?i+"路":(i+1)+"区",colSpan:1,rowSpan:1,width:30};
			pos1.children.push(field1);
			
			var field2={field:"pos2"+i,title:index=="luShuD"?i+"路":(i+1)+"区",colSpan:1,rowSpan:1,width:30};
			pos2.children.push(field2);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
		          {field:"rate",title:index=="luShuD"?"012路比":"三区比",colSpan:1,rowSpan:2,width:30},
		          {field:"array",title:index=="luShuD"?"路数排列":"三区排列",colSpan:1,rowSpan:2,width:30},
		          pos0,
		          pos1,
		          pos2
		          ];
	}else if(href.lotteryCategory.indexOf("Quick3")!=-1){
		var pos0={field:"pos0",title:"百位",colSpan:3,rowSpan:1,children:[]};
		var pos1={field:"pos1",title:"十位",colSpan:3,rowSpan:1,children:[]};
		var pos2={field:"pos2",title:"个位",colSpan:3,rowSpan:1,children:[]};
		for(var i=0;i<3;i++){
			var field={field:"pos0"+i,title:index=="luShuD"?i+"路":(i+1)+"区",colSpan:1,rowSpan:1,width:30};
			pos0.children.push(field);
			
			var field1={field:"pos1"+i,title:index=="luShuD"?i+"路":(i+1)+"区",colSpan:1,rowSpan:1,width:30};
			pos1.children.push(field1);
			
			var field2={field:"pos2"+i,title:index=="luShuD"?i+"路":(i+1)+"区",colSpan:1,rowSpan:1,width:30};
			pos2.children.push(field2);
		}
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:50},
		          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
		          {field:"rate",title:index=="luShuD"?"012路比":"三区比",colSpan:1,rowSpan:2,width:30},
		          {field:"array",title:index=="luShuD"?"路数排列":"三区排列",colSpan:1,rowSpan:2,width:30},
		          pos0,
		          pos1,
		          pos2
		          ];
	}else if(href.lotteryCategory.indexOf("Fc6Of33")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130}
		      ];
		var ttt=["一","二","三","四","五","六"];
		if(index=="luShu"){
			head.push({field:"rate",title:"012路比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<6;i++){
				head.push({field:"pos"+i,title:"红"+ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"0路",width:30},{field:"pos"+i+"1",title:"1路",width:30},{field:"pos"+i+"2",title:"2路",width:30}]});
			}
		}else{
			head.push({field:"rate",title:"三区比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<6;i++){
				head.push({field:"pos"+i,title:"红"+ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"1区",width:30},{field:"pos"+i+"1",title:"2区",width:30},{field:"pos"+i+"2",title:"3区",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("Fc7Of30")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:155}
		      ];
		var ttt=["一","二","三","四","五","六","七"];
		if(index=="luShu"){
			head.push({field:"rate",title:"012路比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<7;i++){
				head.push({field:"pos"+i,title:"红"+ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"0路",width:30},{field:"pos"+i+"1",title:"1路",width:30},{field:"pos"+i+"2",title:"2路",width:30}]});
			}
		}else{
			head.push({field:"rate",title:"三区比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<7;i++){
				head.push({field:"pos"+i,title:"红"+ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"1区",width:30},{field:"pos"+i+"1",title:"2区",width:30},{field:"pos"+i+"2",title:"3区",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("Tc5Of35")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130}
		      ];
		var ttt=["一","二","三","四","五"];
		if(index=="luShu"){
			head.push({field:"rate",title:"012路比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:"前"+ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"0路",width:30},{field:"pos"+i+"1",title:"1路",width:30},{field:"pos"+i+"2",title:"2路",width:30}]});
			}
		}else{
			head.push({field:"rate",title:"三区比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:"前"+ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"1区",width:30},{field:"pos"+i+"1",title:"2区",width:30},{field:"pos"+i+"2",title:"3区",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("Array5")!=-1||href.lotteryCategory.indexOf("star5")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:55}
		      ];
		var ttt=["万位","千位","百位","十位","个位"];
		if(index=="luShu"){
			head.push({field:"rate",title:"012路比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"0路",width:30},{field:"pos"+i+"1",title:"1路",width:30},{field:"pos"+i+"2",title:"2路",width:30}]});
			}
		}else{
			head.push({field:"rate",title:"三区比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"1区",width:30},{field:"pos"+i+"1",title:"2区",width:30},{field:"pos"+i+"2",title:"3区",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("Tc7Of10")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:55}
		      ];
		var ttt=["定位(1)","定位(2)","定位(3)","定位(4)","定位(5)","定位(6)","定位(7)"];
		if(index=="luShu"){
			head.push({field:"rate",title:"012路比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<7;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"0路",width:30},{field:"pos"+i+"1",title:"1路",width:30},{field:"pos"+i+"2",title:"2路",width:30}]});
			}
		}else{
			head.push({field:"rate",title:"三区比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<7;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"1区",width:30},{field:"pos"+i+"1",title:"2区",width:30},{field:"pos"+i+"2",title:"3区",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("5Of11")!=-1&&href.lotteryCategory.indexOf("ahead")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:60}
		      ];
		var ttt;
		if(href.lotteryCategory.indexOf("ahead2")!=-1){
			ttt=["定位(1)","定位(2)","定位(3)"];
		}else{
			ttt=["定位(1)","定位(2)","定位(3)"];
		}
		if(index=="luShu"){
			head.push({field:"rate",title:"012路比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<ttt.length;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"0路",width:30},{field:"pos"+i+"1",title:"1路",width:30},{field:"pos"+i+"2",title:"2路",width:30}]});
			}
		}else{
			head.push({field:"rate",title:"三区比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<ttt.length;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"1区",width:30},{field:"pos"+i+"1",title:"2区",width:30},{field:"pos"+i+"2",title:"3区",width:30}]});
			}
		}
	}else if(href.lotteryCategory.indexOf("Hd5Of15")!=-1||href.lotteryCategory.indexOf("5Of22")!=-1||href.lotteryCategory.indexOf("5Of20")!=-1||href.lotteryCategory.indexOf("5Of11")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:100}
		      ];
		var ttt=["定位(1)","定位(2)","定位(3)","定位(4)","定位(5)"];
		if(index=="luShu"){
			head.push({field:"rate",title:"012路比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"0路",width:30},{field:"pos"+i+"1",title:"1路",width:30},{field:"pos"+i+"2",title:"2路",width:30}]});
			}
		}else{
			head.push({field:"rate",title:"三区比",colSpan:1,rowSpan:2,width:30});
			for(var i=0;i<5;i++){
				head.push({field:"pos"+i,title:ttt[i],colSpan:3,rowSpan:1,children:[{field:"pos"+i+"0",title:"1区",width:30},{field:"pos"+i+"1",title:"2区",width:30},{field:"pos"+i+"2",title:"3区",width:30}]});
			}
		}
	}
	return head;
}
function createXingTaiHead(index,lotteyCategory){
	var head;
	if(href.lotteryCategory.indexOf("Quick3")!=-1){
	    head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:href.lotteryCategory.indexOf("Quick3")!=-1?50:50},
	          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
	          {field:"xingTai",title:"形态",colSpan:1,rowSpan:2,width:40},
	          {field:"xt",title:"形态分布",colSpan:3,rowSpan:1,width:30,children:[{field:"zuSan",title:"二同",width:30},{field:"zuLiu",title:"三不同",width:45},{field:"baoZi",title:"三同",width:30}]},
	          {field:"lh",title:"连号",colSpan:1,rowSpan:2,width:30},
	          {field:"lianHao",title:"连号分布",colSpan:3,rowSpan:1,width:30,children:[{field:"lian0",title:"不连",width:30},{field:"lian2",title:"2连",width:30},{field:"lian3",title:"3连",width:30}]}
	          ];
	}else{
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:href.lotteryCategory.indexOf("Quick3")!=-1?50:50},
	          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
	          {field:"xingTai",title:"形态",colSpan:1,rowSpan:2,width:30},
	          {field:"xt",title:"形态分布",colSpan:3,rowSpan:1,width:30,children:[{field:"zuSan",title:"组三",width:30},{field:"zuLiu",title:"组六",width:30},{field:"baoZi",title:"豹子",width:30}]},
	          {field:"lh",title:"连号",colSpan:1,rowSpan:2,width:30},
	          {field:"lianHao",title:"连号分布",colSpan:3,rowSpan:1,width:30,children:[{field:"lian0",title:"不连",width:30},{field:"lian2",title:"2连",width:30},{field:"lian3",title:"3连",width:30}]}
	          ];
	}
	
	return head;
}
function createOther(index,lotteyCategory){
	var pos0={field:"erMa",title:"二码",colSpan:3,rowSpan:1,children:[]};
	var pos1={field:"erWeiHe",title:"二位和",colSpan:3,rowSpan:1,children:[]};
	var pos2={field:"erWeiCha",title:"二位差",colSpan:3,rowSpan:1,children:[]};
	
	var vvv=["01","02","12"];
	var erMaT=["百十","百个","十个"];
	for(var i=0;i<3;i++){
		var field={field:"erMa"+vvv[i],title:erMaT[i],colSpan:1,rowSpan:1,width:30};
		pos0.children.push(field);
		
		var field1={field:"he"+vvv[i],title:erMaT[i],colSpan:1,rowSpan:1,width:30};
		pos1.children.push(field1);
		
		var field2={field:"cha"+vvv[i],title:erMaT[i],colSpan:1,rowSpan:1,width:30};
		pos2.children.push(field2);
	}
	var head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:window.location.href.indexOf("Quick3")!=-1?50:50},
	          {field:"lottery",title:"号码",colSpan:1,rowSpan:2,width:30},
	          {field:"acValue",title:"ac值",colSpan:1,rowSpan:2,width:30},
	          {field:"average",title:"平均值",colSpan:1,rowSpan:2,width:30},
	          {field:"lianHao",title:"连号",colSpan:1,rowSpan:2,width:30},
	          {field:"differNum",title:"0-9开出(个)",colSpan:1,rowSpan:2,width:30},
	          pos0,
	          pos1,
	          pos2
	          ];
	return head;
}
function createLianHaoHead(){
	var head;
	if(href.lotteryCategory.indexOf("Fc6Of33")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130},
		      {field:"lianHaoGroup",title:"连号组数",colSpan:1,rowSpan:2,width:30},
		      {field:"distri",title:"连号分布",colSpan:33,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<33;i++){
			head[3].children.push({field:"pos"+i,title:i+1,colSpan:1,rowSpan:2,width:30});
		}
	}else if(href.lotteryCategory.indexOf("Fc7Of30")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:155},
		      {field:"lianHaoGroup",title:"连号组数",colSpan:1,rowSpan:2,width:30},
		      {field:"distri",title:"连号分布",colSpan:30,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<30;i++){
			head[3].children.push({field:"pos"+i,title:i+1,colSpan:1,rowSpan:2,width:30});
		}
	}else if(href.lotteryCategory.indexOf("Tc5Of35")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:155},
		      {field:"lianHaoGroup",title:"连号组数",colSpan:1,rowSpan:2,width:30},
		      {field:"distri",title:"连号分布",colSpan:35,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<35;i++){
			head[3].children.push({field:"pos"+i,title:i+1,colSpan:1,rowSpan:2,width:30});
		}
	}else if(href.lotteryCategory.indexOf("Array5")!=-1||href.lotteryCategory.indexOf("star5")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:55},
		      {field:"lianHaoGroup",title:"连号组数",colSpan:1,rowSpan:2,width:30},
		      {field:"distri",title:"连号分布",colSpan:10,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<10;i++){
			head[3].children.push({field:"pos"+i,title:i+1,colSpan:1,rowSpan:2,width:30});
		}
	}else if(href.lotteryCategory.indexOf("Tc7Of10")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:80},
		      {field:"lianHaoGroup",title:"连号组数",colSpan:1,rowSpan:2,width:30},
		      {field:"distri",title:"连号分布",colSpan:10,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<10;i++){
			head[3].children.push({field:"pos"+i,title:i+1,colSpan:1,rowSpan:2,width:30});
		}
	}else if(href.lotteryCategory.indexOf("Hd5Of15")!=-1||href.lotteryCategory.indexOf("5Of22")!=-1||href.lotteryCategory.indexOf("5Of20")!=-1||href.lotteryCategory.indexOf("5Of11")!=-1){
		var num=15;
		var s=href.lotteryCategory.indexOf("Of");
		num=Number(href.lotteryCategory.substr(s+2,2));
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:100},
		      {field:"lianHaoGroup",title:"连号组数",colSpan:1,rowSpan:2,width:30},
		      {field:"distri",title:"连号分布",colSpan:num,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<num;i++){
			head[3].children.push({field:"pos"+i,title:i+1,colSpan:1,rowSpan:2,width:30});
		}
	}
	return head;
}

function createSameTailHead(){
	var head;
	if(href.lotteryCategory.indexOf("Fc6Of33")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:130},
		      {field:"chongWei",title:"重尾",colSpan:2,rowSpan:1,width:30,children:[{field:"sameTailNum",title:"重尾尾号",colSpan:1,rowSpan:2,width:30},{field:"sameTailGroup",title:"重尾组数",colSpan:1,rowSpan:2,width:30}]},
		      {field:"distri",title:"重尾分布",colSpan:33,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<33;i++){
			head[3].children.push({field:"pos"+i,title:i+1,colSpan:1,rowSpan:2,width:30});
		}
	}else if(href.lotteryCategory.indexOf("Fc7Of30")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:155},
		      {field:"chongWei",title:"重尾",colSpan:2,rowSpan:1,width:30,children:[{field:"sameTailNum",title:"重尾尾号",colSpan:1,rowSpan:2,width:30},{field:"sameTailGroup",title:"重尾组数",colSpan:1,rowSpan:2,width:30}]},
		      {field:"distri",title:"重尾分布",colSpan:30,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<30;i++){
			head[3].children.push({field:"pos"+i,title:i+1,colSpan:1,rowSpan:2,width:30});
		}
	}else if(href.lotteryCategory.indexOf("Tc5Of35")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:155},
		      {field:"chongWei",title:"重尾",colSpan:2,rowSpan:1,width:30,children:[{field:"sameTailNum",title:"重尾尾号",colSpan:1,rowSpan:2,width:30},{field:"sameTailGroup",title:"重尾组数",colSpan:1,rowSpan:2,width:30}]},
		      {field:"distri",title:"重尾分布",colSpan:35,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<35;i++){
			head[3].children.push({field:"pos"+i,title:i+1,colSpan:1,rowSpan:2,width:30});
		}
	}else if(href.lotteryCategory.indexOf("Array5")!=-1||href.lotteryCategory.indexOf("star5")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:55},
		      {field:"tongHao",title:"同号",colSpan:2,rowSpan:1,width:30,children:[{field:"sameNum",title:"同号号码",colSpan:1,rowSpan:2,width:30},{field:"sameNumGroup",title:"同号组数",colSpan:1,rowSpan:2,width:30}]},
		      {field:"distri",title:"同号分布",colSpan:10,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<10;i++){
			head[3].children.push({field:"pos"+i,title:i+1,colSpan:1,rowSpan:2,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Tc7Of10")!=-1){
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:80},
		      {field:"tongHao",title:"同号",colSpan:2,rowSpan:1,width:30,children:[{field:"sameNum",title:"同号号码",colSpan:1,rowSpan:2,width:30},{field:"sameNumGroup",title:"同号组数",colSpan:1,rowSpan:2,width:30}]},
		      {field:"distri",title:"同号分布",colSpan:10,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<10;i++){
			head[3].children.push({field:"pos"+i,title:i+1,colSpan:1,rowSpan:2,width:20});
		}
	}else if(href.lotteryCategory.indexOf("Hd5Of15")!=-1||href.lotteryCategory.indexOf("5Of22")!=-1||href.lotteryCategory.indexOf("5Of20")!=-1||href.lotteryCategory.indexOf("5Of11")!=-1){
		var num=15;
		var s=href.lotteryCategory.indexOf("Of");
		num=Number(href.lotteryCategory.substr(s+2,2));
		head=[{field:"qiHao",title:"期号",colSpan:1,rowSpan:2,width:40},
		      {field:"lottery",title:"开奖号码",colSpan:1,rowSpan:2,width:100},
		      {field:"chongWei",title:"重尾",colSpan:2,rowSpan:1,width:30,children:[{field:"sameTailNum",title:"重尾尾号",colSpan:1,rowSpan:2,width:30},{field:"sameTailGroup",title:"重尾组数",colSpan:1,rowSpan:2,width:30}]},
		      {field:"distri",title:"重尾分布",colSpan:num,rowSpan:1,width:30,children:[]},
		      ];
		for(var i=0;i<num;i++){
			head[3].children.push({field:"pos"+i,title:i+1,width:30});
		}
	}
	return head;
}
function DataAnaTable(config){
    var tableDiv=$("<div></div>");
    tableDiv.config=config;
    
  /*  var screenClientAreaY=1000;
    this.tableBody=$("<div id='tableBody_"+this.indexName+"' style='position:relative;height:"+(screenClientAreaY-140)+"px;overflow:auto;background:#d8f0e1;'></div>");
    this.dataTable=$("<table cellspacing='0' cellpadding='0'></table>");*/
    
    //table.rowNumber=colsConfig.rowNumber;
   // table.fields=[];
    tableDiv.headData=null;
    if(config.index=="base"){
    	tableDiv.headData=createBaseHead(href.lotteryCategory);
    }else if(config.index=="numDistri"){
    	tableDiv.headData=createNumDistriHead();
    }else if(config.index=="blue"){
    	tableDiv.headData=createBlueHead();
    }else if(config.index.indexOf("pos")!=-1){
    	tableDiv.headData=createPosHead(config.index.substring(config.index.length-1,config.index.length),config.lotteryCategory);
    }else if(config.index.indexOf("heZhi")!=-1){
    	tableDiv.headData=createHeZhiHead(config.lotteryCategory);
    }else if(config.index.indexOf("span")!=-1){
    	tableDiv.headData=createKuaDuHead(config.lotteryCategory);
    }else if(config.index.indexOf("bigSmall")!=-1||config.index.indexOf("oddEven")!=-1||config.index.indexOf("zhiHe")!=-1){
    	tableDiv.headData=createBsOeZhHead(config.index,config.lotteryCategory);
    }else if(config.index.indexOf("luShuRate")!=-1||config.index.indexOf("threeAreaRate")!=-1){
    	tableDiv.headData=createLuRateHead(config.index,config.lotteryCategory);
    }else if(config.index.indexOf("w5")!=-1||config.index.indexOf("w6")!=-1||config.index.indexOf("w7")!=-1){
    	tableDiv.headData=createW5Head(config.index);
    }else if(config.index.indexOf("luShuD")!=-1||config.index.indexOf("threeAreaD")!=-1){
    	tableDiv.headData=createLuHead(config.index,config.lotteryCategory);
    }else if(config.index=="luShu"||config.index=="threeArea"){
    	tableDiv.headData=createLuHead(config.index,config.lotteryCategory);
    }else if(config.index=="lianHao"){
    	tableDiv.headData=createLianHaoHead(config.index,config.lotteryCategory);
    }else if(config.index=="sameTail"||config.index=="sameNum"){
    	tableDiv.headData=createSameTailHead(config.index,config.lotteryCategory);
    }else if(config.index=="xingTai"){
    	tableDiv.headData=createXingTaiHead(config.index,config.lotteryCategory);
    }else{
    	tableDiv.headData=createOther(config.index,config.lotteryCategory);
    }
    var self=this;
    tableDiv.getTableTitle=function(){
        var ret= tableDiv.headData;
        //var frozenColumns=[];//
        var columns=[];
        var firstRow=[];
        var seconRow=[];
        //var cols=[];
        for(var i=0;i<ret.length;i++){
            //if(ret.children[i].fixed=="1"){
            //    frozenColumns.push(ret.children[i]);
            //}else{
            firstRow.push(ret[i]);
            //}
            if(ret[i].children){
                for(var j=0;j<ret[i].children.length;j++){
                    seconRow.push(ret[i].children[j]);
                }
            }
        }
        columns.push(firstRow);
        if(seconRow.length>0){
            columns.push(seconRow);
        }
        //if(frozenColumns.length>0){
        //    cols.push([frozenColumns]);
        //}
        //cols.push(columns);
        return columns;
    }
    tableDiv.width=0;
    //绘制表头
    tableDiv.createHead=function(){
    	var colNums=0;
    	if(href.notShowMenu){
        	
        }else{
        	
        }
    	$("select[name='qiShu']").val(href.qiShu?href.qiShu:30);
        this.headTable=$("<table id='headTable' cellspacing='0' cellpadding='0' style='background:#d8f0e1;border-collapse:collapse;font-size:12px;'></table>");
        var tr0=$("<tr></tr>");
        this.headTable.append(tr0);
       /* if(colsConfig.rowNumber){//序号表头
            tr0.append("<th width='30px' class='firstLine-cell' colspan='1' rowspan='"+colsConfig.columns.length+"'>序号</th>");
        }*/
        //table==this
        var firstLayerTitleRow="";
        
        var columns=this.getTableTitle();//[[firstRow],[secendRow]]
        for(var i=0;i<columns[0].length;i++){//表头第一层
            var col=columns[0][i];
            if(col.children==undefined){
                //table.fields.push({fieldName:col.field,sort:col.sort,className:col.className,style:col.style,width:col.width});
                this.width+=Number(col.width);
                colNums++;
            }
            firstLayerTitleRow+="<th width='"+col.width+"px' class='firstLine-cell' colspan='"+col.colSpan+"' rowspan='"+col.rowSpan+"'>"+col.title+"</th>";
        }
        tr0.append(firstLayerTitleRow);//.append("<th rowspan='2' colspan='1' width='1px' class='last-cell'></th>");
        if(columns[1]){
            var tr1=$("<tr></tr>");
            this.headTable.append(tr1);
            var secondLayrTitleRow="";
            for(var i=0;i<columns[1].length;i++){//表头第二次
                var col=columns[1][i];
                secondLayrTitleRow+="<th width='"+col.width+"px' class='middle-cell' colspan='"+col.colSpan+"' rowspan='"+col.rowSpan+"'>"+col.title+"</th>";
                //table.fields.push({fieldName:col.field,sort:col.sort,className:col.className,style:col.style,width:col.width});
                this.width+=Number(col.width);
                colNums++;
            }
            tr1.append(secondLayrTitleRow);//.append("<th rowspan='1' colspan='1' width='1px' class='last-cell'></th>");
        }
        this.width=this.width+colNums+1;//特别注意：td的width不包括边框，所以表格总宽度＝allTdWidth+(tdColNums+1)*borderWidth;
//        this.width=(this.width>this.config.width?this.width:this.config.width);
     //   this.headTable.css({width:this.width+"px"});
      //  sortArray(table.fields,"sort","asc",true);
        this.append(this.headTable);
    }
    
    tableDiv.loadData=function(){//加载表格数据
        var columns=this.headData;
        var data=null;
        if(this.showFooter){
            data=this.config.items.slice(0,this.config.items.length-6);
        }else{
            data=this.config.items;
        }
        
        var excludeHeight=$("#menuBar").height()+this.headTable.height()+$("#indexs").height();
        var clientHeight=(browser.versions.mobile?document.body.scrollHeight:window.screen.availHeight);
        var contentHeight=(document.documentElement.clientHeight-excludeHeight-25);//内容表格高度
        this.tableBody=$("<div name='"+tableDiv.config.index+"_dataTableDiv' style='position:relative;height:"+contentHeight+"px;overflow-x:visible;overflow-y:auto;'></div>");
        this.append(this.tableBody);
        this.dataTable=$("<table width='"+(this.width+0)+"px' cellspacing='0' cellpadding='0' style='border-collapse:collapse;'></table>");
        this.tableBody.append(this.dataTable);
       // alert(this.headTable.find("th").eq(1).width());
      //  var ths=table.headTable.find("th");
        var hasChildren="object";
        for(var i=0;i<data.length;i++){//遍历行
            var rowStr="<tr>";
            var rowData=data[i];
            var valueTmp=null;
            for(var j=0;j<columns.length;j++){//遍历列
                valueTmp=rowData[columns[j].field];
                if(typeof(valueTmp)!=hasChildren){
                    var w=columns[j].width;
                    //if(this.config.indexName=="heZhi")
                    //    w=33;
                    rowStr+="<td class='middle-cell "+columns[j].className+"' style='width:"+w+"px;'>"+valueTmp+"</td>";
                    
                }else{//有子项
                    var childColumns=columns[j].children;
                    for(var k=0;k<childColumns.length;k++){
                        var childValue=valueTmp[childColumns[k].field];
                        rowStr+="<td class='middle-cell "+childColumns[k].className+"' style='width:"+(childColumns[k].width)+"px'>"+childValue+"</td>";
                    }
                }
            }
            rowStr+="</tr>";
            this.dataTable.append(rowStr);
        }
       // this.dataTable.css({width:this.width+"px"});
    }
    
    tableDiv.getStr0=function(rows){
        var columns=tableDiv.headData;
        var str="";
        for(var i=0;i<rows.length;i++){
            var rowData=rows[i];
            str+="<tr>";
            str+="<td class='middle-cell' colspan='2' style='background:#dedef6;font-size:12px;'>"+rowData["name"]+"</td>";
            for(var j=2;j<columns.length;j++){
                var valueTmp=rowData[columns[j].field];
                if(!columns[j].children){
                    str+="<td class='middle-cell "+columns[j].className+"' style='width:"+columns[j].width+"px;font-size:10px;background:#dedef6;'>"+(valueTmp==undefined?"":valueTmp)+"</td>";
                }else{
                    var childColumns=columns[j].children;
                    for(var k=0;k<childColumns.length;k++){
                        var childValue=null;
                        if(valueTmp){
                            childValue=valueTmp[childColumns[k].field];
                        }
                        str+="<td class='middle-cell "+childColumns[k].className+"' style='width:"+childColumns[k].width+"px;background:#dedef6;font-size:10px;'>"+(childValue==undefined?"":childValue)+"</td>";
                    }
                }
            }
            str+="</tr>";
        }
        return str;
    }
    tableDiv.getStr1=function(rows){
        var columns=tableDiv.headData;
        var str="";
        for(var i=0;i<rows.length;i++){
            var rowData=rows[i];
            str+="<tr>";
            str+="<td class='middle-cell' colspan='2' style='background:#dedef6;font-size:12px;'>"+rowData["name"]+"</td>";
            for(var j=2;j<columns.length;j++){
                var valueTmp=rowData[columns[j].field];
                if(!columns[j].children){
                    str+="<td class='middle-cell "+columns[j].className+"' style='width:"+columns[j].width+"px;font-size:10px;background:#dedef6;'>"+(valueTmp==undefined?"":valueTmp)+"</td>";
                }else{
                    var childColumns=columns[j].children;
                    for(var k=0;k<childColumns.length;k++){
                        var childValue=null;
                        if(valueTmp){
                            childValue=valueTmp[childColumns[k].field];
                        }
                        str+="<td class='middle-cell "+childColumns[k].className+"' style='height:40px;vertical-align:bottom;position:relative;background:#dedef6;font-size:10px;'><span style='position:relative;top:2px;'>"+(childValue==undefined?"":childValue)+"<br/><span style='display:inline-block;width:12px;background:red;height:"+(Number(childValue)/this.config.items.length*30)+"px;'></span></span></td>";
                    }
                }
            }
            str+="</tr>";
        }
        return str;
    }
    tableDiv.loadSum=function(){
        var columns=tableDiv.headData;
        var data=this.config.items;
        var liLunRows=data.slice(data.length-6,data.length-4);
        this.dataTable.append(this.getStr0(liLunRows));
        
        var totalRows=data.slice(data.length-4,data.length-2);
        this.dataTable.append(this.getStr1(totalRows));
        
        liLunRows=data.slice(data.length-2,data.length-1);
        this.dataTable.append(this.getStr0(liLunRows));
        
        totalRows=data.slice(data.length-1,data.length);
        this.dataTable.append(this.getStr1(totalRows));
    }
    
    tableDiv.showTrendLine=function(){
        var blockNum=1;//几组线条
        var indexName=this.config.index;
        var productName=this.config.lotteryCategory;
        var indexOfOf=productName.indexOf("Of");
        var lotNum=Number(productName.substr(indexOfOf-1,1));
        if(indexName.indexOf("distribution")!=-1){
            blockNum=5;
        }else if(indexName=="oddEven"||indexName=="bigSmall"||indexName=="zhiHe"){
            if(contain(productName,"Magic3")){
                blockNum=2;
            }else{
                blockNum=1;
            }/*else if(productName=="Array5"){
                blockNum=6;
            }else if(indexOfOf!=-1){
                blockNum=lotNum+1;
            }*/
        }else if(indexName=="luShu"||indexName=="threeArea"||indexName=="luShuD"||indexName=="threeAreaD"){
            if(contain(productName,"Magic3")){
                blockNum=3;
            }else if(productName=="Array5"){
                blockNum=5;
            }else if(productName=="Array5"){
                blockNum=6;
            }else if(indexOfOf!=-1){
                blockNum=lotNum;
            }
        }
        var blueLine=false;
        if(indexName=="blue"||indexName=="sx"){
            blueLine=true;
        }
        
       
        var lineColors=["rgb(255,0,0)","rgb(17,118,12)","rgb(0,0,255)","rgb(246,108,7)","rgb(0,114,255)","rgb(193,7,246)","rgb(172,19,30)","rgb(77,229,247)"];
        this.tableBody.append("<canvas width='"+this.dataTable.width()+"' height='"+this.dataTable.height()+"px' style='position:absolute;top:0px;background:transparent;'></canvas>");
        var c=this.tableBody.children("canvas")[0];
        var ctx=c.getContext("2d");
        ctx.lineWidth=1.0;
        for(var i=0;i<blockNum;i++){
            if(!blueLine)
                ctx.strokeStyle=lineColors[i];
            else
                ctx.strokeStyle="rgb(0,0,255)";
            ctx.beginPath();
            var blockItems=this.tableBody.find("span[block^='block"+i+"']");
            blockItems.each(function(index){
                    var item=$(this);
                   // if(item.attr("block")=="block"+index){
                        var x=item.position().left+item.width()/2+1;
                        var y=item.position().top+item.height()/2;
                        if(index==0){
                            ctx.moveTo(x,y);
                        }else{
                            ctx.lineTo(x,y);
                            ctx.moveTo(x,y);
                        }
                //    }
            });
            ctx.stroke();
            ctx.closePath();
        }
    }
    return tableDiv;//new 返回table，即new DataTable就是table
}
var contentCache={};
function showTable(json){
   // try{
        var trendArea=$("#trendArea");//.css({width:json.width+"px",height:json.height+"px"});
//        trendArea.children().hide();
        //trendArea.css({width:"0px"});
        var indexName=json.index;
        if(!json.fromCache){
            var table=new DataAnaTable(json);
            if(indexName!="base"&&indexName!="other"&&indexName!="sameNum"&&indexName!="sameTail"&&indexName!="lianHao"){
                table.showFooter=true;
            }
            table.css({height:json.height+"px"});
            trendArea.append(table);
            table.createHead();
            table.loadData();
            if(table.showFooter){
                table.loadSum();
            }
            if(!(indexName=="base"||indexName=="other"||indexName=="w5"||indexName=="w6"||indexName=="w7"||indexName=="lianHao"||indexName=="sameNum"||indexName=="sameTail")){
                table.showTrendLine();
            }
            
            table.css({width:(table.width+30)+"px"});//调整宽度，否则横向拖动内容时无法滚动
            contentCache[indexName]=table;            
        }else{
            var table=contentCache[indexName];
            trendArea.append(table.show());
            //trendArea.css({width:json.width+"px"});//调整宽度，否则横向拖动内容时无法滚动
        }
//    }catch(e){
//        alert(e);
//    }
}
