const display = document.querySelector("#display");
const clearBtn = document.querySelector("#clear-button");
const numberBtn = document.querySelectorAll(".number-button");
const plusMinusBtn = document.querySelector(".plus-minus");
const floatingPointBtn = document.querySelector(".floating-button");
const percentageBtn = document.querySelector(".percentage");
const divideBtn = document.querySelector(".divide");
const multiplyBtn = document.querySelector(".multiply");
const subtractBtn = document.querySelector(".subtract");
const addBtn = document.querySelector(".add");


let firstNumber;
let secondNumber;
let operator = null;
let displayValue = 0;

clearBtn.addEventListener('click', () => {
    firstNumber = 0;
    secondNumber = 0;
    display.textContent = "0";
    displayValue = 0;
    unselectButton();
    operator = null;
});

plusMinusBtn.addEventListener('click', () => {
    if (displayValue !== "0" && display.textContent.includes("-")) {
        display.textContent = display.textContent.slice(1);
        displayValue = Number(display.textContent);
    } else if (displayValue !== 0) {
        display.textContent = "-" + display.textContent;
        displayValue = Number(display.textContent);
    }
});

percentageBtn.addEventListener('click', () => {
    displayValue = percentage(displayValue);
    display.textContent = displayValue;
});

divideBtn.addEventListener('click', () => {
    operator = "divide";
    selectButton(divideBtn);
    if (firstNumber) {
        secondNumber = displayValue;
        displayValue = operate(firstNumber, secondNumber, "divide");
        display.textContent = displayValue;
    } else {
        firstNumber = displayValue;
        displayValue = 0;
    }
});

numberBtn.forEach((button) => {
    button.addEventListener('click', () => {
        if (display.textContent == "0.") {
            displayValue = Number(display.textContent);
        }
        if (displayValue == "0") {
            display.textContent = "";
        }
        if (display.textContent.length == 9) {
            display.textContent = display.textContent;
        } else {
            display.textContent += button.textContent;
            displayValue = Number(display.textContent);
        }
    })
});

floatingPointBtn.addEventListener('click', () => {
    if (display.textContent.includes(".")) {
        display.textContent = display.textContent;
    } else {
        display.textContent = display.textContent + ".";
        displayValue = Number(display.textContent);
    }
})

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
    return Math.round(a / b * 10000000) / 10000000;
}

function percentage(num) {
    return num * 0.01;
}

function selectButton(button) {
    button.style.backgroundColor = "white";
    button.style.color = "orange";
    button.setAttribute("selected", true);
}

function unselectButton() {
    switch (operator) {
        case "add":
            button = addBtn;
            break;
        case "subtract":
            button = subtractBtn;
            break;
        case "multiply":
            button = multiplyBtn;
            break;
        case "divide":
            button = divideBtn;
            break;
    }
    button.style.backgroundColor = "orange";
    button.style.color = "black";
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