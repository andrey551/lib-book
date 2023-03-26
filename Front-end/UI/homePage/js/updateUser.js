const URL = "../../../../Backend/Collection/user.php";
let jwt = sessionStorage.getItem("token");
let fullname = localStorage.getItem("username");
function loadData() {
    fetch(URL+ `?name=${fullname}`, {
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
        userDetail=>{
            console.log(userDetail);
            document.getElementById("user_avatar").src = userDetail[0].avatar;
            document.getElementById("username").value = userDetail[0].username;
            document.getElementById("fullname").value = userDetail[0].fullname;
            document.getElementById("email").value = userDetail[0].email;
            document.getElementById("avatar").value = userDetail[0].avatar;
            // document.getElementById("password").value = userDetail.password;
        }
    )
}

loadData();

function cancelOnAction() {
    window.location.replace("user.html");
}

function updateOnAction() {
    let username = document.getElementById("username").value
    let fullname = document.getElementById("fullname").value
    let email = document.getElementById("email").value
    let avatar = document.getElementById("avatar").value
    let password = document.getElementById("password").value
    let data = {
        username: username,
        fullname: fullname,
        password: password,
        email: email,
        avatar: avatar
    }
    localStorage.setItem("username", fullname);

    fetch(URL+ `?name=${fullname}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            Authorization: jwt,
        },
        body: JSON.stringify(data)})
    .then(
        response => {
            return response.json();
        }
    )
    .then (
        userDetail=>{
            alert(userDetail.message);
            
            cancelOnAction();
        }
    )


}