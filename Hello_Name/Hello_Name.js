// Select the span element where the name will be displayed
// select element by id 
const updateName = document.getElementById("updateName");

// Select the button element
const button = document.querySelector("button");


// Add click event on button
button.addEventListener("click", function () {
    // Show popup and take input from user
    const userName = prompt("Enter your name:");

    // Check if user clicked Cancel or entered empty value
    if (userName === null || userName.trim() === "") {
        updateName.textContent = "World!";
    } else {
        // Update the span text with entered name
        updateName.textContent = " " + userName + "!";
    }
});


// span element को select करना है

// button element को select करना है

// button click पर prompt() से input लेना है, फिर उस input को span में set करना है using textContent