const isNumber = function(number) {
  return +number == number || number === 0;
};

const findOption = function(elem) {
  if (elem[0] != "-" || isNumber(elem.slice(1))) {
    return "n";
  }
  return elem[1];
};

const isDefined = function(variable) {
  return variable !== "" && variable != undefined;
};

const findLength = function(userArgs) {
  let firstArg = userArgs[0];
  if (!firstArg.startsWith("-")) {
    return 10;
  }
  firstArg = firstArg.slice(1);
  if (isNumber(firstArg)) {
    return firstArg;
  }
  firstArg = firstArg.slice(1);
  if (isDefined(firstArg)) {
    return firstArg;
  }
  return userArgs[1];
};

const isFilePath = function(filePath) {
  return filePath[0] != "-" && !isNumber(filePath);
};

const parseInputs = function(userInputs) {
  let options = findOption(userInputs[0]);
  let length = findLength(userInputs.slice(0, 2));
  let files = userInputs.filter(isFilePath);
  return { options, length, files };
};

module.exports = {
  parseInputs,
  findLength,
  findOption,
  isFilePath,
  isNumber,
  isDefined
};
