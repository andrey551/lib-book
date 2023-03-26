const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchPattern = urlParams.get('name')
const URL = "../../../../Backend/Collection/book-detail.php";
let jwt = sessionStorage.getItem("token");
function loadData(){
    fetch(URL+ `?name=${searchPattern}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            Authorization: jwt,
        }})
    .then(
        response => {
            return response.json();
        }
    )
    .then (
        bookDetail=>{
            document.getElementById("book-cover").src = bookDetail[0][0].image;
            document.getElementById("book-title").textContent = bookDetail[0][0].title;
            document.getElementById("book-description").textContent = bookDetail[0][0].description;
            document.getElementById("book-author").textContent = bookDetail[0][0].author;
            document.getElementById("book-price").textContent = bookDetail[0][0].price;
            let root = document.getElementsByClassName("older-comment")[0];
            bookDetail[0][1].forEach(element => {
                let row = document.createElement("div");
                let d1 = document.createElement("div");
                let d2 = document.createElement("div");
                let user = document.createElement("b");
                user.textContent = element.user_name;
                let temp = document.createElement("text")
                temp.textContent = " commented:";
                let comment = document.createElement("text");
                comment.textContent = element.comment;
                d1.appendChild(user);
                d1.appendChild(temp);
                d2.appendChild(comment);
                row.appendChild(d1);
                row.appendChild(d2);
                row.style = "margin: 2em, border: 1px solid";
                root.appendChild(row);
            });
        }
    )
}

loadData();

function addComment() {
    let comment = document.getElementById("my-comment").value;
    let username = localStorage.getItem("username")
    let bookname = document.getElementById("book-title").textContent
    fetch(URL, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            Authorization: jwt,
        },
        body: JSON.stringify({comment : comment,
            username: username,
            bookname: bookname
        })

    })
    .then(
        response => {
            return response.json();
        }
    )
    .then (
        bookDetail=>{
            alert(bookDetail.message);
            window.location.reload();
        }
    )
}