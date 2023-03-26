let URL  = "../../../../Backend/Collection/book.php";
let jwt = sessionStorage.getItem("token");
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
        renderTable(jsonData)
})}
function renderTable(data) {
    data.forEach(element => {
        let root = document.getElementById("book-table");
        let row = document.createElement("tr");
        let id = document.createElement('td');
        let title = document.createElement('td');
        let author = document.createElement('td')
        let price = document.createElement('td')
        let description = document.createElement('td')
        let image = document.createElement('td')
        let update = document.createElement('td')
        let del = document.createElement('td')
        let view = document.createElement('td')

        let update_icon = document.createElement("img");
        update_icon.src = "../assert/update.png";
        update_icon.style="width: 2em; height: 2em";

        let del_icon = document.createElement("img");
        del_icon.src = "../assert/delete.png";
        del_icon.style="width: 2em; height: 2em";

        
        let view_icon = document.createElement("img");
        view_icon.src = "../assert/view.png";
        view_icon.style="width: 2em; height: 2em";

        title.textContent = element.title;
        author.textContent = element.author;
        price.textContent = element.price + "$";
        description.textContent = element.description;
        image.textContent = element.image;
        id.textContent = element.id;

        id.style= "border : 1px solid;width: 3em;text-align: center"
        title.style =  "border : 1px solid; width: 5em"
        author.style = "border : 1px solid;width: 4em"
        price.style = "border : 1px solid;width: 3em; text-align: center"
        description.style = "border : 1px solid; max-width: 10em";
        description.style.overflow = "hidden";
        image.style= "border : 1px solid; max-width: 5em";
        update.style = "width: 3em; border : 1px solid; text-align: center"
        del.style = "width: 3em; border : 1px solid; text-align: center"
        view.style = "width: 3em; border : 1px solid; text-align: center"
        del.onclick = function(){
            localStorage.setItem("bookIdToDelete", element.id);
            openDeleteDialog(element.id);
        }
        view.onclick = function () {
            openViewDialog();
            viewBook(element);
        }
        update.onclick = function() {
            openUpdateDialog();
            updateBook(element);
        }

        row.style="max-height: 3em"
        row.appendChild(id)
        row.appendChild(title)
        row.appendChild(author)
        row.appendChild(price)
        row.appendChild(description)
        row.appendChild(image)
        update.appendChild(update_icon);
        del.appendChild(del_icon);
        view.appendChild(view_icon);
        row.appendChild(update)
        row.appendChild(del)
        row.appendChild(view)
        root.appendChild(row);
    });
}

loadJson();

function addBook() {
    window.location.replace("addBook.html");
}

var deleteDialog = document.getElementById("deleteDialog");
var viewDialog = document.getElementById("viewDialog");
var updateDialog = document.getElementById("updateDialog");
deleteDialog.close();
viewDialog.close();
updateDialog.close()
function openDeleteDialog() { 
    if(!deleteDialog.open) deleteDialog.showModal();
}
function openViewDialog() { 
    if(!viewDialog.open) viewDialog.showModal();
}
function openUpdateDialog() { 
    if(!updateDialog.open) updateDialog.showModal();
}

function cancelDel() {
    deleteDialog.close();
}

function viewDel() {
    viewDialog.close();
}

function updateDel() {
    updateDialog.close();
    let addConfirm = document.getElementsByClassName("update-close")[0];
    addConfirm.removeChild(addConfirm.lastChild);
}

function cancelDel() {
    deleteDialog.close();
}

function deleteBook() {
    let id = localStorage.getItem("bookIdToDelete");
    fetch(URL+`?id=${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
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
    alert(jsonData.message);
    location.reload();
})
}

function viewBook(book) {
    let cover = document.getElementById("view-cover");
    let title = document.getElementById("view-title");
    let author = document.getElementById("view-author");
    let price = document.getElementById("view-price");
    let desc = document.getElementById("view-desc");
    let image = document.getElementById("view-image");

    cover.src = book.image;
    title.textContent = book.title;
    author.textContent = book.author;
    price.textContent = book.price + "$"
    desc.textContent = book.description
    image.textContent = book.image
}

function updateBook(book) {
    let cover = document.getElementById("update-cover");
    let title = document.getElementById("update-title");
    let author = document.getElementById("update-author");
    let price = document.getElementById("update-price");
    let desc = document.getElementById("update-desc");
    let image = document.getElementById("update-image");

    cover.src = book.image;
    title.value = book.title;
    author.value = book.author;
    price.value = book.price;
    desc.value = book.description
    image.value = book.image
    let data = {
        image: image.value,
        title: title.value,
        author: author.value,
        price: price.value,
        description: desc.value
    }
    let addConfirm = document.getElementsByClassName("update-close")[0];
    let confirmbtn = document.createElement("button");

    confirmbtn.textContent = "update";
    confirmbtn.onclick = function() {
        sendUpdate(book.id);
        location.reload();
    }
    addConfirm.appendChild(confirmbtn);
}

function sendUpdate(id) {
    let title = document.getElementById("update-title");
    let author = document.getElementById("update-author");
    let price = document.getElementById("update-price");
    let desc = document.getElementById("update-desc");
    let image = document.getElementById("update-image");
    let data = {
        id: id,
        image: image.value,
        title: title.value,
        author: author.value,
        price: price.value,
        description: desc.value
    }
    fetch(URL, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            Authorization: jwt,
        }, body: JSON.stringify(data)})
.then(response => {
    return response.json();
})
.then(jsonData => {
    alert(jsonData.message);
    location.reload();
})
}