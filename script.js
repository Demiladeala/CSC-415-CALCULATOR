const display = document.getElementById("display");
const numberButtons = document.querySelectorAll('.number-button');
const clearTextButton = document.querySelector('.clear-button');
const deleteTextButton = document.querySelector('.del-button');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pressedNumber = button.textContent;
        if (display.textContent === '0') {
            display.textContent = pressedNumber
        } else {
            if (display.textContent.length !== 9)
            display.textContent += pressedNumber;   
        }
    });
});


clearTextButton.addEventListener('click', () => {
    display.textContent = '0';
});

deleteTextButton.addEventListener('click', () => {
    if (display.textContent !== '0') {
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent === '') {
            display.textContent = '0';
        }
    }
});

console.log(display)