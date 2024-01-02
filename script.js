const display = document.querySelector("#display");
const clearBtn = document.querySelector("#clear-button");
const numberBtn = Array.from(document.querySelectorAll(".number-button"));
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
let firstNumber = 0;
let secondNumber = 0;
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
    operator = null;
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
    lastBtnPressed = plusMinusBtn;
});

percentageBtn.addEventListener('click', function () {
    unselectButton();
    clickEffect(this);
    if (firstNumber && !secondNumber && lastBtnPressed.className.includes("percentage")) {
        displayValue = percentage(displayValue);
        display.textContent = displayValue;
        firstNumber = displayValue;
    } else if (firstNumber && secondNumber && lastBtnPressed.className.includes("percentage")) {
        secondNumber = secondNumber * percentage(firstNumber);
        display.textContent = secondNumber;
    } else if (firstNumber && !secondNumber && (operator == "multiply" || operator == "divide")) {
        secondNumber = percentage(displayValue);
        display.textContent = secondNumber;
    } else if (firstNumber && !secondNumber) {
        secondNumber = Math.round(firstNumber * percentage(displayValue) * 10000000) / 10000000;
        display.textContent = secondNumber;
    } else {
        firstNumber = displayValue;
        displayValue = percentage(firstNumber);
        display.textContent = displayValue;
        firstNumber = displayValue;
    }
    scientificNotation(display.textContent);
    lastBtnPressed = percentageBtn;
    selected = true;
});

divideBtn.addEventListener('click', () => {
    unselectButton();
    selectButton(divideBtn);
    if (lastBtnPressed.className.includes("percentage") && firstNumber && secondNumber) {
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        scientificNotation(display.textContent);
        firstNumber = displayValue;
    } else if (lastBtnPressed.className.includes("plus-minus") && firstNumber != 0) {
        firstNumber = displayValue;
    } else if (lastBtnPressed.className.includes("operation-button") && firstNumber != 0) {
        secondNumber = displayValue;
    } else if (lastBtnPressed.className.includes("number-button") && firstNumber != 0) {
        secondNumber = displayValue;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        scientificNotation(display.textContent);
        firstNumber = displayValue;
    } else if (!firstNumber) {
        firstNumber = displayValue;
        displayValue = 0;
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
        scientificNotation(display.textContent);
        firstNumber = displayValue;
    } else if (lastBtnPressed.className.includes("plus-minus") && firstNumber != 0) {
        firstNumber = displayValue;
    } else if (lastBtnPressed.className.includes("operation-button") && firstNumber != 0) {
        secondNumber = displayValue;
    } else if (lastBtnPressed.className.includes("number-button") && firstNumber != 0) {
        secondNumber = displayValue;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        scientificNotation(display.textContent);
        firstNumber = displayValue;
    } else if (!firstNumber) {
        firstNumber = displayValue;
        displayValue = 0;
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
        scientificNotation(display.textContent);
        firstNumber = displayValue;
    } else if (lastBtnPressed.className.includes("plus-minus") && firstNumber != 0) {
        firstNumber = displayValue;
    } else if (lastBtnPressed.className.includes("operation-button") && firstNumber != 0) {
        secondNumber = displayValue;
    } else if (lastBtnPressed.className.includes("number-button") && firstNumber != 0) {
        secondNumber = displayValue;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        scientificNotation(display.textContent);
        firstNumber = displayValue;
    } else if (!firstNumber) {
        firstNumber = displayValue;
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
        scientificNotation(display.textContent);
        firstNumber = displayValue;
    } else if (lastBtnPressed.className.includes("plus-minus") && firstNumber != 0) {
        firstNumber = displayValue;
    } else if (lastBtnPressed.className.includes("operation-button") && firstNumber != 0) {
        secondNumber = displayValue;
    } else if (lastBtnPressed.className.includes("number-button") && firstNumber != 0) {
        secondNumber = displayValue;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        scientificNotation(display.textContent);
        firstNumber = displayValue;
    } else if (!firstNumber) {
        firstNumber = displayValue;
        displayValue = 0;
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
        firstNumber = displayValue;
        unselectButton();
    } else if (lastBtnPressed.className.includes("plus-minus") && firstNumber != 0) {
        firstNumber = displayValue;
    } else if (lastBtnPressed.className.includes("operation-button") && firstNumber != 0) {
        secondNumber = firstNumber;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        firstNumber = displayValue;
        unselectButton();
    } else if (lastBtnPressed.className == "equal-button" && (firstNumber || secondNumber)) {
        if (!secondNumber) {
            display.textContent = firstNumber;
        } else {
            displayValue = operate(firstNumber, secondNumber, operator);
            display.textContent = displayValue;
            firstNumber = displayValue;
        }
    } else if (lastBtnPressed.className.includes("number-button") && firstNumber != 0) {
        secondNumber = displayValue;
        displayValue = operate(firstNumber, secondNumber, operator);
        display.textContent = displayValue;
        firstNumber = displayValue;
    } else if (!firstNumber) {
        firstNumber = displayValue;
    }
    scientificNotation(display.textContent);
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
});

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        case "Enter":
            equalBtn.click();
            break;
        case "=":
            equalBtn.click();
            break;
        case "'":
            plusMinusBtn.click();
            break;
        case "+":
            addBtn.click();
            break;
        case "-":
            subtractBtn.click();
            break;
        case "*":
            multiplyBtn.click();
            break;
        case "/":
            divideBtn.click();
            break;
        case "Backspace":
            backspaceBtn.click();
            break;
        case ",":
            floatingPointBtn.click();
            break;
        case ".":
            floatingPointBtn.click();
            break;
        case "%":
            percentageBtn.click();
            break;
        case "0":
            numberBtn[9].click();
            break;
        case "Delete":
            clearBtn.click();
            break;
        case "1":
            numberBtn[6].click();
            break;
        case "2":
            numberBtn[7].click();
            break;
        case "3":
            numberBtn[8].click();
            break;
        case "4":
            numberBtn[3].click();
            break;
        case "5":
            numberBtn[4].click();
            break;
        case "6":
            numberBtn[5].click();
            break;
        case "7":
            numberBtn[0].click();
            break;
        case "8":
            numberBtn[1].click();
            break;
        case "9":
            numberBtn[2].click();
            break;
        default:
            return;
    }

    event.preventDefault();
}, true);

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
        case undefined:
            return secondNumber;
    }
}

function clickEffect(element) {
    const originalColor = element.style.backgroundColor;
    element.style.backgroundColor = "white";
    setTimeout(() => {
        element.style.backgroundColor = originalColor;
    }, 75)
}

function scientificNotation(value) {
    if (String(value).length > 9) {
        if (!String(value).includes(".") || String(value).indexOf('.') > 7 || (0 < String(value) < 1)) {
            display.textContent = Number.parseFloat(value).toExponential(2);
        } else if (String(value).indexOf('.') <= 7) {
            if (Number(String(value).slice(String(value).indexOf("."))) != 0) {
                display.textContent = Number(value).toFixed(7 - String(value).indexOf("."));
            }
        }
    }
}