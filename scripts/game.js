const canvas = document.querySelector(".hitbar--canvas");
const ctx = canvas.getContext("2d");
const bpmInput = document.querySelector(".input--bpm");
const urCounter = document.querySelector(".unstable--rate");
const hitbarSpeedSetting = document.querySelector(".speed");
const hitframeSetting = document.querySelector(".hitFrame");
const stop = document.querySelector(".stop");
const effectOverlay = document.querySelector(".hitbar--overlay").getContext("2d");
const accuracyDisplay = document.querySelector(".accuracy--precentage");
const startButton = document.querySelector(".start");

let timing = 1000;
let autoStop = 99999 * 60;
let intervalId;
let hitFrame = 45;
let savedObjects = [];
let ar = 4;
let accuracy = 0;
let ur = 0;
let pointSum = 0;
let pointMax = 0;

canvas.width = 1000;
ctx.strokeStyle = '#ffffff';
effectOverlay.fillStyle = "rgb(30,30,30)"

stop.addEventListener("input", () => {
    autoStop = stop.value * 1000;
    stopGame();
})
hitbarSpeedSetting.addEventListener("input", () => {
    ar = hitbarSpeedSetting.value;
})
hitframeSetting.addEventListener("input", () => {
    hitFrame = hitframeSetting.value;
})
startButton.addEventListener("click", start);
bpmInput.addEventListener("input", stopGame);

function hit() {

    pointMax += 300;

    if (savedObjects[0].x < 100) {
        ur = 100 - savedObjects[0].x;
    } else if (savedObjects[0].x > 100) {
        ur = savedObjects[0].x - 100;
    } else {
        ur = 0;
    }

    switch (true) {
        case(ur < hitFrame):
            pointSum += 300;
            console.log(300);
            effectOverlay.fillStyle = "rgb(0, 222, 196)"
            break;
        case(ur >= hitFrame):
            pointSum += 100;
            console.log(100);
            effectOverlay.fillStyle = "rgb(0, 222, 33)"
            break;
    }

    accuracy = (pointSum/pointMax)*100; 

    accuracyDisplay.innerHTML = `Accuracy: ${accuracy.toFixed(2)}%`

    urCounter.innerHTML = `Unstable rate: ${ur}`

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
            effectOverlay.fillStyle = "rgb(255, 0, 0)"
        }
    })
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(100, canvas.height);
    ctx.stroke();
    ctx.lineWidth = 3;

    effectOverlay.fillRect(168,0,10,canvas.height)
};

function start() {
    clearInterval(intervalId);
    timing = 60000 / bpmInput.value;
    savedObjects.length = 0;
    intervalId = setInterval(() => {
        savedObjects.push({ x: 1000 })
    }, timing / 4);
    setTimeout(() => {
        clearInterval(intervalId);
    }, autoStop)
}

function stopGame() {
    clearInterval(intervalId)
}

setInterval(update, 1);