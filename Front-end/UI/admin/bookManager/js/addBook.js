let URL  = "../../../../Backend/Collection/book.php";
let jwt = sessionStorage.getItem("token");
function addBookOnAction() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;
    let desc = document.getElementById("desc").value;
    let image = document.getElementById("image").value;

    let data = {
        title: title,
        author: author,
        price: price,
        description: desc,
        image : image
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
})}