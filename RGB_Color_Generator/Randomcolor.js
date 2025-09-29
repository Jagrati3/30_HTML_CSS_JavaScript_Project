let btn = document.querySelector("button");

btn.addEventListener("click", function () {
  let h3 = document.querySelector("h3");
  let randomColor = getRandomColor();
  h3.innerText = randomColor;

  let div = document.querySelector("div");
  div.style.backgroundColor = randomColor;

  console.log("color updated");


//   ....................Extra work done by me for heading color change <3 
let h1 = document.querySelector("h1");
  h1.style.color = randomColor;

});

function getRandomColor() {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);

  let color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}

// let h1 = document.querySelector("h1");
// h1.addEventListener("click", function () {
//       let randomColor = getRandomColor();
//   h1.style.color = randomColor;
// });
