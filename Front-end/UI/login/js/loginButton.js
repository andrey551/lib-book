function loginOnClick () {
  let loginEmail = document.getElementById("usernameInput").value;
  let loginPassword = document.getElementById("passwordInput").value;
  let data = {
    username : loginEmail,
    password : loginPassword
  }
  var xhttp = new XMLHttpRequest();
  let url = "../../../Backend/Authentication/loginAuth.php";
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let res = JSON.parse(this.response)
        sessionStorage.setItem("token", res.jwt);    
        localStorage.setItem("username", res.username)
        window.location.replace("../homePage/home.html");    
      }
      else {
        document.getElementById("text-message").innerText = this.response.message
      }
  }
  xhttp.open("POST", url, true);
  xhttp.send(JSON.stringify(data));
}