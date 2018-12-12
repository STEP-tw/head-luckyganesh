const getContent = function(separator, length) {
  content = this.contents.split(separator);
  return content
    .slice(0, length)
    .filter(line => line != "")
    .join(separator);
};

const getContentOfTail = function(separator, length) {
  content = this.contents.split(separator);
  return content
    .slice(content.length-length,content.length)
    .filter(line => line != "")
    .join(separator);
};

const createHeading = function(name) {
  let heading = "==> " + name + " <==";
  return heading;
};

const findOption = function(elem) {
  if (elem[0] != "-" || +elem.slice(1)) {
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
  return fileName[0] != "-" && !+fileName;
};

module.exports = {
  getContent,
  getContentOfTail,
  createHeading,
  findOption,
  findLength,
  isFileName
};
