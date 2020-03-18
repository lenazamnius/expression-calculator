function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {  
  if(expr.length === 0) throw new Error();

  const inputArr = expr.match(/[-+*\/()]|\d+/g);
  if(inputArr.filter(val => val =='(').length !== inputArr.filter(val => val ==')').length) {
    throw new Error('ExpressionError: Brackets must be paired');
  };

  function computation(x, opr, y) {
    if(opr === '/' && Number(y) === 0) throw new Error("TypeError: Division by zero.");

    switch(opr) {
      case '*': return Number(x) * Number(y);
      case '/': return Number(x) / Number(y);
      case '+': return Number(x) + Number(y);
      case '-': return Number(x) - Number(y);
      default: throw new Error(`${opr} is wrong operator`); 
    }
  };

  function internalCalc(leftValue, operator, rightValue) {
    total = computation(leftValue, operator, rightValue);
    numbersArr = numbersArr.slice(0, -2);
    numbersArr.push(total);
    operatorsArr.pop();
  }

  const priority = {
    '(': 1,
    ')': 1,
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3,
    };
  const operatorsArr = [];
  let numbersArr = [];
  let total = 0;
   
  while (operatorsArr.length !== 0 || inputArr.length !== 0) {
    let value = inputArr[0];

    if (Number.isInteger(+value)) {  
      numbersArr.push(value); 
      inputArr.shift();
    }  else if (value === ')') {
      while (operatorsArr[operatorsArr.length - 1] !== '(') {
        internalCalc(numbersArr[numbersArr.length - 2], operatorsArr[operatorsArr.length - 1], numbersArr[numbersArr.length - 1]);
      }
      operatorsArr.pop();
      inputArr.shift();
    } else if (priority[value] > priority[operatorsArr[operatorsArr.length - 1]] || value === '(' || operatorsArr.length === 0 || numbersArr.length < 1) {
      operatorsArr.push(value);
      inputArr.shift();
    } else {
      internalCalc(numbersArr[numbersArr.length - 2], operatorsArr[operatorsArr.length - 1], numbersArr[numbersArr.length - 1]);
    }
  }
  return total;
}

module.exports = {
    expressionCalculator
}