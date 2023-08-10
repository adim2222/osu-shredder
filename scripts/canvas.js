const canvas = document.querySelector(".hitbar--canvas");
const ctx = canvas.getContext("2d");

let vector = {
    x: canvas.width,
    y: 0,
};

let waitedFrames = 0;

// canvas rendering update function
const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    function createHit() {
        ctx.beginPath();
        ctx.moveTo(vector.x, 0);
        ctx.lineTo(vector.x, canvas.height);
        ctx.stroke();
        vector.x = 0;
    }

    ctx.strokeStyle = "#ffffff";

    vector.x -= 1;
    waitedFrames += 1;

    if (waitedFrames = 1000) {createHit();}

    console.log("update");
};

setInterval(update, 1);