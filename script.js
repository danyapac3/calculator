let currentNumberElement = document.querySelector('.current-number');
let prevNumberElement = document.querySelector('.prev-number');
let operationElement = document.querySelector('.operation')
let calculatorElement = document.querySelector('.calculator');
// let buttons = document.querySelectorAll('.btn');

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
  currentNumberElement.textContent = currentNumber;
  prevNumberElement.textContent = prevNumber;
  operationElement.textContent = operation;

  adjustFontSize(currentNumberElement);
}

function clearAll() {
  currentNumber = '0';
  prevNumber = null;
  operation = null;

  updateScreen();
}

function clear() {
  currentNumber = '0';

  updateScreen();
}

function putDigit(digit) {
  if (currentNumber === 'Error') {
    return;
  }
  if (currentNumber === '0' && digit !== '.') {
    currentNumber = digit;
  } else if (!(digit === '.' && currentNumber.includes('.'))) {
    currentNumber += digit;
  }
  if (currentNumber.split('.').join('').length > 15 ||
      Number.isNaN(Number(currentNumber))) {
    currentNumber = 'Error';
  }
  updateScreen();
}

// Global Variables
let currentNumber = '0';
let prevNumber = null; 
let operation = null;

// Init calculator
clearAll()

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

  switch(btn.dataset.operation) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
    case '.':
      putDigit(btn.dataset.operation);
      break;
    case 'clear':
      clear();
    case 'clear-all':
      clearAll();
  }
});