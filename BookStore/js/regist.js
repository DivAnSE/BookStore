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

//验证手机号、邮箱
function checkContact(obj) {
    var contact = obj.value;
    var tips = document.getElementsByClassName("tip");
    var Tel = /^1[3 5 7 8]+[0-9]{9}$/.test(contact);
    var Email = /^\w{2,8}@[a-z A-Z 0-9]{3，6}\.com$/.test(contact);

    Tel || Email ? tips[0].innerHTML = "√" : tips[0].innerHTML = "×";
}

//校验密码
function checkPsw(obj) {
    var tips = document.getElementsByClassName("tip");
    var flag = /^[a-z A-Z 0-9]{8,10}$/.test(obj.value);
    flag ? tips[1].innerHTML = "√" : tips[1].innerHTML = "×";
}

//重复密码
function checkRepeatPsw(obj) {
    var tips = document.getElementsByClassName("tip");
    var psw = document.getElementById("password").value;
    if (obj.value == psw) {
        tips[2].innerHTML = "√";
    } else {
        tips[2].innerHTML = "×";
    }
}

//注册,用户信息传至后台,跳转至登录页
function registBtn() {
    var tips = document.getElementsByClassName("tip");
    var flag = true;
    for (var i = 0; i < tips.length; i++) {
        if (tips[i].innerHTML == "√") {
            flag = true;
        } else {
            flag = false;
        }
    }
    if (flag) {
        alert("注册成功，请登录！")
        var httpRequest = createRequst();
        var contact = document.getElementById("contact").value;
        var password = document.getElementById("password").value;
        console.log(contact,password);
        httpRequest.open("GET", "http://192.168.0.254:8888/regsterUser?username=" + contact + "&password=" + password);
        httpRequest.send();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                location.href="./login.html"
            }
        }
    } else {
        alert("信息填写有误，请校验相关信息！");
    }
}