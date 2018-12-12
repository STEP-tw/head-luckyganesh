const { getContent , getContentOfTail } = require("./util.js");

const fileStructure = function(option,fileName) {
  options = { head :getContent , tail:getContentOfTail };
  let file = { fileName, contents: "" };
  file.getLines = options[option].bind(file, "\n");
  file.getBytes = options[option].bind(file, "");
  return file;
};

module.exports = { fileStructure };
