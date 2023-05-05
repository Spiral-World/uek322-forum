let freezeClick = false;
//Create a custom allert with customizable design
function customAlert(typeOfAlertMessage, alertMessage) {
    //Create DOM elements
    const shading = document.createElement("div");
    const alertWindow = document.createElement("div");
    const closeAlert = document.createElement("button");
    const alertType = document.createElement("div");
    const alertText = document.createElement("strong");
    //Text
    closeAlert.innerText = "OK";
    //Design for close alert and shading div
    alertText.className = "mt-1";
    alertType.className = "text-[3rem] "
    shading.className = "absolute top-0 bg-black opacity-25 h-[120%] w-[100%]";
    closeAlert.className = "mt-5 text-[40px] cursor-pointer";
    const alertStyle = "absolute top-[40%] left-[32%] text-black w-[35%] text-[1rem] flex flex-col text-center";
    //Chose alert design 
    switch (typeOfAlertMessage) {
        case 1:
            alertWindow.className = alertStyle + " bg-[rgb(244,31,31)]";
            alertType.innerText = "Error";
            alertText.innerText = alertMessage;
            break;
        case 2:
            alertWindow.className = alertStyle + " bg-[rgb(232,228,34)]";
            alertType.innerText = "Warning";
            alertText.innerText = alertMessage;
            break;
        case 3:
            alertWindow.className = alertStyle + " bg-green-500";
            alertType.innerText = "Success";
            alertText.innerText = alertMessage;
            break;
    }
    //Delete indexes
    const allIndexes = document.querySelectorAll("[tabindex]");
    for (let i = 0; i < allIndexes.length; i++) {
        allIndexes[i].tabIndex = -1;
    }
    closeAlert.tabIndex = 1;
    //Id for each alert element
    alertWindow.id = "alert";
    closeAlert.id = "close";
    shading.id = "darknessDungeon";
    //Close alert
    ["click", "keypress"].forEach(function(event) {
        closeAlert.addEventListener(event, function() {
            document.getElementById("alert").remove();
            document.getElementById("darknessDungeon").remove();
            freezeClick = false;
            document.addEventListener("click", handler, true);
            for (let i = 0; i < allIndexes.length; i++) {
                allIndexes[i].tabIndex = i+1;
            }
        })
    });
    //Connect all elements
    alertWindow.appendChild(alertType);
    alertWindow.appendChild(alertText);
    alertWindow.appendChild(closeAlert);
    document.body.appendChild(shading);
    document.body.appendChild(alertWindow);
    //Freze window
    freezeClick = true;
    ["click", "keypress"].forEach(function(event) {
        document.addEventListener(event, handler, true);
    });
    //Change focus
    closeAlert.focus();
}
//Frezing function
function handler(event) {
    if (freezeClick) {
        if(event.target.id!=="close") {
            event.stopPropagation()
        }
    }
}