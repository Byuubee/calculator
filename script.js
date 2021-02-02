const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousTextElement = document.querySelector('[data-previous]');
const currentTextElement = document.querySelector('[data-current]');

let previousOperand = '';
let currentOperand = '';
let currentOperator = undefined;

numberButtons.forEach(button => button.addEventListener('click', ()=>{
    appendNumber(button.textContent);
    updateDisplay();
}));


function appendNumber(number){
    if(number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
    
}




operationButtons.forEach(button => button.addEventListener('click', ()=>{
    selectOperator(button.textContent);
    updateDisplay();
}));


function selectOperator(operator){
    if(currentTextElement.textContent === "Math ERROR") return;
    if(currentOperand === '') return;
    if(previousOperand !== '') {
        operate(currentOperator, previousOperand, currentOperand);
    }
    currentOperator = operator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}
function updateDisplay(){
    currentTextElement.textContent = currentOperand;
    previousTextElement.textContent = previousOperand;
    if(currentOperator != null){
        previousTextElement.textContent = `${previousOperand} ${currentOperator}`
    }
}

deleteButton.addEventListener('click', deleteLast);

function deleteLast(){
    if(currentTextElement.textContent === "Math ERROR") return;
    currentOperand = currentOperand.toString().slice(0 , -1);
    updateDisplay();
}
clearButton.addEventListener('click',allClear)

function allClear(){
    currentOperand = '';
    previousOperand = '';
    currentOperator = undefined;
    updateDisplay();
}

equalsButton.addEventListener('click', ()=>{
    operate(currentOperator, previousOperand, currentOperand);
});


function add(x,y){
    return x+y;
}
function subtract(x,y){
    return x-y;
}
function multiply(x,y){
    return x*y;
}
function divide(x,y){
    if(y === 0){
    return currentTextElement.textContent = "Math ERROR";
    }
    return x/y;
}
function operate(operator,x,y){
    let result;
    x = parseFloat(x);
    y = parseFloat(y);

    switch(operator){
        case "+":
            result = add(x,y);
            break;
        case "-":
            result = subtract(x,y);
            break;
        case "×":
            result = multiply(x,y);
            break;
        case "÷":
            result = divide(x,y);
            break;
        default: return;
    }
    currentOperand = result;
    previousOperand ='';
    currentOperator = undefined;
    updateDisplay();

    
}