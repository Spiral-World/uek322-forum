function showProfile() {
    const userFunctions = document.getElementById("userFunctions");
    const userProfile = document.getElementById("userProfile");
    userFunctions.style.display = "none";
    userProfile.style.display = "block";
    userProfile.innerHTML = "";
    //Create DOM elements 
    const header = document.createElement("div");
    const backArrow = document.createElement("div");
    const name = document.createElement("div");
    const changeData = document.createElement("button");
    const allPostsDiv = document.createElement("div");
    const allPostsLabel = document.createElement("div");
    //Text
    name.innerHTML = "Username: " + "<strong>" + "Beb" + "</strong>";
    changeData.innerText = "Change username or password";
    allPostsLabel.innerText = "All your posts:";
    //Styles
    header.className = "border-b-2";
    backArrow.className = "bg-[url('../materials/arrow.png')] bg-cover w-[2rem] h-[2rem] cursor-pointer hover:rounded-[2rem] hover:bg-[rgba(252,39,128,0.4)]";
    name.className = "text-[1.5rem] mt-[1rem]";
    changeData.className = "bg-[rgba(252,39,128,0.3)] rounded-[0.4rem] hover:bg-[rgba(252,39,128,0.8)]";
    allPostsDiv.className = "mt-[2rem]";
    //Functions 
        //Return
        backArrow.addEventListener("click", function() {
            userProfile.style.display = "none";
            userFunctions.style.display = "block";
        });
        //Change username or password
        changeData.addEventListener("click", function() {
            changeDataWindow();
        });
    //Appends 
    header.appendChild(backArrow);
    userProfile.appendChild(header);
    userProfile.appendChild(name);
    userProfile.appendChild(changeData);
    allPostsDiv.appendChild(allPostsLabel);
    userProfile.appendChild(allPostsDiv);
     //Information about all user posts
     const allPosts = [
        {"Author": "Beb", "Titel": "Attack on titan", "Text": "Bla bla bla bla bla bla", "Likes": 5, "Dislikes": 10, "Comments": 4},
        {"Author": "Beb", "Titel": "3 world war", "Text": "Bla bla bla bla bla bla", "Likes": 10, "Dislikes": 100, "Comments": 8},
        {"Author": "Dominic", "Titel": "Python programming", "Text": "Bla bla bla bla bla bla", "Likes": 2, "Dislikes": 0, "Comments": 10}
    ];
    for (let i = 0; i < allPosts.length; i++) {
        if (allPosts[i].Author == "Beb") {
            //DOM
            let post = document.createElement("div");
            let info = document.createElement("div");
            //Text
            info.innerText = "Titel: " + allPosts[i].Titel + "\nLikes: " + allPosts[i].Likes + " | Dislikes: " + allPosts[i].Dislikes + "\nComments: " + allPosts[i].Comments;
            //Styles 
            post.className = "text-[1rem] border-2";
            //Appends
            post.appendChild(info);
            userProfile.appendChild(post);
        }
    }
}

function changeDataWindow() {
    const userProfile = document.getElementById("userProfile");
    const changeProfile = document.getElementById("changeProfile");
    userProfile.style.display = "none";
    changeProfile.style.display = "block";
    changeProfile.innerHTML = "";
    //Create DOM elements 
    const header = document.createElement("div");
    const backArrow = document.createElement("div");
    const form = document.createElement("form");
    form.innerHTML = `
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
                <input id="username" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="New username">
                <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">New username</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
                <input id="newPass" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="This field is optional">
                <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">New password</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
                <input id="oldPass" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="This field is necessarily">
                <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Actual password</label>
    </div>
    <button type="button" onclick="changeData()" class="w-[100%] h-[3.5rem] mt-[2.5rem] mb-[0.25rem] bg-[rgba(0,0,0,0)] text-[2rem] hover:bg-[rgba(252,39,128,0.4)]">
                Change
    </button>
    `;
    //Styles
    header.className = "border-b-2";
    backArrow.className = "bg-[url('../materials/arrow.png')] bg-cover w-[2rem] h-[2rem] cursor-pointer hover:rounded-[2rem] hover:bg-[rgba(252,39,128,0.4)]";
    //Functions
        //Return
        backArrow.addEventListener("click", function() {
            changeProfile.style.display = "none";
            userProfile.style.display = "block";
        });
    //Appends
    header.appendChild(backArrow);
    changeProfile.appendChild(header);
    changeProfile.appendChild(form);
}

function changeData() {
    const newName = document.getElementById("username");
    const newPassword = document.getElementById("newPass");
    const actualPassword = document.getElementById("oldPass");

    if (newName.value == "") {
        customAlert(2, "Please provide new name");
    } else if (newName.value.length <= 2) {
        customAlert(2, "New name is too short");
    } else if (actualPassword.value == "") {
        customAlert(2, "Please provide actual password");
    } else if (newPassword.value.length > 0 && newPassword.value.length <=2) {
        customAlert(2, "New password is too short");
    } else {

    }
}