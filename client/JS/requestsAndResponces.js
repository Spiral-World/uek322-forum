let request;
//PUT
function putPost() {
    request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:4200/api/Post");
    request.onreadystatechange = requestPut;
    request.send();
}
function putPassword() {
    request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:4200/api/UserPWD");
    request.onreadystatechange = requestPut;
    request.send();
}
function putName() {
    request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:4200/api/UserName");
    request.onreadystatechange = requestPut;
    request.send();
}
function putComment() {
    request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:4200/api/Comment");
    request.onreadystatechange = requestPut;
    request.send();
}

function requestPut() {
    if (request.readyState < 4) {
        return;
    } 
    console.log(request.responseText);
}
//GET
function getAllUserPosts() {
    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4200/api/MyPosts");
    request.onreadystatechange = requestGet;
    request.send();
}
function getAllPosts() {
    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4200/api/AllPosts");
    request.onreadystatechange = requestGet;
    request.send();
}
function getAllUsers() {
    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4200/api/AllUsers");
    request.onreadystatechange = requestGet;
    request.send();
}
function requestGet() {
    if (request.readyState < 4) {
        return;
    } 
    console.log(request.responseText);
}
//DELETE
function deletePost() {
    request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:4200/api/post");
    request.onreadystatechange = requestDelete;
    request.send();
}
function deleteComment() {
    request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:4200/api/Comment");
    request.onreadystatechange = requestDelete;
    request.send();
}

function requestDelete() {
    if (request.readyState < 4) {
        return;
    } 
    console.log(request.responseText);
}
//POST
function postPost() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4200/api/post");
    request.onreadystatechange = requestPost;
    request.send();
}
function postLogin() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4200/api/Login");
    request.onreadystatechange = requestPost;
    request.send();
}
function postRegister(name, password, role) {
    const data = {
        name: name,
        password: password,
        role: role
    }
    console.log(JSON.stringify(data));
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4200/api/Register");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.onreadystatechange = requestPost;
    request.send(JSON.stringify(data));
}
function postComment() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4200/api/Comment");
    request.onreadystatechange = requestPost;
    request.send();
}
function postLikeDislike() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4200/api/Like");
    request.onreadystatechange = requestPost;
    request.send();
}
function postBanUser() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4200/api/BanUser");
    request.onreadystatechange = requestPost;
    request.send();
}

function requestPost() {
    if (request.readyState < 4) {
        return;
    } 
    console.log(request.responseText);
}