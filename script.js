const display = document.querySelector("#display");
const clearBtn = document.querySelector("#clear-button");
const numberBtn = document.querySelectorAll(".number-button");
const plusMinusBtn = document.querySelector(".plus-minus");
const floatingPointBtn = document.querySelector(".floating");
const percentageBtn = document.querySelector(".percentage");
const divideBtn = document.querySelector(".divide");
const multiplyBtn = document.querySelector(".multiply");
const subtractBtn = document.querySelector(".subtract");
const addBtn = document.querySelector(".add");
const equalBtn = document.querySelector(".equal-button");

let selected;
let lastBtnPressed = clearBtn;
let firstNumber;
let secondNumber;
let operator;
let displayValue = 0;

clearBtn.addEventListener('click', () => {
    firstNumber = 0;
    secondNumber = 0;
    display.textContent = "0";
    displayValue = 0;
    unselectButton();
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
    if (display.textContent.length > 9) {
        display.textContent = Number.parseFloat(displayValue).toExponential(2);
    }
    firstNumber = displayValue;
    /* displayValue = 0; */
    lastBtnPressed = percentageBtn;
});

divideBtn.addEventListener('click', () => {
    unselectButton();
    selectButton(divideBtn);
    if (lastBtnPressed.className.includes("operation-button") && firstNumber) {
        secondNumber = displayValue;
        unselectButton();
        selectButton(divideBtn);
        operator = "divide";
    } else if (lastBtnPressed.className.includes("number-button") && firstNumber) {
        secondNumber = displayValue;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        operator = "divide";
    } else if (!firstNumber) {
        firstNumber = displayValue;
        displayValue = 0;
        operator = "divide";
    }
    lastBtnPressed = divideBtn;
});

multiplyBtn.addEventListener('click', () => {
    unselectButton();
    selectButton(multiplyBtn);
    if (lastBtnPressed.className.includes("operation-button") && firstNumber) {
        secondNumber = displayValue;
        unselectButton();
        selectButton(multiplyBtn);
        operator = "multiply";
    } else if (lastBtnPressed.className.includes("number-button") && firstNumber) {
        secondNumber = displayValue;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        operator = "multiply";
    } else if (!firstNumber) {
        firstNumber = displayValue;
        displayValue = 0;
        operator = "multiply";
    }
    lastBtnPressed = multiplyBtn;
});

subtractBtn.addEventListener('click', () => {
    unselectButton();
    selectButton(subtractBtn);
    if (lastBtnPressed.className.includes("operation-button") && firstNumber) {
        secondNumber = displayValue;
        unselectButton();
        selectButton(subtractBtn);
        operator = "subtract";
    } else if (lastBtnPressed.className.includes("number-button") && firstNumber) {
        secondNumber = displayValue;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        operator = "subtract";
    } else if (!firstNumber) {
        firstNumber = displayValue;
        displayValue = 0;
        operator = "subtract";
    }
    lastBtnPressed = subtractBtn;
});

addBtn.addEventListener('click', () => {
    unselectButton();
    selectButton(addBtn);
    if (lastBtnPressed.className.includes("operation-button") && firstNumber) {
        secondNumber = displayValue;
        unselectButton();
        selectButton(addBtn);
        operator = "add";
    } else if (lastBtnPressed.className.includes("number-button") && firstNumber) {
        secondNumber = displayValue;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        operator = "add";
    } else if (!firstNumber) {
        firstNumber = displayValue;
        displayValue = 0;
        operator = "add";
    }
    lastBtnPressed = addBtn;
});

equalBtn.addEventListener('click', () => {
    unselectButton();
    if (lastBtnPressed.className.includes("operation-button") && firstNumber) {
        secondNumber = firstNumber;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        unselectButton();
    } else if (lastBtnPressed.className == "equal-button" && firstNumber) {
        if (!secondNumber) {
            display.textContent = firstNumber;
        } else {
            displayValue = operate(firstNumber, secondNumber, operator);
            display.textContent = displayValue;
            if (display.textContent.length > 9) {
                display.textContent = Number.parseFloat(displayValue).toExponential(2);
            }
            firstNumber = displayValue;
            displayValue = 0;
        }
    } else if (lastBtnPressed.className.includes("number-button") && firstNumber) {
        secondNumber = displayValue;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        displayValue = 0;
    } else if (!firstNumber) {
        firstNumber = displayValue;
        displayValue = 0;
    }
    lastBtnPressed = equalBtn;
});

numberBtn.forEach((button) => {
    button.addEventListener('click', () => {
        if (display.textContent === "0.") {
            displayValue = Number(display.textContent);
        } else if (display.textContent === "0" || selected) {
            display.textContent = "";
        }
        if (display.textContent.length == 9) {
            display.textContent = display.textContent;
        } else {
            display.textContent += button.textContent;
            displayValue = Number(display.textContent);
        }
        unselectButton();
        lastBtnPressed = button;
    })
});

floatingPointBtn.addEventListener('click', () => {
    if (lastBtnPressed.className.includes("operation-button")) {
        display.textContent = "0.";
        displayValue = Number(display.textContent);
    } else if (display.textContent.includes(".")) {
        display.textContent = display.textContent; 
    } else {
        display.textContent = display.textContent + ".";
        displayValue = Number(display.textContent);
    }
})

function add(a, b) {
    return Math.round((a + b) * 10000000) / 10000000;
}

function subtract(a, b) {
    return Math.round((a - b)  * 10000000) / 10000000;
}

function multiply(a, b) {
    return Math.round((a * b) * 10000000) / 10000000;
}

function divide(a, b) {
    return Math.round((a / b) * 10000000) / 10000000;
}

function percentage(num) {
    return num * 0.01;
}

function selectButton(button) {
    button.style.backgroundColor = "white";
    button.style.color = "black";
    selected = true;
}

function unselectButton() {
    divideBtn.style.backgroundColor = "orange";
    divideBtn.style.color = "black";
    multiplyBtn.style.backgroundColor = "orange";
    multiplyBtn.style.color = "black";
    subtractBtn.style.backgroundColor = "orange";
    subtractBtn.style.color = "black";
    addBtn.style.backgroundColor = "orange";
    addBtn.style.color = "black";
    selected = false;
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