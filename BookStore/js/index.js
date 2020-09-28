var ip = "http://192.168.0.254:8888/";
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
//获取后台数据，放到页面
function getBgInfo() {
    var httpRequst = createRequst();
    httpRequst.open("get", ip + "getBooks");
    httpRequst.send();
    httpRequst.onreadystatechange = function () {
        if (httpRequst.readyState == 4 && httpRequst.status == 200) {
            var book = JSON.parse(httpRequst.responseText);
            var imageUrl = document.getElementsByClassName("img");
            var bookName = document.getElementsByClassName("bookName")
            var price = document.getElementsByClassName("price");
            for (var i = 0; i < imageUrl.length; i++) {
                imageUrl[i].src = "http://192.168.0.254:8888/" + book[i].img;
                price[i].innerHTML = book[i].price;
                bookName[i].innerHTML = book[i].name;
            }

            //侧边广告
            var asideImg = document.getElementsByClassName("aside_ads");
            for (var j = 0; j < asideImg.length; j++) {
                asideImg[j].children[0].src = "http://192.168.0.254:8888/" + book[j].img;
            }
        }
    }
}
getBgInfo()
//加入购物车
function addToCart() {
    var btn = document.getElementsByClassName("addToCart");
    for (var i = 0; i < btn.length; i++) {
        btn[i].onclick = function () {
            var Book = this.parentElement;
            var chils = Book.children;
            var BookImg = Book.parentElement.children;
            var BookName = chils[1].innerHTML;
            var BookPrice = chils[0].children[1].innerHTML;
            // var bookItem = JSON.parse(localStorage.getItem("goods"));

            //判断是否已登录
            var f = IsLogin();
            if (f) {
                var mybooks = { //书籍对象
                    name: BookName,
                    img: BookImg[0].src,
                    price: BookPrice,
                    num: 1,
                    subtotal: BookPrice
                };
                if (localStorage.getItem("goods") == null) {
                    var arr = [];
                    arr.push(mybooks);
                    localStorage.setItem("goods", JSON.stringify(arr));
                } else {
                    var books = JSON.parse(localStorage.getItem("goods"));
                    books.push(mybooks);
                    localStorage.setItem("goods", JSON.stringify(books));
                }

                //点击添加购物车动画
                var tips = this.nextElementSibling;
                tips.style.transition = "all 0.5s"
                tips.style.opacity = "1";
                setTimeout(function () {
                    tips.style.opacity = "0";
                }, 1500);
            } else {
                alert("请前往登录")
                location.href = "./login.html";
            }
        }
    }
}
addToCart();

//进入详情页
function IntoDetails() {
    var image = document.getElementsByClassName("img");
    var len = image.length;
    for (var i = 0; i < len; i++) {
        image[i].onclick = function () { //点击获取当前商品的图片、名字、价格
            var Book = this.nextElementSibling;
            var chils = Book.children;
            var BookImg = this.src;
            var BookName = chils[1].innerHTML;
            var BookPrice = chils[0].children[1].innerHTML;
            var arr = {
                name: BookName,
                img: BookImg,
                price: BookPrice,
                num: 1
            };
            localStorage.setItem("goodsDetails", JSON.stringify(arr));
            location.href = "./details.html"
        }
    }
}
IntoDetails();

//是否已登录
function IsLogin() {
    var flag = false;
    var user = JSON.parse(localStorage.getItem("userInfo"));
    if (user != null) {
        flag = true;
    }
    return flag;
}

//图片轮播
//获取图片，全局变量index指向，=显示，!=隐藏
var index = 0;
var len = 0;

function getImages() {
    var p = document.getElementById("img_wrap")
    var httpRequst = createRequst();
    httpRequst.open("get", ip + "showImages");
    httpRequst.send();
    httpRequst.onreadystatechange = function () {
        if (httpRequst.readyState == 4 && httpRequst.status == 200) {
            var imgs = JSON.parse(httpRequst.responseText);
            len = imgs.length;
            for (var i = 0; i < len; i++) {
                var imageElement = document.createElement("img");
                var m = p.appendChild(imageElement);
                m.src = "http://192.168.0.254:8888/" + imgs[i].img;
                m.className = "img_wrap";
                console.log(imgs);
            }
        }
    }
}
getImages();

function setImg() {
    var image = document.getElementsByClassName("img_wrap");
    for (var i = 0; i < len; i++) {
        if (index == i) {
            image[i].style.display = "block"
            image[i].style.animation = "fadeIn 2s";
        } else {
            image[i].style.animation = "fadeout 0s";
            image[i].style.display = "none"
        }
    }
}
//小圆点
function setCircle(index) {
    var circles = document.getElementsByClassName("circle");
    for (var i = 0; i < circles.length; i++) {
        if (index == i) {
            circles[i].style.backgroundColor = "yellow";
        } else {
            circles[i].style.backgroundColor = "black";
        }
    }
}
//轮播周期
setInterval(function () {
    index++;
    if (index > len - 1) {
        index = 0;
    }
    setImg();
    setCircle(index);
}, 5000)