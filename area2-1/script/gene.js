// 1920*1080 *4
// 7690*4320
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
function drawCover(svg){
    var g = svg.append("g");
    var cover=g.append("rect")
    .attr("id","cover")
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill","#FFFFFF")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill-opacity",1);//透明度
    var animateY=cover.append("animate")
    .attr("id","animate1")
    .attr("attributeName","y")
    .attr("dur",String(speed)+'s')
    .attr("from",0)
    .attr("to",svgHeight)
    .attr("repeatCount","indefinite");
    return cover;
}
//var svgContainer1,g1= createD3svg(1);
// g标签中分别添加rect和text 标签
//loopDraw(g1,baseChains);
//document.getElementById('animationSpeed').value=speed;

//添加遮罩 设置动画


//改变动画速度
function changeAnimation(){
    speed=document.getElementById('animationSpeed').value;
    speed=String(speed);
    //console.log(speed)//
    svgContainer.text('');
    drawCover(svgContainer);
}
function addSpeed(){
    speed=Number(speed)-1;
    if(speed==0){
        speed=1;
    }
    document.getElementById('animationSpeed').value=speed;
    svgContainer.text('');
    drawCover(svgContainer);

}
function subSpeed(){
    speed=Number(speed)+1;
    document.getElementById('animationSpeed').value=speed;
    svgContainer.text('');
    drawCover(svgContainer);  
}

//服务器地址
const url = "http://10.10.30.46:5000/get_chro_api.php";
const gene_url = "http://10.10.30.46:5000/get_count_api.php";
//发送数据请求并接收数据
function requestData(a, b) {
    //从文本框中获取需要的第a至b个碱基序列
    requestCnt = b - a + 1;
    var data = {
        "chroname": chrName,
        "start": a,
        "end": b
    };
    console.log(["requestData:", chrName, a, b]);
    data = JSON.stringify(data);
    // console.log(data);
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        dataType: "json",
        timeout: 1000,
        success: function(data) {
            console.log(["receive",data]);
            //统一为大写字母
            //baseChain = data.genes.toUpperCase();
            // console.log(baseChain);
            //beginPoint = a;
            //console.log("beginPoint:" + beginPoint);
            //reDraw(baseChain.length);
        },
        error: function(xhr, status, statusText) {
            console.log(["error, HTTP:", xhr.status]);
            baseChain = "NNNNNATCGATCGANNNTCGATCGCGATCGANNNTCGATCGCGATCGANNNTCGATCGCGATCGANNNTCGATCGCGATCGANNNTCGATCG";
            //reDraw(baseChain.length);
        },
        complete: function(XMLHttpRequest, status) {　
            beginPoint = a;　
            if (status == 'timeout') {
                console.log("timeout");　　
            }　　
        }
    });
}

//创建websocket连结 by 王陈
var target='all';
var users={};
var ws_url='ws://10.10.30.46:6001';
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
var g1=d3.select("body").append("div")
.attr("id","div1")
.style("height","50%")
var img=g1.append("img")
.attr("src","src/test.png")
.style("position","absolute")
.style("z-index","1")
.style("height","50%");

var svgContainer = g1
        .append("svg")
        .attr("id","svgCover")
        .attr("id","svgContainer1")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
var cover=drawCover(svgContainer);

var chrName="chrI";
requestData(333, 444);