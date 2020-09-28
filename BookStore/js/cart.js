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

//商品放入购物车
function getBooks() {
    //获取本地存储
    var book = JSON.parse(localStorage.getItem("goods"));
    var tab = document.getElementById("table");
    for (var i = 0; i < book.length; i++) {
        var tr = tab.insertRow();
        tr.insertCell().innerHTML = i + 1;
        tr.insertCell().innerHTML = "<input type='checkbox' class='bookItem'>";
        tr.insertCell().innerHTML = '<img src="' + book[i].img + '">' + '<span>' + book[i].name + '</span>';
        tr.insertCell().innerHTML = book[i].price;
        tr.insertCell().innerHTML = '<i class="fa fa-minus-circle reduce" aria-hidden="true"></i><span class="number">' + book[i].num + '</span><i class="fa fa-plus-circle add" aria-hidden="true"></i>';
        tr.insertCell().innerHTML = '<span class="subtotal">' + book[i].subtotal + '</span>';
        tr.insertCell().innerHTML = '<div class="del" onclick="removeBook(this)">删除</div>';
    }
}
getBooks();

//全选、不全选
function checkAllBooks() {
    var bookCheckbox = document.getElementsByClassName("bookItem");
    var chackAll = document.getElementById('checkAll');
    var len = bookCheckbox.length;
    if (chackAll.checked == true) {
        for (var i = 0; i < len; i++) {
            bookCheckbox[i].checked = true;
        }
    }
    if (!chackAll.checked) {
        for (var j = 0; j < len; j++) {
            bookCheckbox[j].checked = false;
        }
    }
    getTatolNum();
    getTatolAmount();
}

//不全选
function notCheckAll() {
    var bookCheckbox = document.getElementsByClassName("bookItem");
    var checkAll = document.getElementById('checkAll');
    for (var i = 0; i < bookCheckbox.length; i++) {
        bookCheckbox[i].onclick = function () {
            var flage = true;
            if (!this.checked) {
                checkAll.checked = false;
            }
            for (var j = 0; j < bookCheckbox.length; j++) {
                if (!bookCheckbox[j].checked) {
                    flage = false;
                }
            }
            if (flage) {
                checkAll.checked = true;
            } else {
                checkAll.checked = false;
            }
            getTatolNum();
            getTatolAmount();
        }
    }

}
notCheckAll();

//商品总数
function getTatolNum() {
    var tatolNumber = document.getElementById("totalnum")
    var bookCheckbox = document.getElementsByClassName("bookItem");
    var cnt = 0;
    for (var i = 0; i < bookCheckbox.length; i++) {
        if (bookCheckbox[i].checked == true) {
            cnt++;
        }
    }
    tatolNumber.innerHTML = cnt;
}

//数量加、减
function changNumber() {
    var book = JSON.parse(localStorage.getItem("goods"));
    var addBook = document.getElementsByClassName("add");
    var reduceBook = document.getElementsByClassName("reduce");
    var subtotal = document.getElementsByClassName("subtotal");
    var bookNum = document.getElementsByClassName("number");
    var len = book.length;
    for (var i = 0; i < len; i++) {
        addBook[i].index = i;
        reduceBook[i].index = i;
        //数量加
        addBook[i].onclick = function () {
            if (Number(bookNum[this.index].innerHTML) < 10) {
                bookNum[this.index].innerHTML = Number(bookNum[this.index].innerHTML) + 1;
                book[this.index].num = Number(bookNum[this.index].innerHTML);
                book[this.index].subtotal = Number(book[this.index].price) * Number(book[this.index].num);
                subtotal[this.index].innerHTML = book[this.index].subtotal;
                localStorage.setItem("goods", JSON.stringify(book));
                getTatolAmount();
            }
        }

        //数量减
        reduceBook[i].onclick = function () {
            if (Number(bookNum[this.index].innerHTML) > 1) {
                bookNum[this.index].innerHTML = Number(bookNum[this.index].innerHTML) - 1;
                book[this.index].num = Number(bookNum[this.index].innerHTML);
                book[this.index].subtotal = Number(book[this.index].price) * Number(book[this.index].num);
                subtotal[this.index].innerHTML = book[this.index].subtotal;
                localStorage.setItem("goods", JSON.stringify(book));
                getTatolAmount();
            }
        }
    }
}
changNumber();
//总金额
function getTatolAmount() {
    var book = JSON.parse(localStorage.getItem("goods"));
    var tatolAmount = document.getElementById("amount");
    var len = book.length;
    var sum = 0;
    var checkedBook = document.getElementsByClassName("bookItem");
    for (var j = 0; j < checkedBook.length; j++) {
        if (checkedBook[j].checked) {
            sum += Number(book[j].subtotal);
        }
        tatolAmount.innerHTML = sum;
    }
}

//删除
function removeBook(obj) {
    var lineindex = obj.parentNode.parentNode.rowIndex;
    var tab = document.getElementById("table");
    //删table
    tab.deleteRow(lineindex);


    //删存储
    var book = JSON.parse(localStorage.getItem("goods"));
    book.splice(lineindex - 1, 1);
    console.log(book);
    localStorage.setItem("goods", JSON.stringify(book))

    getTatolNum();
    getTatolAmount();
}

//结算
function toSettlement() {
    var bookCheckbox = document.getElementsByClassName("bookItem");
    for (var i = bookCheckbox.length - 1; i >= 0; i--) {
        if (bookCheckbox[i].checked) {
            var tab = document.getElementById("table");
            //删table
            tab.deleteRow(i+1);


            //删存储
            var book = JSON.parse(localStorage.getItem("goods"));
            book.splice(i, 1);
            console.log(book);
            localStorage.setItem("goods", JSON.stringify(book))
        }
    }
    getTatolNum();
    getTatolAmount();
}