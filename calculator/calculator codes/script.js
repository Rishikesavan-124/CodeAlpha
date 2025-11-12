// Calculator state
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;
let expression = '';

// DOM elements
const display = document.getElementById('display');
const expressionDisplay = document.getElementById('expression');
const buttons = document.querySelectorAll('.btn');

// Initialize calculator
function init() {
    updateDisplay();
    setupButtonListeners();
    setupKeyboardListeners();
}

// Setup button click listeners
function setupButtonListeners() {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button);
            // Visual feedback
            button.classList.add('pressed');
            setTimeout(() => button.classList.remove('pressed'), 200);
        });
    });
}

// Handle button click
function handleButtonClick(button) {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (value !== undefined) {
        // Number or decimal point
        inputNumber(value);
    } else if (action) {
        // Operator or action
        handleAction(action);
    }
}

// Input number or decimal
function inputNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }

    if (num === '.') {
        // Handle decimal point
        if (currentInput.indexOf('.') === -1) {
            currentInput += '.';
        }
    } else {
        // Handle number
        if (currentInput === '0') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }

    updateDisplay();
    updateExpression();
}

// Handle operator or action
function handleAction(action) {
    switch (action) {
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            handleOperator(action);
            break;
        case 'equals':
            calculate();
            break;
        case 'clear':
            clearAll();
            break;
        case 'clearEntry':
            clearEntry();
            break;
        case 'backspace':
            backspace();
            break;
    }
}

// Handle operator
function handleOperator(op) {
    const inputValue = parseFloat(currentInput);

    if (previousInput === '') {
        previousInput = inputValue;
    } else if (operator) {
        // Calculate previous operation first
        const result = performCalculation();
        previousInput = result;
        currentInput = String(result);
        updateDisplay();
    }

    operator = op;
    shouldResetDisplay = true;
    updateExpression();
}

// Perform calculation
function performCalculation() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return currentInput;

    let result;
    switch (operator) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                return 'Error';
            }
            result = prev / current;
            break;
        default:
            return current;
    }

    // Round to avoid floating point errors
    return Math.round(result * 100000000) / 100000000;
}

// Calculate and display result
function calculate() {
    if (operator === null) return;

    const result = performCalculation();

    if (result === 'Error') {
        display.textContent = 'Error';
        display.classList.add('error');
        currentInput = '0';
        previousInput = '';
        operator = null;
        expression = '';
        updateExpression();
        shouldResetDisplay = true;
        setTimeout(() => {
            display.classList.remove('error');
        }, 2000);
        return;
    }

    expression = `${previousInput} ${getOperatorSymbol(operator)} ${currentInput} =`;
    updateExpression();

    currentInput = String(result);
    previousInput = '';
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();

    // Visual feedback
    display.classList.add('updated');
    setTimeout(() => {
        display.classList.remove('updated');
    }, 200);
}

// Get operator symbol for display
function getOperatorSymbol(op) {
    const symbols = {
        'add': '+',
        'subtract': '−',
        'multiply': '×',
        'divide': '÷'
    };
    return symbols[op] || op;
}

// Clear all
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    expression = '';
    shouldResetDisplay = false;
    updateDisplay();
    updateExpression();
}

// Clear entry (current input only)
function clearEntry() {
    currentInput = '0';
    updateDisplay();
    updateExpression();
}

// Backspace
function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
    updateExpression();
}

// Update display
function updateDisplay() {
    // Format number for display
    let displayValue = currentInput;
    
    // Add thousand separators
    if (currentInput !== 'Error' && currentInput !== '0' && !isNaN(currentInput)) {
        const parts = currentInput.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        displayValue = parts.join('.');
    }

    display.textContent = displayValue;
}

// Update expression display
function updateExpression() {
    if (operator && previousInput !== '') {
        expression = `${previousInput} ${getOperatorSymbol(operator)}`;
    } else {
        expression = '';
    }
    expressionDisplay.textContent = expression;
}

// Keyboard support
function setupKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
        // Prevent default for calculator keys
        if (/[0-9+\-*/.=]/.test(e.key) || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Escape') {
            e.preventDefault();
        }

        // Number keys
        if (/[0-9]/.test(e.key)) {
            inputNumber(e.key);
            simulateButtonPress(`[data-value="${e.key}"]`);
        }

        // Decimal point
        if (e.key === '.' || e.key === ',') {
            inputNumber('.');
            simulateButtonPress('[data-value="."]');
        }

        // Operators
        if (e.key === '+') {
            handleOperator('add');
            simulateButtonPress('[data-action="add"]');
        }
        if (e.key === '-') {
            handleOperator('subtract');
            simulateButtonPress('[data-action="subtract"]');
        }
        if (e.key === '*') {
            handleOperator('multiply');
            simulateButtonPress('[data-action="multiply"]');
        }
        if (e.key === '/') {
            handleOperator('divide');
            simulateButtonPress('[data-action="divide"]');
        }

        // Equals
        if (e.key === '=' || e.key === 'Enter') {
            calculate();
            simulateButtonPress('[data-action="equals"]');
        }

        // Clear
        if (e.key === 'Escape') {
            clearAll();
            simulateButtonPress('[data-action="clear"]');
        }

        // Backspace
        if (e.key === 'Backspace') {
            backspace();
            simulateButtonPress('[data-action="backspace"]');
        }

        // Delete (clear entry)
        if (e.key === 'Delete') {
            clearEntry();
            simulateButtonPress('[data-action="clearEntry"]');
        }
    });
}

// Simulate button press for visual feedback
function simulateButtonPress(selector) {
    const button = document.querySelector(`.btn${selector}`);
    if (button) {
        button.classList.add('pressed');
        setTimeout(() => button.classList.remove('pressed'), 200);
    }
}

// Initialize calculator when page loads
init();

