const key1input = document.querySelector(".key--input__1");
const key2input = document.querySelector(".key--input__2");

let key1 = localStorage.getItem("key1") || "z";
let key2 = localStorage.getItem("key2") || "x";

const getKey1 = () => {
    key1 = key1input.value.toLowerCase();
    document.querySelector(".hitbar--key1").innerHTML = key1.toUpperCase();
    localStorage.setItem("key1", `${document.querySelector(".hitbar--key1").innerHTML.toUpperCase()}`);
};

const getKey2 = () => {
    key2 = key2input.value.toLowerCase();
    document.querySelector(".hitbar--key2").innerHTML = key2.toUpperCase();
    localStorage.setItem("key2", `${document.querySelector(".hitbar--key2").innerHTML.toUpperCase()}`);
};

key1input.addEventListener("input", getKey1);
key2input.addEventListener("input", getKey2);



addEventListener("keydown", (event) => {
    switch (event.key) {
        case key1:
            key1down();
            break;
        case key2:
            key2down();
            break;
    };
});

addEventListener("keyup", (event) => {
    switch (event.key) {
        case key1:
            key1up();
            break;
        case key2:
            key2up();
            break;
    };
});
