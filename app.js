const previousOperandNumber = document.querySelector('[data-previous-operand]');
const currentOperandNumber = document.querySelector('[data-current-operand]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equals]');
const allclearButton = document.querySelector('[data-all-clear]');

class Calculator {
  constructor(previousOperandNumber, currentOperandNumber) {
    this.previousOperandNumber = previousOperandNumber;
    this.currentOperandNumber = currentOperandNumber;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  deleteNumber() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  handleNumbers(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }

    if (decimalDigits !== undefined) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandNumber.innerText = this.handleNumbers(
      this.currentOperand
    );

    if (this.operation !== undefined) {
      this.previousOperandNumber.innerText = `${this.handleNumbers(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandNumber.innerText = '';
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;

      case '-':
        computation = prev - current;
        break;

      case '*':
        computation = prev * current;
        break;

      case '÷':
        computation = prev / current;
        break;

      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }
}

const calculator = new Calculator(previousOperandNumber, currentOperandNumber);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allclearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.deleteNumber();
  calculator.updateDisplay();
});
