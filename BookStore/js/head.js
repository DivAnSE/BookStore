//是否已登录
function IsLogin() {
    var uname = document.getElementById("login");
    var regist = document.getElementById("regist");
    var w = document.getElementById("welcom");
    var user = JSON.parse(localStorage.getItem("userInfo"));
    if (user.username == "") {
        regist.innerHTML = '免费注册';
        regist.href = "./register.html";
        uname.innerHTML = "登录";
        uname.href = "./login.html";
    } else {
        w.innerHTML = "你好！"
        uname.innerHTML = user.username;
        uname.href = "";
        regist.innerHTML="退出";
        regist.href = "./login.html";
    }
    regist.onclick=function(){
        localStorage.clear();
    }
}
IsLogin();

function ToCart(){
    localStorage.removeItem("goodsDetails");
}