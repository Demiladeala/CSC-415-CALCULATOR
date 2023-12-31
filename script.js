const historyIcon = document.getElementById("menuIcon");
const historyModal = document.getElementById("history-modal");
const closeHistory = document.getElementById("close-history");
const display = document.getElementById("display");
const numberButtons = document.querySelectorAll('.number-button');
const clearTextButton = document.querySelector('.clear-button');
const deleteTextButton = document.querySelector('.del-button');
const equalButton = document.querySelector('.equal-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const unaryOperatorButtons = document.querySelectorAll('.unary-operator');
const shadowElements = document.querySelectorAll('.hover-box-shadow-top');
const memoryButtons = document.querySelectorAll('.memory');
const memoryStyle = document.querySelectorAll('.mem-style');
const mrButton = document.querySelector('.mem-recall');
let result = null;
let memory = 0; // Default memory value
let operator = '';
let operatorActive = false;
let num1 = null;
let num2 = null;

historyIcon.addEventListener("click", () => {
    historyModal.classList.remove("hidden");
    let action = 'history.php';
    fetch(action, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        // Check if response is ok
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Error: ' + response.status);
        }
    }).then(function(responseData) {
        responseJson = JSON.parse(responseData);

        // Check for error
        if (responseJson.error) {
            console.error(responseJson.error);
            return;
        }

        // Send response to HTML
        document.getElementById("history").innerHTML = responseJson.message;
        console.log('Response:', responseJson);
        // Process response data
    }).catch(function(error) {
        console.error('Error:', error);
    });
});

closeHistory.addEventListener("click", () => {
    historyModal.classList.add("hidden");
});

shadowElements.forEach(element => {
    element.addEventListener('click', () => {
       element.style.boxShadow = '0  0 10px 2px rgba(0, 0, 0, 0.8)';
       setTimeout(() => {
        element.style.boxShadow = 'none';
    }, 100);
    });
});


unaryOperatorButtons.forEach(element => {
    element.addEventListener('click', () => {
        element.style.backgroundColor = 'white';
        setTimeout(() => {
            element.style.backgroundColor = '#323846';
        }, 100);
    });
});

memoryStyle.forEach(element => {
    element.addEventListener('click', () => {
        element.style.border = 'none';
        element.style.borderBottom = '2px solid #002233';
        setTimeout(() => {
            element.style.borderBottom = 'none';
        }, 100);
    });
});

memoryButtons.forEach(memButton => {
    memButton.addEventListener('click', () => {
        switch (memButton.textContent) {
            case 'M+':
                memory += parseFloat(display.textContent);
                break;
            case 'M-':
                memory -= parseFloat(display.textContent);
                break;
            case 'MR':
                display.textContent = memory;
                break;
            case 'MC':
                memory = 0;
                mrButton.classList.remove('mem-active');
                break;
            default:
                console.log("No matching case for memory button");
                break;
        }

        // Check if memory is not equal to 0 and the button is "MR"
        if (memory !== 0) {
            mrButton.classList.add('mem-active');
        } else {
            mrButton.classList.remove('mem-active');
        }
    });
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pressedNumber = button.textContent;
        if (display.textContent === '0' || operatorActive || result !== null) {
            if (button.textContent === '.') {
                if (operatorActive || result != null)
                {
                    display.textContent = '0';
                }
                display.textContent += pressedNumber;
            }
            else {
                display.textContent = pressedNumber;
            }
            operatorActive = false;
            operatorButtons.forEach(opButton => {
                opButton.classList.remove('active');
            });
            result = null;
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
    num1 = null;
    num2 = null;
    operatorButtons.forEach(opButton => {
        opButton.classList.remove('active');
    });

    // Style
    clearTextButton.style.backgroundColor = 'white';
    clearTextButton.style.color = 'black';
    setTimeout(() => {
        clearTextButton.style.backgroundColor = '#ef4444';
        clearTextButton.style.color = 'white';
    }, 100);
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
        // Check if button is active
        if (button.classList.contains('active')) {
            return;
        }
        // Remove the 'active' class from all operator buttons
        operatorButtons.forEach(opButton => {
            opButton.classList.remove('active');
        });

        // Add the 'active' class to the clicked operator button
        button.classList.add('active');
        operatorActive = true;

        // Add operator and num to variables
        operator = button.classList.contains('pow') ? 'exp' : button.textContent;
        if (num1 === null) {
            num1 = parseFloat(display.textContent);
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
        let action = 'calculator.php';
        num1 = parseFloat(display.textContent);
        result = unaryOperationsFunc(operator, num1);
        display.textContent = result;
        let data = {
            pNum1: num1,
            pNum2: null,
            pOperator: operator,
            pResult: result
        };
        fetch(action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Handle response data
        }).then(function(request) {
            // Check if response is ok
            if (request.ok) {
                return request.text();
            } else {
                throw new Error('Error: ' + request.status);
            }
        }).then(function(responseData) {
            console.log('Response:', responseData);
            // Process response data
        }).catch(function(error) {
            console.error('Error:', error);
        });
        num1 = null;
        operator = '';
    });
});

equalButton.addEventListener('click', () => {
    if (num1 !== null) {
        let action = 'calculator.php';
        num2 = parseFloat(display.textContent);
        result = binaryOperationsFunc(operator, num1, num2);
        display.textContent = result;
        let data = {
            pNum1: num1,
            pNum2: num2,
            pOperator: operator,
            pResult: result
        };
        fetch(action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Handle response data
        }).then(function(request) {
            // Check if response is ok
            if (request.ok) {
                return request.text();
            } else {
                throw new Error('Error: ' + request.status);
            }
        }).then(function(responseData) {
            console.log('Response:', responseData);
            // Process response data
        }).catch(function(error) {
            console.error('Error:', error);
        });
        num1 = null;
        num2 = null;
        operator = '';
    }

    // Style
    equalButton.style.backgroundColor = 'white';
    equalButton.style.color = 'black';
    setTimeout(() => {
        equalButton.style.backgroundColor = '#4fd14d';
        equalButton.style.color = 'white';
    }, 100);
})

// Binary Operation Functions
function binaryOperationsFunc(operator, num1, num2) {
    num1 = Decimal(num1);
    num2 = Decimal(num2);
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
    num1 = Decimal(num1);
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
    var result = num1.plus(num2);
    return result;
}

// Subtraction function
function subtractFunc(num1, num2) {
    var result = num1.minus(num2);
    return result;
}

// Division function
function divideFunc(num1, num2) {
    var result = num1.div(num2);
    return result;
}

// Multiply function
function multiplyFunc(num1, num2) {
    var result = num1.times(num2);
    return result;
}

// Scientific functions
// Sine function
function sinFunc(num1) {
    var angle = num1.times(Decimal(Math.PI)).div(Decimal(180));
    return angle.sine();
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
    return Math.pow(num1, 1 / 3);
}
