let btn=document.querySelector("button");
let ul=document.querySelector("ul");
let inp=document.querySelector("input");

btn.addEventListener("click",function(){
    // jaise hi btn pe click ho uske ander ka text console me print karo
    // console.log(inp.value);

    // jaise hi add ho jaye us string to null kar do taki vo input box se hat jaye 
    // inp.value = "";

    // ab 3 step me item ko lit me add karo 
    // 1. create new li
    let list_Item = document.createElement("li");
// 2 set it text 
    list_Item.innerText = inp.value;
// 3 add the text in li 
    ul.appendChild(list_Item);

    // .............
    console.log(inp.value);
    inp.value = "";


    // ............................................Apply delete btn
    let DelBtn=document.createElement("button");
    DelBtn.innerText="delete";
    DelBtn.classList.add("delete");

    list_Item.appendChild(DelBtn);
});


// Step 1

// Input working ✅
// Button click working ✅
// New <li> created ✅
// Added to <ul> ✅
// Input cleared ✅

// ................................................................
// step 2 
// apply delete btn 



// 🌳 1. What is Event Delegation? (very simple)

// 👉 Event Delegation means:

// Instead of adding event to many child elements,
// we add one event to their parent and handle it there.

// 🤔 Why do we need it?

// Imagine:

// <ul>
//   <li>Task 1</li>
//   <li>Task 2</li>
//   <li>Task 3</li>
// </ul>
// ❌ Without delegation

// You do:

// add event to li1
// add event to li2
// add event to li3

// 👉 Too many listeners 😓
// 👉 If new <li> added → event won’t work automatically

// ✅ With delegation

// 👉 Add ONE event to <ul> only

// Then:

// Click on any <li> → parent <ul> handles it
// ⚙️ How does it work?

// Because of Event Bubbling 🌊

// 👉 Flow:

// li → ul → div → body

// So when you click <li>:

// event goes to <ul>
// <ul> can detect which li was clicked


ul.addEventListener("click" , function(event){
    // Which element was ACTUALLY clicked?......this will select delete button 
    if(event.target.nodeName =="BUTTON"){
        // btn element select ho gya now 
        //  btn ka parent which is = "li" ko store karo 
        let delListItem = event.target.parentElement;
        // then delete the parent li 
        delListItem.remove();
        console.log("deleted");
    }
});


// ul
//  └── li
//       └── button


// event.target............will give <button>Delete</button>
// What is nodeName?

// It gives element tag name.

// Examples:

// event.target.nodeName

// Returns:

// BUTTON
// LI
// UL
// DIV

// (all uppercase)
// .........................FULL FLOW .............................

// Full flow (complete story)

// User clicks:

// <button>Delete</button>

// Step by step:

// 1

// Click happens on button.

// 2

// Event bubbles upward:

// button → li → ul
// 3

// ul catches click because listener is attached there.

// 4

// Check:

// event.target.nodeName == "BUTTON"

// Yes true.

// 5

// Find parent:

// button.parentElement

// Gets li.

// 6

// Remove li.

// Done ✅