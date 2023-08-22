const canvas = document.querySelector(".hitbar--canvas");
const ctx = canvas.getContext("2d");
const bpmInput = document.querySelector(".input--bpm");
const urCounter = document.querySelector(".unstable--rate");

let timing = 1000;

let intervalId;

let savedObjects = [];

canvas.width = 1000;
let ar = 4;

let accuracy = 0;

ctx.strokeStyle = '#ffffff';

function createHit() {
    savedObjects.push({ x: 1000 })
};

function hit() {
    if (savedObjects[0].x < 100) {
        accuracy = 100 - savedObjects[0].x;
    } else if (savedObjects[0].x > 100) {
        accuracy = savedObjects[0].x - 100;
    } else {
        accuracy = 0;
    }

    urCounter.innerHTML = `Unstable rate: ${accuracy}`

    savedObjects.shift();
}

// canvas rendering update function
const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    savedObjects.forEach(function (object) {
        ctx.beginPath();
        ctx.moveTo(object.x, 0);
        ctx.lineTo(object.x, canvas.height);
        ctx.stroke();
        object.x -= ar;
        if (savedObjects[0].x <= 0) {
            savedObjects.shift();

        }
    })
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, canvas.height);
    ctx.stroke();
    ctx.lineWidth = 3;
};

bpmInput.addEventListener("input", () => {
    clearInterval(intervalId);
    timing = 60000 / bpmInput.value;
    savedObjects.length = 0;
    intervalId = setInterval(() => {
        createHit();
    }, timing / 4);
})

setInterval(update, 1);