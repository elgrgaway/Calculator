// dark theme
const toggle = document.querySelector(".themes__toggle");

const switchTheme = () => toggle.classList.toggle("themes__toggle--isActive");

const switchThemeWithKeys = (e) => e.key === "Enter" && switchTheme();

toggle.addEventListener("click", switchTheme);
toggle.addEventListener("keydown", switchThemeWithKeys);

// logic for calc

let storedNum = "";
let currentNum = "";
let operation = "";

const result = document.querySelector(".calc__result");
const keys = document.querySelectorAll(".calc__key");

const updateScreen = (value) => {
  result.textContent = !value ? 0 : value;
};
const numberButton = (keyValue) => {
  if (keyValue === "." && currentNum.includes(".")) return;
  if (keyValue === "0" && !currentNum) return;
  if (currentNum.length > 16) return;
  currentNum += keyValue;
  updateScreen(currentNum);
};
const rest = () => {
  currentNum = "";
  storedNum = "";
  operation = "";
  updateScreen(currentNum);
};

const deleteOneNum = () => {
  currentNum = currentNum.slice(0, -1);
  updateScreen(currentNum);
};
const executeOperation = () => {
  if (currentNum && storedNum && operation) {
    currentNum = parseFloat(currentNum);
    storedNum = parseFloat(storedNum);
    switch (operation) {
      case "+":
        storedNum = storedNum + currentNum;
        break;
      case "-":
        storedNum = storedNum - currentNum;
        break;
      case "*":
        storedNum = storedNum * currentNum;
        break;
      case "/":
        storedNum = storedNum / currentNum;
        break;

      default:
        break;
    }
    currentNum = "";
    updateScreen(storedNum);
  }
};

const operationFun = (operationValue) => {
  if (!currentNum && !storedNum) return;
  if (currentNum && !storedNum) {
    storedNum = currentNum;
    currentNum = "";
    operation = operationValue;
  } else if (storedNum) {
    operation = operationValue;
    if (currentNum) executeOperation();
  }
};

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const keyValue = key.getAttribute("data-value");
    const keyType = key.getAttribute("data-type");
    if (keyType === "number") {
      numberButton(keyValue);
    } else if (keyType === "operation") {
      switch (keyValue) {
        case "c":
          rest();
          break;

        case "Backspace":
          deleteOneNum();
          break;
        case "Enter":
          executeOperation();
          //   excuteOperation();
          break;

        default:
          operationFun(keyValue);
      }
    }
  });
});

const avilableNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const avilableOperation = ["+", "-", "*", "/"];
const allKeys = [
  ...avilableNums,
  ...avilableOperation,
  "Enter",
  "Backspace",
  "c",
];

window.addEventListener("keydown", (e) => {
  // keyboardWithoutHover(e.key);
  keyboardWithHover(e.key);
});

const keyboardWithoutHover = (key) => {
  if (avilableNums.includes(key)) {
    numberButton(key);
  } else if (avilableOperation.includes(key)) {
    operationFun(key);
  } else if (key === "Enter") {
    executeOperation();
  } else if (key === "c") {
    console.log(key);
    rest();
  } else if (key === "Backspace") {
    deleteOneNum();
  }
};

const keyboardWithHover = (key) => {
  if (allKeys.includes(key)) {
    const element = document.querySelector(`[data-value = "${key}"]`);
    element.classList.add("hover");
    element.click();
    setTimeout(() => element.classList.remove("hover"), 100);
  }
};
