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

function addPost(titel, text, author, time, likes, dislikes, comments = 0) {
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
    const postLikeIcon = document.createElement("div");
    const postDislikes = document.createElement("div");
    const postDislikeIcon = document.createElement("div");
    const postComments = document.createElement("button");
    const postDelete = document.createElement("button");
    const postEdit = document.createElement("button");
    //Hiden Comments
    const commentWindow = document.createElement("div");
    const commentBody = document.createElement("div");
    const commentFooter =document.createElement("div");
    const commentInput = document.createElement("input");
    const commentSend = document.createElement("button");
    //Text
    postTime.innerText = time;
    postAuthor.innerText = "Author: " + author;
    postTitel.innerText = titel;
    postText.innerText = text;
    postLikes.innerText = likes;
    postDislikes.innerText = dislikes;
    commentInput.placeholder = "Comment text";
    //Styles
    postWindow.className = "bg-white mt-[2rem] border-2";
    postHeader.className = "flex flex-row";
    postBody.className = "";
    postFooter.className = "ml-6 flex flex-row";
    postLikes.className = "text-[1rem]";
    postDislikes.className = "text-[1rem]";
    postAuthor.className = "ml-6 text-[1.5rem]";
    postTime.className = "mr-6 ml-auto";
    postTitel.className = "ml-6 text-[1.3rem] mb-2";
    postText.className = "ml-6 break-words";
    postLikeIcon.className = "bg-[url('../materials/like.png')] bg-cover w-[1rem] h-[1rem] mr-[0.5rem] mt-[0.2rem] cursor-pointer hover:bg-[rgba(252,39,128,0.4)]";
    postDislikeIcon.className = "bg-[url('../materials/dislike.png')] bg-cover w-[1rem] h-[1rem] mx-[0.5rem] mt-[0.2rem] cursor-pointer hover:bg-[rgba(252,39,128,0.4)]";
    postComments.className = "bg-[url('../materials/comment.png')] bg-cover w-[1rem] h-[1rem] ml-[0.5rem] mt-[0.2rem] cursor-pointer hover:bg-[rgba(252,39,128,0.4)]";
    postDelete.className = "bg-[url('../materials/delete.png')] bg-cover w-[1rem] h-[1rem] ml-[0.5rem] mt-[0.2rem] cursor-pointer hover:bg-[rgba(252,39,128,0.4)]";
    postEdit.className = "bg-[url('../materials/editing.png')] bg-cover w-[1rem] h-[1rem] ml-[0.5rem] mt-[0.2rem] cursor-pointer hover:bg-[rgba(252,39,128,0.4)]";
    //Hide styles
    commentWindow.className = "hidden border-t-4 flex flex-column justify-center";
    commentBody.className = "w-[95%] max-h-[10rem] overflow-y-auto";
    commentFooter.className = "w-[100%] flex flex-row justify-center my-2 border-t-2";
    commentSend.className = "bg-[url('../materials/send.png')] bg-cover w-[1.2rem] h-[1.2rem] mx-[0.5rem] mt-[0.8rem] cursor-pointer hover:bg-[rgba(252,39,128,0.4)] mr-8";
    commentInput.className = "ml-auto mr-4 mt-2 border-2 rounded-[4px] w-[70%]";
    //Functions
    postComments.addEventListener("click", function() {
        if (commentWindow.style.display == "block") {
            commentWindow.style.display = "none";
        } else {
            commentWindow.style.display = "block";
        }
    });
    commentSend.addEventListener("click", function() {
        createComment("Beb", commentInput.value, commentBody);
        commentInput.value = "";
    });
    postDelete.addEventListener("click", function() {
        postWindow.remove();
    });
    postEdit.addEventListener("click", function() {
        if (postText.contentEditable == "true") {
            postText.contentEditable = "false";
            postTitel.contentEditable = "false";
            postText.className = "ml-6 break-words";
            postTitel.className = "ml-6 text-[1.3rem] mb-2";
        } else {
            postText.contentEditable = "true";
            postTitel.contentEditable = "true";
            postText.className = "ml-6 break-words bg-[rgba(252,39,128,0.4)]"
            postTitel.className = "ml-6 text-[1.3rem] mb-2 bg-[rgba(252,39,128,0.4)]";
        }  
    });
    //Appends
    postFooter.appendChild(postLikeIcon);
    postFooter.appendChild(postLikes);
    postFooter.appendChild(postDislikeIcon);
    postFooter.appendChild(postDislikes);
    postFooter.appendChild(postComments);
    postFooter.appendChild(postDelete);
    postFooter.appendChild(postEdit);
    postBody.appendChild(postTitel);
    postBody.appendChild(postText);
    postHeader.appendChild(postAuthor);
    postHeader.appendChild(postTime);
    postWindow.appendChild(postHeader);
    postWindow.appendChild(postBody);
    postWindow.appendChild(postFooter);
    //Hide appends
    commentFooter.appendChild(commentInput);
    commentFooter.appendChild(commentSend);
    commentWindow.appendChild(commentBody);
    commentWindow.appendChild(commentFooter);
    postWindow.appendChild(commentWindow);
    postsWindow.appendChild(postWindow);
    //Add comments on auto creation
    if (comments != 0) {
        for (let i = 0; i < comments.length; i++) {
            createComment(comments[i].Author, comments[i].Text, commentBody);
        }
    }
}

function createComment(author, text, commentField) {
    //Dom elements
    const commentDiv = document.createElement("div");
    const commentHeader = document.createElement("div");
    const commentAuthor = document.createElement("div");
    const commentText = document.createElement("div");
    const commentDelete = document.createElement("button");
    const commentEdit = document.createElement("button");
    //Text
    commentAuthor.innerText = author;
    commentText.innerText = text;
    //Styles
    commentDiv.className = "ml-6 border-t-2 border-b-2 my-2";
    commentHeader.className = "flex flex-row";
    commentText.className = "break-words";
    commentDelete.className = "bg-[url('../materials/delete.png')] bg-cover w-[1rem] h-[1rem] ml-[0.5rem] mt-[0.2rem] cursor-pointer hover:bg-[rgba(252,39,128,0.4)]";
    commentEdit.className = "bg-[url('../materials/editing.png')] bg-cover w-[1rem] h-[1rem] ml-[0.5rem] mt-[0.2rem] cursor-pointer hover:bg-[rgba(252,39,128,0.4)]";
    //Functions 
    commentDelete.addEventListener("click", function() {
        commentDiv.remove();
    });
    commentEdit.addEventListener("click", function() {
        if (commentText.contentEditable == "true") {
            commentText.contentEditable = "false";
            commentText.className = "break-words";
        } else {
            commentText.contentEditable = "true";
            commentText.className = "break-words bg-[rgba(252,39,128,0.4)]"
        }      
    });
    //Appends
    commentHeader.appendChild(commentAuthor);
    commentHeader.appendChild(commentDelete);
    commentHeader.appendChild(commentEdit);
    commentDiv.appendChild(commentHeader);
    commentDiv.appendChild(commentText);
    commentField.appendChild(commentDiv);
}

for (let i = 0; i < allPosts.length; i++) {
    testTime = String(new Date((parseInt(new Date().toJSON().slice(11, 13)) * 3600 + parseInt(new Date().toJSON().slice(14, 16)) * 60 + 3600) * 1000).toJSON().slice(11, 16));
    addPost(allPosts[i].Titel,allPosts[i].Text,allPosts[i].Author, testTime, allPosts[i].Likes, allPosts[i].Dislikes, allPosts[i].Comments);
}