let URL  = "../../../../Backend/Collection/user.php";
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
        let root = document.getElementById("user-table");
        let row = document.createElement("tr");
        let id = document.createElement('td');
        let username = document.createElement('td');
        let fullname = document.createElement('td')
        let email = document.createElement('td')
        let avatar = document.createElement('td')
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

        username.textContent = element.username;
        fullname.textContent = element.fullname;
        email.textContent = element.email;
        avatar.textContent = element.avatar;
        id.textContent = element.id;

        id.style= "border : 1px solid;width: 3em;text-align: center"
        username.style =  "border : 1px solid; width: 5em"
        fullname.style = "border : 1px solid;width: 4em"
        email.style = "border : 1px solid;width: 3em; text-align: center"
        avatar.style = "border : 1px solid; max-width: 10em";
        avatar.style.overflow = "hidden";

        update.style = "width: 3em; border : 1px solid; text-align: center"
        del.style = "width: 3em; border : 1px solid; text-align: center"
        view.style = "width: 3em; border : 1px solid; text-align: center"
        del.onclick = function(){
            localStorage.setItem("userIdToDelete", element.id);
            openDeleteDialog(element.id);
        }
        view.onclick = function () {
            openViewDialog();
            viewUser(element);
        }
        update.onclick = function() {
            openUpdateDialog();
            updateUser(element);
        }

        row.style="max-height: 3em"
        row.appendChild(id)
        row.appendChild(username)
        row.appendChild(fullname)
        row.appendChild(email)
        row.appendChild(avatar)
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

function addUser() {
    window.location.replace("addUser.html");
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

function deleteUser() {
    let id = localStorage.getItem("userIdToDelete");
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

function viewUser(user) {
    let cover = document.getElementById("view-cover");
    let username = document.getElementById("view-username");
    let fullname = document.getElementById("view-fullname");
    let email = document.getElementById("view-email");
    let avatar = document.getElementById("view-avatar");

    cover.src = user.avatar;
    username.textContent = user.username;
    fullname.textContent = user.fullname;
    email.textContent = user.email;
    avatar.textContent = user.avatar
}

function updateUser(user) {
    let cover = document.getElementById("update-cover");
    let username = document.getElementById("update-username");
    let fullname = document.getElementById("update-fullname");
    let email = document.getElementById("update-email");
    let avatar = document.getElementById("update-avatar");

    cover.src = user.avatar;
    username.value = user.username;
    fullname.value = user.fullname;
    email.value = user.email;
    avatar.value = user.avatar

    let addConfirm = document.getElementsByClassName("update-close")[0];
    let confirmbtn = document.createElement("button");

    confirmbtn.textContent = "update";
    confirmbtn.onclick = function() {
        sendUpdate(user.id);
        location.reload();
    }
    addConfirm.appendChild(confirmbtn);
}

function sendUpdate(id) {
    let username = document.getElementById("update-username");
    let fullname = document.getElementById("update-fullname");
    let email = document.getElementById("update-email");
    let avatar = document.getElementById("update-avatar");
    let data = {
        id: id,
        username: username.value,
        fullname: fullname.value,
        email: email.value,
        avatar: avatar.value,
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