const { fileStructure } = require("./fileLibrary");

const { getContentOfFiles, parseInputs, checkingErrors } = require("./lib.js");

const head = function(parsedInputs, fs, type) {
  let { options, length, files } = parsedInputs;
  files = files.map(fileStructure.bind(null, type));
  files = getContentOfFiles(files, options, length, fs, type);
  return files.map(file => file.contents).join("\n");
};

const runHead = function(userInputs, fs, type) {
  let parsedInputs = parseInputs(userInputs);
  let err = checkingErrors(parsedInputs,type);
  return err || head(parsedInputs, fs, type);
};
module.exports = { head, runHead };
