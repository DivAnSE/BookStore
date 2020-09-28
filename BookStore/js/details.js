//显示商品相关信息
function showBook() {
    var book = JSON.parse(localStorage.getItem("goodsDetails"));
    var bookimg = document.getElementById("img");
    var bookName = document.getElementById("bookName");
    var price = document.getElementById("price");
    bookName.innerHTML = book.name;
    bookimg.src = book.img;
    price.innerHTML = book.price;
}
showBook();

//加入购物车
function addToCart() {
    var currentBook = JSON.parse(localStorage.getItem("goodsDetails"));
    var BookImg = currentBook.img;
    var BookName = currentBook.name;
    var BookPrice = currentBook.price;
    var bookItem = localStorage.getItem("goods");
    //判断是否登录
    //判断是否已登录
    var f = IsLogin();
    if (f) {
        var mybooks = { //书籍对象
            name: BookName,
            img: BookImg,
            price: BookPrice,
            num:1,
            subtotal:BookPrice
        };
        console.log(mybooks);
        if (bookItem == null) {
            var arr = [];
            arr.push(mybooks);
            localStorage.setItem("goods", JSON.stringify(arr));
        } else {
            var books = JSON.parse(localStorage.getItem("goods"));
            books.push(mybooks);
            localStorage.setItem("goods", JSON.stringify(books));
        }
    }else{
        alert("请前往登录！");
        location.href="./login.html";
    }
}

//是否已登录
function IsLogin() {
    var flag = false;
    var user = JSON.parse(localStorage.getItem("userInfo"));
    if (user != null) {
        flag = true;
    }
    return flag;
}