let request;
//PUT
function putUserRole(data) {
    request = new XMLHttpRequest();
    console.log(data);
    request.open("PUT", "http://localhost:4200/api/UserRole");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = requestPut;
    request.send(JSON.stringify(data));
}

function requestPut() {
    if (request.readyState < 4) {
        return;
    } 
    console.log(request.responseText);
}
//GET
function getWhoAmI(nextStep) {
    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4200/api/WhoAmI");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function() {
        requestGet(event, nextStep);
    };
    request.send();
}
function getAllUserPosts() {
    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4200/api/MyPosts");
    request.onreadystatechange = requestGet;
    request.send();
}
function getAllPosts(whoI = 0) {
    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4200/api/AllPosts");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function() {
        requestGet(event, whoI);
    };
    request.send();
}
function getAllUsers() {
    request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4200/api/AllUsers");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = requestGet;
    request.send();
}
function requestGet(event, whoI = 0) {
    if (request.readyState < 4) {
        return;
    } 

    let path = event.currentTarget.responseURL;
    if (whoI == 1) {
        getAllPosts(request.responseText);
    } else if (path.includes("api/AllPosts") && whoI != 0) {
        const allPosts = JSON.parse(request.responseText);
        for (let i = 0; i < allPosts.length; i++) {
            if (whoI.role !== "User") {
                //DOM
                let post = document.createElement("div");
                let info = document.createElement("div");
                //Text
                let comment;
                let like;
                if (allPosts[i].comments.length !== undefined) {
                    comment = allPosts[i].comments.length
                } else {
                    comment = 0;
                }
                if (allPosts[i].likes.length !== undefined) {
                    like =allPosts[i].likes.length;
                } else {
                    like = 0;
                }
                info.innerText = "Author: " + allPosts[i].author + "\nTitle: " + allPosts[i].title + "\nLikes: " + like + " | Dislikes: " + like     + "\nComments: " + comment;
                //Styles 
                post.className = "text-[1rem] border-2";
                //Appends
                post.appendChild(info);
                userProfile.appendChild(post);
            }
        }
    } else if (path.includes("api/AllPosts")) {
        const allPosts = JSON.parse(request.responseText);
        for (let i = 0; i < allPosts.length; i++) {
            addPost(allPosts[i].title, allPosts[i].content, allPosts[i].author, allPosts[i].likes, allPosts[i].likes, allPosts[i].comments, allPosts[i].id);
        }
    } else if (path.includes("api/AllUsers")) {
        const allUsers = JSON.parse(request.responseText);
        const blockUserWindow = document.getElementById("blockUser");
        for (let i = 0; i < allUsers.length; i++) {
             //DOM
             let userDiv = document.createElement("div");
             let info = document.createElement("div");
             let nameDiv = document.createElement("div");
             let name = document.createElement("div");
             let roleDiv = document.createElement("div");
             let role = document.createElement("select");
             let user = document.createElement("option");
             let moder = document.createElement("option");
             let admin = document.createElement("option");
             let change = document.createElement("div");
             let block = document.createElement("div");
             let ban = document.createElement("div");
             //Variables
             let banType;
             if (allUsers[i].ban == 0) {
                banType = true;
             } else {
                banType = false;
             }
             let id = { 
                userid: allUsers[i].id,
                ban: banType
            };
             role.disabled = "true";
             //Text
             nameDiv.innerText = "Name:";
             name.innerText = allUsers[i].name;
             roleDiv.innerText = "Role: ";
             user.innerText = "User";
             moder.innerText = "Moderator";
             admin.innerText = "Admin";
             if (allUsers[i].ban === 0) {
                ban.innerText = "Status: Active";
             } else {
                ban.innerText = "Status: Banned";
             }
             //Chose actual role
             switch (allUsers[i].role) {
                case "Admin":
                    admin.selected = true;
                    break;
                case "Moderator":
                    moder.selected = true;
                    break;
                case "User":
                    user.selected = true;
                    break;
             }
             //Styles 
             nameDiv.className = "flex flex-row";
             roleDiv.className = "flex flex-row";
             name.className = "max-w-[5rem]";
             info.className = "flex flex-col";
             userDiv.className = "text-[1rem] border-2 my-[0.3rem] relative flex flex-row";
             block.className = "bg-[url('../materials/blockUser.png')] mt-[0.3rem] mx-[0.5rem] bg-cover w-[2rem] h-[2rem] cursor-pointer hover:bg-[rgba(252,39,128,0.4)] rounded";
             change.className = "bg-[url('../materials/editing.png')] mt-[0.3rem] ml-auto bg-cover w-[2rem] h-[2rem] cursor-pointer hover:bg-[rgba(252,39,128,0.4)] rounded";
             role.className = "w-[5rem]";
             //Functions
             change.addEventListener("click", function() {
                if (role.disabled) {
                    role.disabled = false;
                } else {
                    let data = {
                        name: allUsers[i].name,
                        role: role.value
                    };
                    putUserRole(data);
                    role.disabled = true;
                }
             });
             block.addEventListener("click", function() {
                postBanUser(id);
             });
             //Appends
             role.appendChild(user);
             role.appendChild(moder);
             role.appendChild(admin);
             roleDiv.appendChild(role);
             nameDiv.appendChild(name);
             info.appendChild(nameDiv);
             info.appendChild(roleDiv);
             info.appendChild(ban);
             userDiv.appendChild(info);
             userDiv.appendChild(change);
             userDiv.appendChild(block);
             blockUserWindow.appendChild(userDiv);
        }
    }
}
//DELETE
function deletePost(postId) {
    request = new XMLHttpRequest();
    request.open("DELETE", "http://localhost:4200/api/post");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = requestDelete;
    request.send(JSON.stringify(postId));
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
function postPost(data) {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4200/api/Post");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = requestPost;
    request.send(JSON.stringify(data));
}
function postLogin(data) {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4200/api/Login");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = requestPost;
    request.send(JSON.stringify(data));
}
function postLogout() {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4200/api/Logout");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = requestPost;
    request.send();
}
function postRegister(data) {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4200/api/Register");
    request.setRequestHeader("Content-Type", "application/json");
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
function postBanUser(id) {
    request = new XMLHttpRequest();
    request.open("POST", "http://localhost:4200/api/BanUser");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = requestPost;
    request.send(JSON.stringify(id));
}

function requestPost(event) {
    if (request.readyState < 4) {
        return;
    } 
    let path = event.currentTarget.responseURL;
    if (path.includes("api/Login")) {
        if (request.responseText.includes("error")) {
            customAlert(1, "Invalide username or password");
        } else {
            customAlert(3, "Successfully login");
            setTimeout(function () {
                localStorage.setItem("username", username.value);
                document.location.href = "mainPage.html";
              }, 1000)
        }
    } else if (path.includes("api/Register")) {
        if (request.responseText.includes("error")) {
            customAlert(1, "This account is already created");
        } else {
            customAlert(3, "Successfully created account");
            setTimeout(function () {
                localStorage.setItem("username", username.value);
                document.location.href = "mainPage.html";
            }, 1000)
        }
    } else if (path.includes("api/Logout")) {
        customAlert(3, "Successfully logout");
        setTimeout(function () {
            document.location.href = "http://localhost:4200/";
        }, 1000)
    } else if (path.includes("api/Post")) {
        console.log(request.responseText);
    } else if (path.includes("api/BanUser")) {
        document.getElementById("goBack").click();
        console.log(request.responseText);
    }
}