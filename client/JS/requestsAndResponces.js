let request;
//PUT
function putPost() {
    request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:3000/api/Post");
    request.onreadystatechange = requestPut;
    request.send();
}
function putPassword() {
    request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:3000/api/UserPWD");
    request.onreadystatechange = requestPut;
    request.send();
}
function putName() {
    request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:3000/api/UserName");
    request.onreadystatechange = requestPut;
    request.send();
}
function putComment() {
    request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:3000/api/Comment");
    request.onreadystatechange = requestPut;
    request.send();
}

function requestPut() {
    if (request.readyState < 4) {
        return;
    } 
    console.log(request);
}
//GET
function getAllUserPosts() {
    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/api/MyPosts");
    request.onreadystatechange = requestGet;
    request.send();
}
function getAllPosts() {
    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/api/AllPosts");
    request.onreadystatechange = requestGet;
    request.send();
}
function getAllUsers() {
    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:3000/api/AllUser");
    request.onreadystatechange = requestGet;
    request.send();
}
function requestGet() {
    if (request.readyState < 4) {
        return;
    } 
    console.log(request);
}
//DELETE
function deletePost() {
    request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:3000/api/post");
    request.onreadystatechange = requestDelete;
    request.send();
}
function deleteComment() {
    request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:3000/api/Comment");
    request.onreadystatechange = requestDelete;
    request.send();
}

function requestDelete() {
    if (request.readyState < 4) {
        return;
    } 
    console.log(request);
}
//POST
function postPost() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/post");
    request.onreadystatechange = requestPost;
    request.send();
}
function postLogin() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/Login");
    request.onreadystatechange = requestPost;
    request.send();
}
function postRegister() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/Register");
    request.onreadystatechange = requestPost;
    request.send();
}
function postComment() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/Comment");
    request.onreadystatechange = requestPost;
    request.send();
}
function postLikeDislike() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/Like");
    request.onreadystatechange = requestPost;
    request.send();
}
function postBanUser() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/BanUser");
    request.onreadystatechange = requestPost;
    request.send();
}

function requestPost() {
    if (request.readyState < 4) {
        return;
    } 
    console.log(request);
}