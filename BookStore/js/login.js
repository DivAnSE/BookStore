//服务器地址
var ip = "192.168.0.254:8888/";
//创建httprequst
function createRequst() {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}
function checkUser(){
    var httpRequest = createRequst();
    var name = document.getElementById("userName").value;
    var psw = document.getElementById("password").value;
    httpRequest.open("GET", "http://192.168.0.254:8888/login?username=" + name + "&password=" + psw);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            localStorage.setItem("userInfo",httpRequest.responseText);
            location.href="./index.html"
        }
    }
    httpRequest.send();
}