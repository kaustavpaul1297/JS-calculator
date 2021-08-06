const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("delBtn");
const calculate = {
  "/": (firstValue, secondNumber) => firstValue / secondNumber,
  "*": (firstValue, secondNumber) => firstValue * secondNumber,
  "+": (firstValue, secondNumber) => firstValue + secondNumber,
  "-": (firstValue, secondNumber) => firstValue - secondNumber,
  "=": (firstValue, secondNumber) => secondNumber,
};
let firstValue = 0;
let operatorValue = "";
let awaitingValue = false;
function showNumber(number) {
  // Replace current display value if first value is entered
  if (awaitingValue) {
    calculatorDisplay.textContent = number;
    awaitingValue = false;
  } else {
    //   replace it with number if value is 0/ add the number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}
function addDecimal() {
  // if operator is pressed, don't add decimal
  if (awaitingValue) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operator
  if (operatorValue && awaitingValue) {
    operatorValue = operator;
    return;
  }
  //  Assign firstvalue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    console.log(firstValue, operatorValue, currentValue);
    console.log("calculation", calculation);
    calculatorDisplay.textContent = calculation;
    firstValue = currentValue;
  }
  // Ready for next value, store operator
  awaitingValue = true;
  operatorValue = operator;
}

// Reset all
function resetAll() {
  firstValue = 0;
  currentValue = "";
  awaitingValue = false;
  calculatorDisplay.textContent = "0";
}
// Event Listener
clearBtn.addEventListener("click", resetAll);

// Event Listeners for numbers, operators, decimal value

inputBtns.forEach(inputBtn => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => showNumber(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});
