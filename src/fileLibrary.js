const { getContent } = require("./headUtil.js");

const fileStructure = function(fileName) {
  let file = { fileName, contents: "" };
  file.getLines = getContent.bind(file, "\n");
  file.getBytes = getContent.bind(file, "");
  return file;
};

module.exports = { fileStructure };
