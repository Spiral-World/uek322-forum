function userBlock() {
    const userFunctions = document.getElementById("userFunctions");
    const blockUserWindow = document.getElementById("blockUser");
    userFunctions.style.display = "none";
    blockUserWindow.style.display = "block";
    blockUserWindow.innerHTML = "";
    //Create DOM elements 
    const header = document.createElement("div");
    const backArrow = document.createElement("div");
    //Styles
    header.className = "border-b-2 mb-2";
    backArrow.className = "bg-[url('../materials/arrow.png')] bg-cover w-[2rem] h-[2rem] cursor-pointer hover:rounded-[2rem] hover:bg-[rgba(252,39,128,0.4)]";
    //Functions 
        //Return
        backArrow.addEventListener("click", function() {
            blockUserWindow.style.display = "none";
            userFunctions.style.display = "block";
        });
    //Appends 
    header.appendChild(backArrow);
    blockUserWindow.appendChild(header);
    //Test block
    const allUsers = [
        {"Name": "Beb", "Role": "User"},
        {"Name": "Beb", "Role": "Manager"},
        {"Name": "Beb", "Role": "Admin"}
    ];
    for (let i = 0; i < allUsers.length; i++) {
         //DOM
         let userDiv = document.createElement("div");
         let info = document.createElement("div");
         let nameDiv = document.createElement("div");
         let name = document.createElement("input");
         let roleDiv = document.createElement("div");
         let role = document.createElement("select");
         let user = document.createElement("option");
         let moder = document.createElement("option");
         let admin = document.createElement("option");
         let change = document.createElement("div");
         let block = document.createElement("div");
         //Variables
         let oldText = allUsers[i].Name;
         name.readOnly = "true";
         role.disabled = "true";
         //Text
         nameDiv.innerText = "Name:";
         name.value = allUsers[i].Name;
         roleDiv.innerText = "Role: ";
         user.innerText = "User";
         moder.innerText = "Moderator";
         admin.innerText = "Admin";
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
            if (!name.readOnly) {
                if (name.value !== "" && name.value.indexOf(' ') <= 0) {
                    console.log(name.value.indexOf(' '));
                    name.readOnly = "true";
                    name.className = "max-w-[5rem]";
                } else {
                    name.innerText = oldText;
                    customAlert(1, "Name can't be empty or with whitespaces");
                }   
            } else {
                name.readOnly = false;
                name.className   = "max-w-[5rem] bg-[rgba(252,39,128,0.4)]"
            }   
            if (role.disabled) {
                role.disabled = false;
            } else {
                role.disabled = true;
            }
         });
         name.addEventListener("onchange", function() {
            console.log("Bebra");
         });
         //Appends
         role.appendChild(user);
         role.appendChild(moder);
         role.appendChild(admin);
         roleDiv.appendChild(role);
         nameDiv.appendChild(name);
         info.appendChild(nameDiv);
         info.appendChild(roleDiv);
         userDiv.appendChild(info);
         userDiv.appendChild(change);
         userDiv.appendChild(block);
         blockUserWindow.appendChild(userDiv);
    }
}