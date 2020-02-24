// DOM Elements
let next_button = document.querySelector("button#next");
let prev_button = document.querySelector("button#prev");
let submit_button = document.querySelector("#submit");
let form_tag = document.querySelector("form");
let label_tag = document.querySelector("label");
let input_tag = document.querySelector("input");
let progress_div = document.querySelector("div#steps");
let final_data_tag = document.querySelector("div#finalData");
let i_tag = document.querySelector("i.fa-eye");

// Variables
let currStep = 0;
let currInput = 0;
let stepNames = ["Username", "Email", "Password"];
let data = [];

// Prevent the default event when Enter is pressed
input_tag.addEventListener("keypress", function (event) {
   if (event.code === "Enter") {
       event.preventDefault();
   }
});

i_tag.addEventListener("mousedown", function () {
    let password_tag = document.querySelector("span#password");
    password_tag.textContent = data[2];
});

i_tag.addEventListener("mouseup", function () {
    let password_tag = document.querySelector("span#password");
    password_tag.textContent = "*".repeat(data[2].length);
});

// Functions
function goNext() {
    if (input_tag.value === "") {
        input_tag.focus();
        return;
    }
    saveData();
    // Change label
    label_tag.textContent = stepNames[++currInput];
    clearInputTag();
    // Show previous button
    prev_button.classList.remove("hidden");
    changeInputType();
    // Update progress bar
    let circle = progress_div.children[currStep].nextElementSibling;
    circle.classList.add("done");
    circle.nextElementSibling.classList.add("done");
    currStep += 2;
    if (currInput === 3) {
        next_button.classList.add("hidden");
        submit_button.classList.remove("hidden");
        form_tag.classList.add("hidden");
        final_data_tag.classList.remove("hidden");
        setFinalData();
    }
}

function goPrev() {
    if (currInput === 3) {
        next_button.classList.remove("hidden");
        submit_button.classList.add("hidden");
        form_tag.classList.remove("hidden");
        final_data_tag.classList.add("hidden");
    }
    // Gp to prev step
    label_tag.textContent = stepNames[--currInput];
    input_tag.value = data[currInput];
    clearData();
    changeInputType();
    if (currInput === 0) {
        prev_button.classList.add("hidden");
    }
    // Update progress bar
    progress_div.children[currStep].classList.remove("done");
    progress_div.children[currStep].previousElementSibling.classList.remove("done");
    currStep -= 2;
}

// Utility functions
function changeInputType() {
    switch (currInput) {
        case 0:
            input_tag.type = "text";
            break;
        case 1:
            input_tag.type = "email";
            break;
        case 2:
            input_tag.type = "password";
            break;
    }
}

let saveData = () => {
    data[currInput] = input_tag.value;
};

let clearData = () => {
    data[currInput] = "";
};

let clearInputTag = () => {
    input_tag.value = "";
};

function setFinalData() {
    let username_tag = document.querySelector("span#username");
    let email_tag = document.querySelector("span#email");
    let password_tag = document.querySelector("span#password");
    username_tag.textContent = data[0];
    email_tag.textContent = data[1];
    password_tag.textContent = "*".repeat(data[2].length);
}