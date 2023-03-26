function registerOnAction() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let fullname = document.getElementById("fullname").value;
    let rePassword = document.getElementById("retypePassword").value;
    let checkBoxTermOfUse = document.getElementById("agree").checked;

    let data = {
        username: name,
        email : email,
        fullname: fullname,
        password : password
    }
    let notify = document.getElementById("notify");

    if(password != rePassword) {
        notify.textContent = "Password does not match!";
        notify.style ="color: red"
    }
    else if(!checkBoxTermOfUse) {
        notify.textContent = "You have to agree with our term of uses before register!";
        notify.style ="color: red";
    } else {
        var xhttp = new XMLHttpRequest();
        let url = "../../../Backend/Authentication/registerAuth.php"
        xhttp.onreadystatechange = function () {
            if(this.readyState == 4 && this.status == 200) {
                notify.textContent = this.response.message;
                location.replace("../login/login.html")
            }
        }
        xhttp.open("POST", url, true);
        xhttp.send(JSON.stringify(data));
    }
}
