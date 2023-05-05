function userBlock() {
    const userFunctions = document.getElementById("userFunctions");
    const blockUserWindow = document.getElementById("blockUser");
    userFunctions.style.display = "none";
    blockUserWindow.style.display = "block";
    blockUserWindow.innerHTML = "";
    //Create DOM elements 
    const header = document.createElement("div");
    const backArrow = document.createElement("div");
    backArrow.id = "goBack";
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
    getAllUsers();
}