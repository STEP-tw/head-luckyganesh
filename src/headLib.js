const { fileStructure } = require("./fileLibrary");

const { getContentOfFiles, checkErrors } = require("./lib.js");

const { parseInputs } = require('./parseInputs.js');

const head = function(parsedInputs, fs, commandType) {
  let { option, length, files } = parsedInputs;
  files = files.map(fileStructure.bind(null, commandType));
  files = getContentOfFiles(files, option, length, fs, commandType);
  return files.map(file => file.contents).join("\n");
};

const runHead = function(userInputs, fs, commandType) {
  let parsedInputs = parseInputs(userInputs);
  let err = checkErrors(parsedInputs,commandType);
  return err || head(parsedInputs, fs, commandType);
};
module.exports = { head, runHead };
