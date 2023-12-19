const display = document.querySelector("#display");
const clearBtn = document.querySelector("#clear-button");
const numberBtn = document.querySelectorAll(".number-button");
const plusMinusBtn = document.querySelector(".plus-minus");
let firstNumber;
let secondNumber;
let operator;
let displayValue;

clearBtn.addEventListener('click', () => {
    display.textContent = "0";
    displayValue = 0;
});

plusMinusBtn.addEventListener('click', () => {
    if (display.textContent !== "0" && display.textContent.includes("-")) {
        display.textContent = display.textContent.slice(1);
    } else if (display.textContent !== "0") {
        display.textContent = "-" + display.textContent;
    }
});

numberBtn.forEach((button) => {
    button.addEventListener('click', () => {
        if (display.textContent == "0") {
            display.textContent = "";
        }
        if (display.textContent.length == 9) {
            display.textContent = display.textContent;
        } else {
            display.textContent += button.textContent;
            displayValue += Number(display.textContent);
        }
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