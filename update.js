const key1display = document.querySelector(".hitbar--key1");
const key2display = document.querySelector(".hitbar--key2");



const key1down = () => {
    key1display.style.backgroundColor = "white";
};
const key2down = () => {
    key2display.style.backgroundColor = "white";
};

const key1up = () => {
    key1display.style.backgroundColor = "rgb(172, 57, 109)";
};
const key2up = () => {
    key2display.style.backgroundColor = "rgb(172, 57, 109)";
};