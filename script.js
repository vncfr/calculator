const display = document.querySelector("#display");
const clearBtn = document.querySelector("#clear-button");
const numberBtn = document.querySelectorAll(".number-button");
let firstNumber;
let secondNumber;
let operator;
let displayValue;

clearBtn.addEventListener('click', () => {
    display.textContent = "0";
    displayValue = 0;
});

numberBtn.forEach((button) => {
    button.addEventListener('click', () => {
        if (display.textContent == "0") {
            display.textContent = "";
        }
        display.textContent += button.textContent;
        displayValue += Number(display.textContent);
    })
});

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            return divide(a, b);
    }
}