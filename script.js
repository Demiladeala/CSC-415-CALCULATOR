const display = document.getElementById("display");
const numberButtons = document.querySelectorAll('.number-button');
const clearTextButton = document.querySelector('.clear-button');
const deleteTextButton = document.querySelector('.del-button');
const equalButton = document.querySelector('.equal-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const unaryOperatorButtons = document.querySelectorAll('.unary-operator');
const shadowElements = document.querySelectorAll('.hover-box-shadow-top');
let result = null;
let operator = '';
let operatorActive = false;
let num1 = null;
let num2 = null;

shadowElements.forEach(element => {
    element.addEventListener('click', () => {
        if (element.classList.contains('hover-box-shadow-top')) {
            setTimeout(() => {
                element.classList.remove('hover-box-shadow-top');
            }, 100);    
        } else {
            element.classList.add('hover-box-shadow-top');
        }
    });
});


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pressedNumber = button.textContent;
        if (display.textContent === '0' || operatorActive || result !== null) {
            result = null;
            if (button.textContent === '.') {
                display.textContent += pressedNumber;
            }
            else {
                display.textContent = pressedNumber;
            }
            operatorActive = false;
            operatorButtons.forEach(opButton => {
                opButton.classList.remove('active');
            });
        } else {
            if (display.textContent.length !== 9) {
                if (pressedNumber === '.' && display.textContent.includes('.'))
                    return;
                display.textContent += pressedNumber;
            }
        }
    });
});

clearTextButton.addEventListener('click', () => {
    display.textContent = '0';
    operator = '';
    operatorActive = false;
    operatorButtons.forEach(opButton => {
        opButton.classList.remove('active');
    });
});

deleteTextButton.addEventListener('click', () => {
    if (display.textContent !== '0' && !operatorActive) {
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent === '') {
            display.textContent = '0';
        }
    }
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove the 'active' class from all operator buttons
        operatorButtons.forEach(opButton => {
            opButton.classList.remove('active');
        });

        // Add the 'active' class to the clicked operator button
        button.classList.add('active');
        operatorActive = true;

        // Add operator and num to variables
        if (button.classList.contains('pow'))
        {
            operator = 'exp';
        }
        else {
            operator = button.textContent;
        }
        if (num1 == null) {
            num1 += parseFloat(display.textContent);
        }
    });
});

unaryOperatorButtons.forEach(opButton => {
    opButton.addEventListener('click', () => {
        if (opButton.classList.contains('trig')) {
            operator = opButton.textContent;
        }
        else if (opButton.classList.contains('sqrt')) {
            operator = 'sqrt';
        }
        else if (opButton.classList.contains('cbrt')) {
            operator = 'cbrt';
        }
        num1 = parseFloat(display.textContent);
        result = unaryOperationsFunc(operator, num1);
        display.textContent = result;
        num1 = null;
        operator = '';
    })
})
equalButton.addEventListener('click', () =>  {
    if (num1 != null) {
        num2 = parseFloat(display.textContent);
        result = binaryOperationsFunc(operator, num1, num2);
        display.textContent = result;
        num1 = null;
        num2 = null;
        operator = '';
    }
})

// Binary Operation Functions
function binaryOperationsFunc(operator, num1, num2) {
    switch (operator) {
        case '÷':
            return divideFunc(num1, num2);
        case 'x':
            return multiplyFunc(num1, num2);
        case '+':
            return addFunc(num1, num2);
        case '-':
            return subtractFunc(num1, num2);
        case 'exp':
            return powFunc(num1, num2);
        default:
            console.log("Operator is empty");
            break;
    }
}

// Unary Operation Functions
function unaryOperationsFunc(operator, num1) {
    switch (operator) {
        case 'sin':
            return sinFunc(num1);
        case 'cos':
            return cosFunc(num1);
        case 'tan':
            return tanFunc(num1);
        case 'sqrt':
            return sqrtFunc(num1);
        case 'cbrt':
            return cbrtFunc(num1);
        default:
            console.log("Operator does not match any case");
            break;
    }
}
// Basic Arithmetic
// Add function
function addFunc(num1, num2) {
    var result = num1 + num2;
    return result;
}

// Subtraction function
function subtractFunc(num1, num2) {
    var result = num1 - num2;
    return result;
}

// Division function
function divideFunc(num1, num2) {
    var result = num1 / num2;
    return result;
}

// Multiply function
function multiplyFunc(num1, num2) {
    var result = num1 * num2;
    return result;
}

// Scientific functions
// Sine function
function sinFunc(num1) {
    var angle = (num1 * Math.PI) / 180;
    return Math.sin(angle);
}

// Cosine function
function cosFunc(num1) {
    var angle = (num1 * Math.PI) / 180;
    return Math.cos(angle);
}

// Tan function
function tanFunc(num1) {
    var angle = (num1 * Math.PI) / 180;
    return Math.tan(angle);
}

// Power function
function powFunc(num1, exponent) {
    return Math.pow(num1, exponent);
}

// Square root function
function sqrtFunc(num1) {
    return Math.sqrt(num1);
}

// Cube root function
function cbrtFunc(num1) {
    return Math.pow(num1, 1/3);
}