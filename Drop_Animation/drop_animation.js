
const container = document.querySelector(".container");


/*
    This function creates ONE drop.
*/
function dropped() {

    /*
        Create a new <span> element.

        At this moment:
        <span></span>
    */
    const drop = document.createElement("span");

    drop.classList.add("drop");


    drop.style.top =
        Math.random() * window.innerHeight + "px";
    // ye browser ki left height dega 
    drop.style.left =
        Math.random() * window.innerWidth + "px";


    /*
        Add the drop to the container.

        Before:
        <div class="container"></div>

        After:
        <div class="container">
            <span class="drop"></span>
        </div>

        As soon as it is added,
        CSS animation starts automatically.
    */
    container.appendChild(drop);


    /*
        Remove this drop after 6.5 seconds.

        Why 6.5 seconds?

        CSS animation = 5 seconds

        Remove after = 6.5 seconds

        So the animation gets time to finish.
    */
    setTimeout(() => {

        drop.remove();

    }, 6500);

}


/*
    Create the first drop
    after 500 milliseconds.
*/
setTimeout(dropped, 500);


/*
    Create another drop every 500 milliseconds.

    This gives us a continuous
    stream of drops.
*/
setInterval(dropped, 500);