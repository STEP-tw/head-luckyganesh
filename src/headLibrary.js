const {
  createHeading,
  findOption,
  findLength,
  isFileName
} = require("./headUtil.js");

const { fileStructure } = require("./fileLibrary.js");

const read = function(reader, encryption, filePath) {
  return reader(filePath, encryption);
};

const errorForExistChecker = function(fileName){
  return  "head: " + fileName + ": No such file or directory";
}

const isExists = function(checker, filePath) {
  return checker(filePath);
};

const parseInputsOfHead = function(headInputs) {
  let options = findOption(headInputs[0]);
  let length = findLength(headInputs.slice(0, 2));
  let files = headInputs.filter(isFileName);
  return { options, length, files };
};

const checkingErrors = function(parsedInputs) {
  let { options, length } = parsedInputs;
  if (options != "n" && options != "c") {
    return (
      "head: illegal option -- " +
      options +
      "\nusage: head [-n lines | -c bytes] [file ...]"
    );
  }
  let option = { n: "line", c: "byte" };
  if (!(length > 0)) {
    return "head: illegal " + option[options] + " count -- " + length;
  }
  return "";
};

getContentOfFiles = function(
  files,
  reader,
  existChecker,
  options,
  length
) {
  files = files.map(file => {
    if (!isExists(existChecker, file.fileName)) {
      file.contents = errorForExistChecker(file.fileName);
      return file;
    }
    let heading = createHeading(file.fileName) + "\n";
    if (files.length == 1) {
      heading = "";
    }
    let optionSelected = { n: "getLines", c: "getBytes" };
    file.contents = read(reader, "utf-8", file.fileName);
    file.contents = file[optionSelected[options]](length);
    file.contents = heading + file.contents;
    return file;
  });
  return files;
};

const head = function(parsedInputs, reader, existChecker) {
  let { options, length, files } = parsedInputs;
  files = files.map(fileStructure);
  files = getContentOfFiles(
    files,
    reader,
    existChecker,
    options,
    length
  );
  return files.map(file => file.contents).join("\n");
};

module.exports = {
  parseInputsOfHead,
  read,
  head,
  checkingErrors,
  isExists,
  checkingErrors,
  getContentOfFiles,
  errorForExistChecker
};
