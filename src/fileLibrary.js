const { getContent , getContentOfTail } = require("./util.js");

const fileStructure = function(commandType,fileName) {
  commandTypes = { head :getContent , tail:getContentOfTail };
  let file = { fileName, contents: "" };
  file.getLines = commandTypes[commandType].bind(file, "\n");
  file.getBytes = commandTypes[commandType].bind(file, "");
  return file;
};

module.exports = { fileStructure };
