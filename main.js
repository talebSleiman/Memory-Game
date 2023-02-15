let name = document.querySelector(".name span");

document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("Enter Your Name: ");
    yourName === "" || yourName === null ? name.innerHTML = "Unkown" : name.innerHTML = yourName;
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let container = document.querySelector(".memory-container");
let blocks = Array.from(container.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click", function () {
        flipBlock(block);
    });
});


// Flip Block  Function 
function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");
    let allFlipped = blocks.filter((block) => block.classList.contains("is-flipped"));
    if (allFlipped.length === 2) {
        stopClicking();
        checkMatch(allFlipped[0], allFlipped[1]);
    }
}

function stopClicking() {
    container.classList.add("no-click");
    setTimeout(() => {
        container.classList.remove("no-click");
    }, duration);
}

function checkMatch(firstBlock, secondBlock) {
    let tries = document.querySelector(".tries span");
    if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        document.querySelector("#success").play();
    } else {
        tries.innerHTML++;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
        document.querySelector("#fail").play();
    }
}

// Shuffle Function 
function shuffle(ls) {
    let current = ls.length;
    let temp, random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = ls[current];
        ls[current] = ls[random];
        ls[random] = temp;
    }
    return ls;
}