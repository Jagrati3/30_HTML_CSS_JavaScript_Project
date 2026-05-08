let emailId = document.getElementById("email-id");
let errorMsg = document.getElementById("error-msg");
let icon = document.getElementById("icon");


// This function runs every time user types.
function checker(){
    // show icon 
    icon.style.display = "inline-block";
    // .value>>>>>> gets what user typed then trim it by removing extra space 
    let email = emailId.value.trim();

    // EMPTY INPUT CHECK
    if(email === ""){
        // empty .......... true 
        // Hide Everything
        // Hide icon
       icon.style.display = "none";
    //    Hide error message.
       errorMsg.style.display = "none";
    //    Gray border again.
       emailId.style.border = "2px solid #d1d3d4"; 


    }else if(validateEmail(email)){  // hello2@gmail.com
        // Dynamically inserts icon inside div.
        icon.innerHTML = '<i class="fas fa-check-circle"></i>';
        // change icon color 
        icon.style.color = "#2ecc71";
        // no error message needed 
        errorMsg.style.display = "none";
        // apply green border 
        emailId.style.border = "2px solid #2ecc71";
    }else{
        // wrong email 
        // Insert Wrong Icon
        icon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        // change icon to red  
        icon.style.color = "#ff2851";
        // display error message 
        errorMsg.style.display = "block";
        // apply red border 
        emailId.style.border = "2px solid #ff2851";
    }

}

function validateEmail(email){  // hello2@gmail.com

    let atIndex = email.indexOf("@");

    let dotIndex = email.lastIndexOf(".");

    if(
        // @ should not be first character
        atIndex > 0 &&
        // there should be text between @ and dot.
        dotIndex > atIndex + 1 &&
        // after .dot there should be atlist 3 charactor like .com
        dotIndex < email.length - 3
    ){
        return true;
    }else{
        return false;
    }

}