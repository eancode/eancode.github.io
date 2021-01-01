var base = "http://49.232.208.61:9191/getResource/public/jsonp/data";

function search(c)
{
	document.getElementById("ean_code").value = c; 
	document.getElementById("submitbutton").click();
}

var en = function (hex) {
    var arr = hex.split("")
    var out = ""
    for (var i = 0; i < arr.length / 2; i++) {
        var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]
        var charValue = String.fromCharCode(tmp);
        out += charValue
    }
    return out
};


var zh = function (hex) {
	var tmp ="";
	for (var i = 0; i < hex.length / 2; i++) {
    tmp += "%"+ hex[i * 2] + hex[i * 2 + 1]
  }
    var v = decodeURI(tmp);
    return v;
};


function u(hex) {
    var arr = hex.split(",");
    var out = ""
    for (var i = 0; i < arr.length; i++) {
        var tmp = "";
        var code = arr[i];
        if(6 == code.length)
        	tmp = zh(r(code));
        else
        	tmp = en(r(code));
        out += tmp;
    }
    return out;
};
 
var r = function(s)
{
	if(!s)
		s="";
	return s.split('').reverse().join('');
}

var h = function (str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "")
            val = str.charCodeAt(i).toString(16);
        else
            val += str.charCodeAt(i).toString(16);
    }
    return val
}

let z_json = function (data) 
{
	if(data && data[0]){
		var a0 = en(r(data[0][0]));
		var a1 = u(data[0][1]);
		var a2 = u(data[0][2]);
		var a3 = u(data[0][3]);
		var a4 = u(data[0][4]);
		var a5 = u(data[0][5]);
		var a6 = u(data[0][6]);
		var a7 = u(data[0][7]);
		var a8 = u(data[0][8]);
		var a9 = en(r(data[0][9]));
		var i = '<caption>检索结果</caption><tbody><tr><td>商品条码</td><td>'+a0+
						'</td><td align="right"><a class="vc" title="百度搜索该商品条码" href="https://www.baidu.com/s?wd='+a0+
						'" target="_blank"><img src="static/baidu.png" width="26"></a> <a class="vc" title="360搜索该商品条码" href="https://www.so.com/s?q='+a0+
						'" target="_blank"><img src="static/360.png" width="26"></a> <a class="vc" title="搜狗搜索该商品条码" href="https://www.sogou.com/web?query='+a0+
						'" target="_blank"><img src="static/sogou.png" width="26"></a> <a class="vg" title="百度搜索该厂商或编号" href="https://www.baidu.com/s?wd='+a9+
						'" target="_blank"><img src="static/baidu.png" width="26"></a></td></tr><tr><td>商品名称</td><td>'+a2+
						'</td><td align="right"><a class="vn" title="百度搜索该商品名称" href="https://www.baidu.com/s?wd='+a2+
						'" target="_blank"><img src="static/baidu.png" width="26"> <a class="vn" title="360搜索该商品名称" href="https://www.so.com/s?q='+a2+
						'" target="_blank"><img src="static/360.png" width="26"></a> <a class="vn" title="搜狗搜索该商品名称" href="https://www.sogou.com/web?query='+a2+
						'" target="_blank"><img src="static/sogou.png" width="26"></a></td></tr><tr><td>超市分类</td><td>'+a3+
						'</td><td align="right"></td></tr><tr><td>等级/颜色</td><td>'+a4+
						'</td><td align="right"></td></tr><tr><td>规格/尺寸</td><td>'+a5+
						'</td><td align="right"></td></tr><tr><td>包装/款式</td><td>'+a6+
						'</td><td align="right"></td></tr><tr><td>单位</td><td>'+a7+
						'</td><td align="right"></td></tr><tr><td>市场价</td><td>'+a8+
						'</td><td align="right"></td></tr><tr><td>进货价</td><td>普通用户无法查看</td></td></td><td align="right"></tr></tbody>';
		document.getElementById("result").innerHTML=i;
		
	}
	else
	{
		document.getElementById("result").innerHTML="<tr><td align='center'>抱歉！查无结果。</td></tr>";
	}
} 

function ck(f)
{
	var z = (f.ean_code.value);
	z=h(z);
	var url = base+"/z.json?z="+z;
	$.ajax({
	    url: url,
	    type: 'POST',
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    jsonpCallback: 'z_json'                              
	});
	return false;	
}


let x_json = function(data)
{
	if(data && data[0]){
		var a0 = (data[0][0]);
		document.getElementById("more").innerHTML=u(a0);
	}
	else
	{
		document.getElementById("more").innerHTML="商品条码查询系统";
	}
}

$(function(){

	let url = base+"/x.json";
	$.ajax({
	    url: url,
	    type: 'POST',
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    jsonpCallback: 'x_json'                              
	});


});


