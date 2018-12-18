const { getContentFromTop , getContentFromBottom } = require("./util.js");

const fileStructure = function(coreUtil,fileName) {
  const commandTypes = { head :getContentFromTop , tail:getContentFromBottom };
  let file = { fileName, contents: "" };
  file.getLines = commandTypes[coreUtil].bind(null, "\n");
  file.getBytes = commandTypes[coreUtil].bind(null, "");
  return file;
};

module.exports = { fileStructure };
