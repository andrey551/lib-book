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
            document.getElementById("user_avatar").src = userDetail[0].avatar;
            document.getElementById("username").textContent = userDetail[0].username;
            document.getElementById("fullname").textContent = userDetail[0].fullname;
            document.getElementById("email").textContent = userDetail[0].email;
            document.getElementById("avatar").textContent = userDetail[0].avatar;
        }
    )
}

loadData();

function changeOnAction() {
    window.location.replace("updateUser.html");
}