
function login() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if (username.value == "" || password.value == "") {
        customAlert(1, "Username or password fields are empty");
    } else if (username.value.length <= 2 || password.value.length <= 2) {
        customAlert(1, "Username or password field are to short");
    } else {
        const loginData = {
            name: username.value,
            password: password.value
        }

        postLogin(loginData);
    }
}

function signIn() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    const repeatedPassword = document.getElementById("passwordRepeat");
    if (username.value == "" || password.value == "") {
        customAlert(1, "Username or password fields are empty");
    } else if (username.value.length <= 2 || password.value.length <= 2) {
        customAlert(1, "Username or password field are to short");
    } else if (!email.value.includes('@')) {
        customAlert(1, "False email format");
    } else if (password.value !== repeatedPassword.value) {
        customAlert(1, "False repeated password");
    } else {

        const registerData = {
            name: username.value,
            password: password.value
        }
        
        postRegister(registerData);
    }
}

function logout() {
    localStorage.removeItem("username"); 
    postLogout();   
}

function falseRepeat() {
    const password = document.getElementById("password");
    const repeatedPassword = document.getElementById("passwordRepeat");
    const repeatCheck = document.getElementById("falseRepeat");
    if (repeatedPassword.value !== password.value) {
        repeatCheck.innerText = "False";
        repeatCheck.className = "absolute right-[0.75rem] top-0 text-[1.4rem] font-normal text-red-500 px-[0.25rem] bg-white";
    } else {
        repeatCheck.innerText = "Ok";
        repeatCheck.className = "absolute right-[0.75rem] top-0 text-[1.4rem] font-normal text-green-500 px-[0.25rem] bg-white";
    }
}