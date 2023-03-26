var bookArray = [];
const URL = "../../../../Backend/Collection/book.php";
let jwt = sessionStorage.getItem("token");
const storedList = new Set();
function loadJson() {
    fetch(URL, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            Authorization: jwt,
        }})
    .then(response => {
        return response.json();
    })
    .then(jsonData => {
        // let bookList = [];
        // bookList = jsonData.books;
        let it = 0;
        jsonData.forEach(element => {
            let temp = document.getElementsByClassName("bookList");
            let newCard = document.createElement('div');
            let newImg = document.createElement('img');
            let newBody = document.createElement('div');
            let newTitle = document.createElement('h4');
            let newDes = document.createElement('tooltip');
            let newButton = document.createElement('button');
            newCard.className = 'card';
            newTitle.className = 'card-title';
            newBody.className = 'card-body';
            newDes.className = 'tooltip';
            newImg.src = element.image;
            newImg.style.height = "350px"
            newBody.style = ""
            newButton.style = "  background-color: #4CAF50;border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;"
            newTitle.textContent = element.title;
            newDes.textContent = element.description;
            newButton.textContent = "Detail";
            newButton.onclick=(()=> {
                window.location.href = "detail.html?name=" + element.title;
            })
            
            newBody.appendChild(newTitle);
            newCard.appendChild(newImg);
            newCard.appendChild(newBody);
            newCard.appendChild(newButton);
            temp[it%3].appendChild(newCard);
            ++it;

        });
    })
}

loadJson();

function searchOnAction() {
    let p = document.getElementById("searchPattern").value
    window.location.replace("searchBook.html?search="+p);
}



