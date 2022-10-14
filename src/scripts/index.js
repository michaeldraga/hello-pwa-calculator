const display = document.querySelector(".display");

let cache = 0;
let shouldClearSet = true;
let currentOperation = "";

function shouldClear() {
    return shouldClearSet || display.innerHTML === '0';
}

function handleButtonClick(event) {
  const input = event.target.innerHTML;
  console.log(input);
  console.log(Number.isInteger(input));
  if (shouldClear()) {
    display.innerHTML = '';
    shouldClearSet = false;
  }
  if (!Number.isNaN(parseInt(input))) {
    display.innerHTML += input;
  } else if (input === "C") {
    clear();
  } else if (input === "=") {
    equals();
  } else if (input === "+") {
    currentOperation = "+";
    shouldClearSet = true;
  } else if (input === "-") {
    cache += Number(display.innerHTML);
    display.innerHTML = "0";
  } else if (input === "*") {
    cache += Number(display.innerHTML);
    display.innerHTML = "0";
  } else if (input === "/") {
    cache += Number(display.innerHTML);
    display.innerHTML = "0";
  }
}

function equals() {
  const displayValue = Number(display.innerHTML);
  let result = cache;
  if (currentOperation === "+") {
    result += displayValue;
  } else if (currentOperation === "-") {
    result -= displayValue;
  } else if (currentOperation === "-") {
    result *= displayValue;
  } else if (currentOperation === "-") {
    result /= displayValue;
  }
  currentOperation = '';
  display.innerHTML = String(result);
}

function clear() {
  display.innerHTML = "";
  cache = 0;
}

const buttons = document.querySelectorAll(".button");
buttons.forEach((button, index) => {
  button.addEventListener("click", handleButtonClick);
});
