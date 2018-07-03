// 1920*1080 *4
// 7690*4320
//碱基对序列
var baseChain =
    "CCACACCACcACACCcCACC";
var baseChains=new Array();
baseChains[0]="cBCCBBBBBBBBCCCACACACCCAC";
baseChains[1]="CTACACCACACCCACACACCCAC";
baseChains[2]="CCAGTCACCACACCCACACACCCAC";
baseChains[3]="CCACACCTGACACCCACACACCCAC";


//键值对 对应碱基对
var baseOp = {
    'T': 'A',
    'G': 'C',
    'C': 'G',
    'A': 'T'
};
//键值对 碱基和对应颜色
var colorRange = {
    'A': '#0099CC', // blue
    'C': '#66CC66', // green
    'G': '#CC99CC', // purple
    'T': '#FF6666', // red
};
//网页高宽
var winHeight, winWidth;
// svg宽高
var svgHeight, svgWidth;
//获取网页宽高并修改svg宽高

function getWinSize() {
    winHeight = window.screen.height;
    winWidth = window.screen.width;
    bodyHeight = document.body.clientHeight;
    bodyWidth = document.body.clientWidth;
    svgHeight = bodyHeight /2;
    svgWidth = bodyWidth;
    document.getElementById("width").innerHTML = winWidth;
    document.getElementById("height").innerHTML = winHeight;
    document.getElementById("body").innerHTML = bodyWidth + 'X' + bodyHeight;
}
//三级显示的两个临界值
var criticalValue = [500, 100];
getWinSize();
//碱基大小，页宽/碱基个数svgWidth / baseChain.length
var baseSize = svgWidth / 50;
var baseHeight = svgHeight / 20;
// console.log(baseSize);
//所画的第一个碱基的序号
var beginPoint = 0;////////////////////
var speed=8;//动画速度

//当浏览器大小改变时，重新获取宽高，修改svg大小、重画、网页刷新
$(window).resize(function() {
    getWinSize();
    svgContainer.attr("width", svgWidth).attr("height", svgHeight);
    loopDraw();
    // location.reload();
});
//创建D3 SVG
function createD3svg(id) {
    getWinSize();
    // console.log([svgWidth, svgHeight]);
    var svgContainer = d3.select("body")
        .append("svg")
        .attr("id",id)
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    var g = svgContainer.append("g");
    return svgContainer,g;
}
//参数svg，长方形的左上角坐标（x，y），碱基大小baseSize，碱基类型base，正反链标志type
function drawRect(svgContainer,x,y,baseSize,base,type,rectID){
    svgContainer.append("rect")
    .attr("id",rectID)
    .attr("x", x)
    .attr("y", y)
    .attr("width", baseSize)
    .attr("height", baseHeight)
    .attr("fill", colorRange[base])
    svgContainer.append('text')
        .text(base)
        .attr('fill', 'white')
        .attr('x', x + baseSize / 2)
        .attr('y', y + baseHeight / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', baseHeight / 2 + 'px')
        .attr('dy', baseHeight / 4);
}
// 调用drawRect画出所有的碱基
// 可根据需求添加参数
function loopDraw(g,data){
    var rectID = 0;

    var y=0;
    for (index in data){
        for (var i=0,x=0;i<data[index].length;i++,x+=baseSize){
            var position=i+beginPoint;
            drawRect(g,x,y,baseSize,data[index][position],1,rectID);
            rectID=rectID+2;
        }
        y=y+baseHeight*1.1;
    }
    var cover=g1.append("rect")
    .attr("id","cover")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill", "#FFFFFF")
    .attr("z-index",9999)
    .attr("fill-opacity",1)
    var animateY=cover.append("animate")
    .attr("id","animate1")
    .attr("attributeName","y")
    .attr("dur",String(speed)+'s')
    .attr("from",0)
    .attr("to",svgHeight)
    .attr("repeatCount","indefinite")

}


var svgContainer1,g1= createD3svg(1);

// g标签中分别添加rect和text 标签
loopDraw(g1,baseChains);
document.getElementById('animationSpeed').value=speed;
// addZoom(svgContainer, g);
// enableDrag(svgContainer, g);
//添加遮罩 设置动画

//增减宽度
function addWidth(){
    baseSize=baseSize+1;
    g1.text('');
    loopDraw(g1,baseChains);
}
function subWidth(){
    baseSize=baseSize-1;
    g1.text('');
    loopDraw(g1,baseChains);
}
//改变动画速度
function changeAnimation(){
    speed=document.getElementById('animationSpeed').value;
    speed=String(speed);
    //console.log(speed)//
    g1.text('');
    loopDraw(g1,baseChains);
}
function addSpeed(){
    speed=Number(speed)-1;
    if(speed==0){
        speed=1;
    }
    document.getElementById('animationSpeed').value=speed;
    g1.text('');
    loopDraw(g1,baseChains); 
}
function subSpeed(){
    speed=Number(speed)+1;
    document.getElementById('animationSpeed').value=speed;
    g1.text('');
    loopDraw(g1,baseChains);   
}

//创建websocket连结 by 王陈
    var target='all';
    var users={};
    var ws_url='ws://127.0.0.1:6001';
    var so=false,n=false;
function start(){
    n = 1;
    if(!n){ 
        return ;   
    }
    //创建socket，注意URL的格式：ws://ip:端口
    so=new WebSocket(ws_url);
    //握手监听函数
    so.onopen=function(){
    //状态为1证明握手成功，然后把client随机生成的名字发送过去
    if(so.readyState==1){
        so.send('type=add&area='+n);
    }
}
//握手失败或者其他原因连接socket失败，则清除so对象并做相应提示操作
so.onclose=function(){
    so=false;
    // lct.appendChild(A.$$('<p class="c2">连接WebSocket服务器失败</p>'));
    console.log("连接WebSocket服务器失败");
}
//数据接收监听，接收服务器推送过来的信息，返回的数据给msg，然后进行显示
so.onmessage=function(msg){
    eval('var data='+msg.data);
    console.log(data);
    var obj=false,c=false;
    if(data.type=="update"){
    //刷新外环形
    console.log("update:"+data);
}
}
}

        //发送data给第3区
        //so.send('type=update&from=1&target=3'+'&msg='+esc(data));
        //}
            
        //编码过程
        //function esc(da){
        //    da=da.replace(/</g,'<').replace(/>/g,'>').replace(/\"/g,'"');
        //    return encodeURIComponent(da);
        //}