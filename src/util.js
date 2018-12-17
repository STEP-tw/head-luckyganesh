const getContent = function(separator, length) {
  content = this.contents.split(separator);
  return content
    .slice(0, length)
    .filter(line => line != "")
    .join(separator);
};

const getContentOfTail = function(separator, length) {
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
  if(variable){
    return true;
  };
  return variable === 0;
};

const findLength = function(options) {
  if (options[0][0] != "-") {
    return 10;
  }
  if (isNumber(options[0])) {
    return options[0].slice(1);
  }
  if (isDefined(options[0].slice(2))) {
    return options[0].slice(2);
  }
  return options[1];
};

const isFileName = function(fileName) {
  return fileName[0] != "-" && !isNumber(fileName);
};

module.exports = {
  getContent,
  getContentOfTail,
  createHeading,
  findOption,
  findLength,
  isFileName,
  isNumber,
  isDefined
};
