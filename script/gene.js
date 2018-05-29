// 1920*1080 *4
// 7690*4320
//碱基对序列
var baseChain =
    "CCACACCACACCCACACACCCAC";
var baseChains=new Array();
baseChains[0]="CCACACCACACCCACACACCCAC";
baseChains[1]="CCACACCACACCCACACACCCAC";
baseChains[2]="CCACACCACACCCACACACCCAC";
baseChains[3]="CCACACCACACCCACACACCCAC";
baseChains[4]="CCACACCACACCCACACACCCAC";
baseChains[5]="CCACACCACACCCACACACCCAC";
baseChains[6]="CCACACCACACCCACACACCCAC";
baseChains[7]="CCACACCACACCCACACACCCAC";
baseChains[8]="CCACACCACACCCACACACCCAC";
baseChains[9]="CCACACCACACCCACACACCCAC";
baseChains[10]="CCACACCACACCCACACACCCAC";
baseChains[11]="CCACACCACACCCACACACCCAC";
baseChains[12]="CCACACCACACCCACACACCCAC";
baseChains[13]="CCACACCACACCCACACACCCAC";
baseChains[14]="CCACACCACACCCACACACCCAC";
baseChains[15]="CCACACCACACCCACACACCCAC";
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
    svgHeight = bodyHeight / 2;
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
var baseHeight = svgHeight / 16;
// console.log(baseSize);
//所画的第一个碱基的序号
var beginPoint = 0;////////////////////

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
        .attr('y', y + baseSize / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', baseSize / 2 + 'px')
        .attr('dy', baseSize / 4);
}
// 调用drawRect画出所有的碱基
// 可根据需求添加参数
function loopDraw(g){
        var rectID = 0;
    for (var i = 0, x = 0, y = 0; i < baseChain.length; i++, x += baseSize) {
        var position = i + beginPoint;
        //正、反链
        drawRect(g, x, y, baseSize, baseChain[position], 1, rectID);
        rectID = rectID + 2;
    }
}


var svgContainer,g= createD3svg(1);

// g标签中分别添加rect和text 标签
loopDraw(g);

// addZoom(svgContainer, g);
// enableDrag(svgContainer, g);
g.append("rect")
    .attr("id",55)
    .attr("x", 33)
    .attr("y", 33)
    .attr("width", 99)
    .attr("height", 99)
    .attr("fill", "red")