const canvas = document.querySelector(".hitbar--canvas");
const ctx = canvas.getContext("2d");
const bpmInput = document.querySelector(".input--bpm");

let timing = 1000;

let intervalId;

let savedObjects = [];

canvas.width = 1000;
let ar = 3;

ctx.strokeStyle = '#ffffff';

function createHit() {
    savedObjects.push({x: 1000})
}

// canvas rendering update function
const update = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    savedObjects.forEach(function (object) {
        ctx.beginPath();
        ctx.moveTo(object.x, 0);
        ctx.lineTo(object.x, canvas.height);
        ctx.stroke();
        object.x -= ar;
    })
};

bpmInput.addEventListener("input", () => {
    timing = 60000 / bpmInput.value;
    setInterval((id) => {
        createHit();
        console.log(id);
    }, timing);
})

setInterval(update, 1);
