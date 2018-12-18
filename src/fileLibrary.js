const { getContentFromTop , getContentFromBottom } = require("./util.js");

const fileStructure = function(coreUtil,fileName) {
  const commandTypes = { head :getContentFromTop , tail:getContentFromBottom };
  return {
    fileName,
    contents:"",
    getLines:commandTypes[coreUtil].bind(null, "\n"),
    getBytes:commandTypes[coreUtil].bind(null, "")
  };
};

module.exports = { fileStructure };
