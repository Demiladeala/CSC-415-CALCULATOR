import './calculatorFunc.js';

const display = document.getElementById("display");
const numberButtons = document.querySelectorAll('.number-button');
const clearTextButton = document.querySelector('.clear-button');
const deleteTextButton = document.querySelector('.del-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const shadowElements = document.querySelectorAll('.hover-box-shadow-top');
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
        if (display.textContent === '0' || operatorActive) {
            display.textContent = pressedNumber;
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
    if (display.textContent !== '0' && !operator) {
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
        operator = button.textContent;
        if (num1 == null) {
            num1 += parseFloat(display.textContent);
        }
        
        // Clear display text and replace with new text(num 2)

    });
});