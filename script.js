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
const backspaceBtn = document.querySelector("#backspace");

let selected;
let lastBtnPressed = clearBtn;
let firstNumber;
let secondNumber;
let operator;
let displayValue = 0;

backspaceBtn.addEventListener('click', function () {
    clickEffect(this);
    if (display.textContent.length <= 2) {
        if (isNaN(Number(display.textContent.slice(0, -1))) || display.textContent.slice(0, -1) == 0) {
            display.textContent = 0;
            displayValue = display.textContent;
        } else {
            display.textContent = display.textContent.slice(0, -1);
            displayValue = display.textContent;
        }
    } else {
        display.textContent = display.textContent.slice(0, -1);
        displayValue = display.textContent;
    }
    lastBtnPressed = backspaceBtn;
})

clearBtn.addEventListener('click', function () {
    clickEffect(this);
    firstNumber = 0;
    secondNumber = 0;
    display.textContent = "0";
    displayValue = 0;
    unselectButton();
});

plusMinusBtn.addEventListener('click', function () {
    clickEffect(this);
    if (displayValue !== 0 && display.textContent.charAt(0) == "-") {
        display.textContent = display.textContent.slice(1);
        displayValue = Number(display.textContent);
    } else if (displayValue !== 0) {
        display.textContent = "-" + display.textContent;
        displayValue = Number(display.textContent);
    }
});

percentageBtn.addEventListener('click', function () {
    unselectButton();
    clickEffect(this);
    if (firstNumber && !secondNumber && lastBtnPressed.className.includes("percentage")) {
        /* secondNumber = displayValue; */
        displayValue = percentage(displayValue);
        display.textContent = displayValue;
        firstNumber = displayValue;
        /* secondNumber = displayValue; */
    } else if (firstNumber && secondNumber && lastBtnPressed.className.includes("percentage")) {
        secondNumber = secondNumber * percentage(firstNumber);
        display.textContent = secondNumber;
    } else if (firstNumber && !secondNumber) {
        secondNumber = firstNumber * percentage(displayValue);
        display.textContent = secondNumber;
        /* displayValue = secondNumber;
        display.textContent = displayValue;
        firstNumber = displayValue.toFixed(50);
        secondNumber = 0; */
    } else {
        firstNumber = displayValue;
        displayValue = percentage(firstNumber);
        display.textContent = displayValue;
        firstNumber = displayValue;
    }
    if (display.textContent.length > 9) {
        display.textContent = Number.parseFloat(displayValue).toExponential(2);
    }
    lastBtnPressed = percentageBtn;
    selected = true;
});

divideBtn.addEventListener('click', () => {
    unselectButton();
    selectButton(divideBtn);
    if (lastBtnPressed.className.includes("percentage") && firstNumber && secondNumber) {
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        operator = "divide";
    } else if (lastBtnPressed.className.includes("operation-button") && firstNumber) {
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
    operator = "divide";
    lastBtnPressed = divideBtn;
});

multiplyBtn.addEventListener('click', () => {
    unselectButton();
    selectButton(multiplyBtn);
    if (lastBtnPressed.className.includes("percentage") && firstNumber && secondNumber) {
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        operator = "multiply";
    } else if (lastBtnPressed.className.includes("operation-button") && firstNumber) {
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
    operator = "multiply";
    lastBtnPressed = multiplyBtn;
});

subtractBtn.addEventListener('click', () => {
    unselectButton();
    selectButton(subtractBtn);
    if (lastBtnPressed.className.includes("percentage") && firstNumber && secondNumber) {
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        operator = "subtract";
    } else if (lastBtnPressed.className.includes("operation-button") && firstNumber) {
        secondNumber = displayValue;
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
        operator = "subtract";
    }
    operator = "subtract";
    lastBtnPressed = subtractBtn;
});

addBtn.addEventListener('click', () => {
    unselectButton();
    selectButton(addBtn);
    if (lastBtnPressed.className.includes("percentage") && firstNumber && secondNumber) {
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        operator = "add";
    } else if (lastBtnPressed.className.includes("operation-button") && firstNumber) {
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
    operator = "add";
    lastBtnPressed = addBtn;
});

equalBtn.addEventListener('click', function () {
    unselectButton();
    clickEffect(this);
    if (lastBtnPressed.className.includes("percentage") && firstNumber && secondNumber) {
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        unselectButton();
    }
    else if (lastBtnPressed.className.includes("operation-button") && firstNumber) {
        secondNumber = firstNumber;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        if (display.textContent.length > 9) {
            display.textContent = Number.parseFloat(displayValue).toExponential(2);
        }
        firstNumber = displayValue;
        unselectButton();
    } else if (lastBtnPressed.className == "equal-button" && (firstNumber || secondNumber)) {
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
    selected = true;
});

numberBtn.forEach((button) => {
    button.addEventListener('click', function () {
        clickEffect(this);
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
    return (num * 0.01);
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

function clickEffect(element) {
    const originalColor = element.style.backgroundColor;
    element.style.backgroundColor = "white";
    setTimeout(() => {
        element.style.backgroundColor = originalColor;
    }, 75)
}

function scientificNotation (str) {
    if (str.length > 9) {
        str = Number.parseFloat(displayValue).toExponential(2);
    }
}