// select btn
const generate_Btn = document.getElementById("generate-btn");
// select number 
const number = document.getElementById("random-number");

// event listner on btn 
generate_Btn.addEventListener("click", () => {
    // generate random number 
    // Range 1 to 100
    const random_number = Math.floor(Math.random() * 100) + 1;
    // store random number in display number 
    // number.textContent = random_number;
    // .........................................
    // .........................................

    // 2. पुराने एनिमेशन को हटाएँ (ताकि दोबारा चल सके)
    number.classList.remove("pop-animation");
    
    // 3. छोटा सा delay देकर नंबर बदलें और एनिमेशन क्लास जोड़ें
    setTimeout(() => {
        number.textContent = random_number;
        number.classList.add("pop-animation");
    }, 10);

});



// X और Y के बीच रैंडम नंबर जेनरेट करनाअगर आप चाहते हैं कि नंबर X (min) और Y (max) के बीच हो,
//  तो इस फॉर्मूले का इस्तेमाल करें:

// javascript code

// Math.floor(Math.random() * (max - min + 1)) + min;

// Math.random() हमेशा 0 और 1 के बीच का एक नंबर देता है (जिसमें 0 शामिल हो सकता है, लेकिन 1 कभी नहीं)।

// Math.floor(...): यह दशमलव (decimal) हटाकर उसे पूर्णांक (integer) बना देता है।
// उदाहरण: 10.8256885 बन जाएगा 10 | 0.21545165 बन जाएगा 0। 