let URL  = "../../../../Backend/Collection/user.php";
let jwt = sessionStorage.getItem("token");
function addUserOnAction() {
    let username = document.getElementById("username").value;
    let fullname = document.getElementById("fullname").value;
    let password = document.getElementById("password").value;
    let email = document.getElementById("email").value;
    let avatar = document.getElementById("avatar").value;

    let data = {
        username: username,
        fullname: fullname,
        password: password,
        email: email,
        avatar : avatar
    }

    loadJson(data)
}

function loadJson(data) {
    fetch(URL, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                Authorization: jwt,
            }, 
            body:  JSON.stringify(data)})
    .then(response => {
        return response.json();
    })
    .then(jsonData => {
        alert(jsonData.message)
        window.location.replace("userList.html");
})}