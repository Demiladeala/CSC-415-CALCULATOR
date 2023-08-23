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
function cubeFunc(num1) {
    return Math.pow(num1, 1/3);
}