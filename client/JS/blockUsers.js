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
         let block = document.createElement("div");
         //Text
         info.innerText = "Name: " + allUsers[i].Name + "\nRole: " + allUsers[i].Role;
         //Styles 
         userDiv.className = "text-[1rem] border-2 relative";
         block.className = "bg-[url('../materials/blockUser.png')] absolute right-2 top-2 bg-cover w-[2rem] h-[2rem] cursor-pointer hover:rounded-[2rem] hover:bg-[rgba(252,39,128,0.4)]";
         //Appends
         userDiv.appendChild(info);
         userDiv.appendChild(block);
         blockUserWindow.appendChild(userDiv);
    }
}