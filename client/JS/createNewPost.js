function createPostWindow() {
    const userFunctions = document.getElementById("userFunctions");
    const createPost = document.getElementById("createPost");
    userFunctions.style.display = "none";
    createPost.style.display = "block";
    createPost.innerHTML = "";
    //Create DOM elements 
    const header = document.createElement("div");
    const backArrow = document.createElement("div");
    backArrow.id = "goBack";
    const form = document.createElement("form");
    form.innerHTML = `
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
                <input id="postTitel" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="Titel ...">
                <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Post titel</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
                <textarea id="postText" class="w-[100%] h-[5rem] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2 resize-none"> </textarea>
                <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Text</label>
    </div>
    <button type="button" onclick="createNewPost()" class="w-[100%] h-[3.5rem] mt-[3rem] mb-[0.25rem] bg-[rgba(0,0,0,0)] text-[2rem] hover:bg-[rgba(252,39,128,0.4)]">
                Create post
    </button>
    `;
    //Styles
    header.className = "border-b-2";
    backArrow.className = "bg-[url('../materials/arrow.png')] bg-cover w-[2rem] h-[2rem] cursor-pointer hover:rounded-[2rem] hover:bg-[rgba(252,39,128,0.4)]";
    //Functions
        //Return
        backArrow.addEventListener("click", function() {
            createPost.style.display = "none";
            userFunctions.style.display = "block";
        });
    //Appends
    header.appendChild(backArrow);
    createPost.appendChild(header);
    createPost.appendChild(form);
}

function createNewPost() {
    const postTitel = document.getElementById("postTitel");
    const postText = document.getElementById("postText");
    const backArrow = document.getElementById("goBack");

    if (postTitel.value == "") {
        customAlert(2, "Please provide a post title");
    } else if (postText.value == "") {
        customAlert(2, "Please provide some text");
    } else {
        addPost(postTitel.value, postText.value, "Beb", String(new Date((parseInt(new Date().toJSON().slice(11, 13)) * 3600 + parseInt(new Date().toJSON().slice(14, 16)) * 60 + 3600) * 1000).toJSON().slice(11, 16)), 5, 10);
        backArrow.click();
    }
}

function addPost(titel, text, author, time, likes, dislikes) {
    //Create DOM elements 
    const postsWindow = document.getElementById("postsWindow");
    const postWindow = document.createElement("div");
    const postHeader = document.createElement("div");
    const postBody = document.createElement("div");
    const postFooter = document.createElement("div");
    const postAuthor = document.createElement("div");
    const postTime = document.createElement("div");
    const postTitel = document.createElement("div");
    const postText = document.createElement("div");
    const postLikes = document.createElement("div");
    const postDislikes = document.createElement("div");
    const postComments = document.createElement("div");
    //Text
    postTime.innerText = time;
    postAuthor.innerText = author;
    postTitel.innerText = titel;
    postText.innerText = text;
    postLikes.innerText = likes;
    postDislikes.innerText = dislikes;
    //Styles
    postWindow.className = "bg-white";
    postHeader.className = "flex flex-row";
    postBody.className = "";
    postFooter.className = "flex flex-row";
    //Appends
    postFooter.appendChild(postComments);
    postFooter.appendChild(postLikes);
    postFooter.appendChild(postDislikes);
    postBody.appendChild(postTitel);
    postBody.appendChild(postText);
    postHeader.appendChild(postTime);
    postHeader.appendChild(postAuthor);
    postWindow.appendChild(postHeader);
    postWindow.appendChild(postBody);
    postWindow.appendChild(postFooter);
    postsWindow.appendChild(postWindow);
}