let currentNumberElement = document.querySelector('.current-number');
let prevNumberElement = document.querySelector('.prev-number');
let operationElement = document.querySelector('.operation')
let calculatorElement = document.querySelector('.calculator');
// let buttons = document.querySelectorAll('.btn');

function updateScreen() {
  currentNumberElement.textContent = currentNumber;
  prevNumberElement.textContent = prevNumber;
  operationElement.textContent = operation;
}

function clearAll() {
  currentNumber = 0;
  prevNumber = null;
  operation = null;

  updateScreen();
}

function clear() {
  currentNumber = 0;

  updateScreen();
}

function putDigit(digit) {
  currentNumber = Number(currentNumber.toString() + digit);

  updateScreen();
}

// Global Variables
let currentNumber = 0;
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
      putDigit(Number(btn.dataset.operation));
      break;
    case 'clear':
      clear();
    case 'clear-all':
      clearAll();
  }
});