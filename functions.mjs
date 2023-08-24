import { Decimal } from "decimal.js";

// Basic Arithmetic
// Add function
export function addFunc(num1, num2) {
    var result = num1 + num2;
    return result;
}

// Subtraction function
export function subtractFunc(num1, num2) {
    var result = num1 - num2;
    return result;
}

// Division function
export function divideFunc(num1, num2) {
    var result = num1 / num2;
    return result;
}

// Multiply function
export function multiplyFunc(num1, num2) {
    var result = Decimal(num1).times(Decimal(num2));
    return result;
}

// Scientific functions
// Sine function
export function sinFunc(num1) {
    var angle = (num1 * Math.PI) / 180;
    return Math.sin(angle);
}

// Cosine function
export function cosFunc(num1) {
    var angle = (num1 * Math.PI) / 180;
    return Math.cos(angle);
}

// Tan function
export function tanFunc(num1) {
    var angle = (num1 * Math.PI) / 180;
    return Math.tan(angle);
}

// Power function
export function powFunc(num1, exponent) {
    return Math.pow(num1, exponent);
}

// Square root function
export function sqrtFunc(num1) {
    return Math.sqrt(num1);
}

// Cube root function
export function cbrtFunc(num1) {
    return Math.pow(num1, 1 / 3);
}