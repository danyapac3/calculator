let currentNumberElement = document.querySelector('.current-number');
let prevNumberElement = document.querySelector('.prev-number');
let operationElement = document.querySelector('.operation')
let calculatorElement = document.querySelector('.calculator');
// let buttons = document.querySelectorAll('.btn');

/**
* @param {string} number;
* @return {string}
*/
function formatNumber(number) {
  const digitsLimit = 15;
  
  // remove leading zeros

}

const initialFontSizes = new WeakMap();
function adjustFontSize(element) {
  const elementStyles = getComputedStyle(element); 

  if (!initialFontSizes.has(element)) {
    initialFontSizes.set(element, elementStyles.fontSize);
  }

  let fontSize = Number.parseInt(initialFontSizes.get(element));
  element.style.fontSize = fontSize + 'px';
  let {clientWidth, scrollWidth} = element;
  while (scrollWidth > clientWidth) {
    element.style.fontSize = (--fontSize) + 'px';
    clientWidth = element.clientWidth;
    scrollWidth = element.scrollWidth;
  }
}

function updateScreen() {
  const digits = currentNumber
  .split('.').join('')
  .split('-').join('');
  if (
    digits.length > 15 
    || Number.isNaN(Number(currentNumber))
    || currentNumber === 'Infinity'
  ) {
    currentNumber = 'Error';
  }

  currentNumberElement.textContent = currentNumber;
  prevNumberElement.textContent = prevNumber;
  operationElement.textContent = currentOperation;
  adjustFontSize(prevNumberElement);
  adjustFontSize(currentNumberElement);
}

function clearAll() {
  currentNumber = '0';
  prevNumber = null;
  currentOperation = null;
}

function clear() {
  currentNumber = '0';
}

function putDigit(digit) {
  if (currentNumber === 'Error') return;
  if (digit === 'inverse') {
    currentNumber = (currentNumber.at(0) === '-')
      ? currentNumber.split('-').join('')
      : '-' + currentNumber;
    return
  }
 
  if (currentNumber === '0' && digit !== '.') {
    currentNumber = digit;
  }else if (currentNumber === '-0' && digit !== '.') {
      currentNumber = digit;
  } else if (!(digit === '.' && currentNumber.includes('.'))) {
    currentNumber += digit;
  }
}

function operate(char) {
  if (currentNumber === 'Error') {
    return;
  }
  if (prevNumber === null) {
    prevNumber = currentNumber;
    currentNumber = '0';
  }
  currentOperation = char;
}

function calculate() {
  if (currentNumber === 'Error' || currentOperation === null) {
    return;
  }
  result = '0';

  switch (currentOperation) {
    case '+':
      result = Number(currentNumber) + Number(prevNumber);
      break;
    case '-':
      result = Number(prevNumber) - Number(currentNumber);
      break;
    case '*':
      result = Number(prevNumber) * Number(currentNumber);
      break;
    case '/':
      result = Number(prevNumber) / Number(currentNumber);
      break;
  }

  clearAll();
  currentNumber = result.toString();
}

// Global Variables
let currentNumber = '0';
let prevNumber = null; 
let currentOperation = null;

// Init calculator
clearAll();
updateScreen();

calculatorElement.addEventListener('click', ({target}) => {
  let btn = null;

  // Look for btn
  if (target.classList.contains('btn')) {
    btn = target;
  } else if (target.parentElement.classList.contains('btn')) {
    btn = target.parentElement;
  } else {
    return;
  }

  const operation = btn.dataset.operation;
  switch(operation) {
    case '1': case '2': case '3': case '4': case '5':
    case '6': case '7': case '8': case '9': case '0':
    case '.': case 'inverse':
      putDigit(operation);
      break;
    case '+': case '-': case '*': case '/':
      operate(operation);
      break;
    case '=':
      calculate();
      break;
    case 'clear':
      clear();
      break;
    case 'clear-all':
      clearAll();
      break;
  }

  updateScreen();
});