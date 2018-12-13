const getContent = function(separator, length, type) {
  content = this.contents.split(separator);
  if(content[0] === "" && type == "tail"){
    content = content.slice(1);
  }
  return content
    .slice(0, length)
    .filter(line => line != "")
    .join(separator);
};

const getContentOfTail = function(separator, length,type) {
  content = {contents: this.contents.split(separator).reverse().join(separator)};
  return getContent.bind(content)(separator,length,type).split(separator).reverse().join(separator);
};

const createHeading = function(name) {
  let heading = "==> " + name + " <==";
  return heading;
};

const findOption = function(elem) {
  if (elem[0] != "-" || +elem.slice(1) || isFinite(elem.slice(1))) {
    return "n";
  }
  return elem[1];
};

const findLength = function(options) {
  if (options[0][0] != "-") {
    return 10;
  }
  if (isFinite(options[0])) {
    return options[0].slice(1);
  }
  if (options[0].slice(2) || options[0].slice(2) === 0) {
    return options[0].slice(2);
  }
  return options[1];
};

const isFileName = function(fileName) {
  return fileName[0] != "-" && !+fileName && fileName != 0;
};

module.exports = {
  getContent,
  getContentOfTail,
  createHeading,
  findOption,
  findLength,
  isFileName
};
