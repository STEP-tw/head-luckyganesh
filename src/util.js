const getContentFromTop = function(separator, length) {
  content = this.contents.split(separator);
  return content
    .slice(0, length)
    .filter(line => line != "")
    .join(separator);
};

const getContentFromBottom = function(separator, length) {
  content = this.contents.split(separator).reverse();
  if(content[0] === ""){
    content = content.slice(1);
  }
  content = content.slice(0,length).reverse();
  return content.join(separator);
};

const createHeading = function(name) {
  let heading = "==> " + name + " <==";
  return heading;
};

const isNumber = function(number){
  return +number == number || number === 0 ;
};

const findOption = function(elem) {
  if (elem[0] != "-" || isNumber(elem.slice(1))) {
    return "n";
  }
  return elem[1];
};

const isDefined = function(variable){
  return variable !== "" && variable != undefined ;
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

const isFileName = function(fileName) {
  return fileName[0] != "-" && !isNumber(fileName);
};

module.exports = {
  getContentFromTop,
  getContentFromBottom,
  createHeading,
  findOption,
  findLength,
  isFileName,
  isNumber,
  isDefined
};
