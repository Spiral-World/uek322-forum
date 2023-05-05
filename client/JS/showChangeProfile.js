getWhoAmI(2);
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
    name.innerHTML = "Username: " + "<strong>" + localStorage.getItem("username") + "</strong>";
    changeData.innerText = "Change username or password";
    allPostsLabel.innerText = "All posts:";
    //Styles
    header.className = "border-b-2";
    backArrow.className = "bg-[url('../Materials/arrow.png')] bg-cover w-[2rem] h-[2rem] cursor-pointer hover:rounded-[2rem] hover:bg-[rgba(252,39,128,0.4)]";
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
    allPostsDiv.appendChild(allPostsLabel);undefined
    userProfile.appendChild(allPostsDiv);
    //Information about all user posts
    getWhoAmI(1);
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
    backArrow.id = "backToProfile";
    const form = document.createElement("form");
    form.innerHTML = `
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
                <input id="username" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="New username">
                <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">New username</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
                <input id="newPass" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="New password">
                <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">New password</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
                <input id="oldPass" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="Only for new password">
                <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Actual password</label>
    </div>
    <div class="text-[1rem] text-center text-red-500">At least one of the values(Username or/and Password) must be changed!</div>
    <button type="button" onclick="changeData()" class="w-[100%] h-[3.5rem] mt-[1rem] mb-[0.25rem] bg-[rgba(0,0,0,0)] text-[2rem] hover:bg-[rgba(252,39,128,0.4)]">
                Change
    </button>
    `;
    //Styles
    header.className = "border-b-2";
    backArrow.className = "bg-[url('../Materials/arrow.png')] bg-cover w-[2rem] h-[2rem] cursor-pointer hover:rounded-[2rem] hover:bg-[rgba(252,39,128,0.4)]";
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

    if (newName.value == "" && newPassword.value == "") {
        customAlert(2, "Please provide at least one new value");
    } else if (newName.value.length > 0 && newName.value.length <= 2) {
        customAlert(2, "New name is too short");
    } else if (actualPassword.value == "") {
        customAlert(2, "Please provide actual password");
    } else if (newPassword.value.length > 0 && newPassword.value.length <=2) {
        customAlert(2, "New password is too short");
    } else {

        if (newName.value !== "" && newPassword.value !== "") {
            const data = {
                newName: newName.value,
                newpassword: newPassword.value,
                oldpassword: actualPassword.value
            }
            putName(data);
            localStorage.setItem("username", newName.value);
        } else if (newPassword.value == "") {
            const name = {
                newName: newName.value
            }
            putName(name);
            localStorage.setItem("username", newName.value);
        } else if (newName.value == "") {
            const psw = {
                newpassword: newPassword.value,
                oldpassword: actualPassword.value
            }
            putPassword(psw);
        }

        changeProfile.style.display = "none";
        userFunctions.style.display = "block";
    }
}