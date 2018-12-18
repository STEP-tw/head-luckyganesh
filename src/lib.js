const { createHeading } = require("./util.js");

const { fileStructure } = require("./fileLibrary");

const { parseInputs } = require('./parseInputs.js');

const read = function(reader, encryption, filePath) {
  return reader(filePath, encryption);
};

const errorForExistsChecker = function(fileName,coreUtil){
  return  coreUtil + ": " + fileName + ": No such file or directory";
}

const errorForIllegalCount = function(option,length,coreUtil){
  let options = { n:"line" , c:"byte" }
  let head = "head: illegal " + options[option] + " count -- "+length;
  let tail = "tail: illegal offset -- "+length;
  let errorTypes = {head,tail};
  return errorTypes[coreUtil];
}

const errorForIllegalOption = function(option,coreUtil){
  let head = "head: illegal option -- " + 
              option +
             "\nusage: head [-n lines | -c bytes] [file ...]";
  let tail = "tail: illegal option -- " +
              option +
              "\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
  let errorTypes = {head ,tail};
  return errorTypes[coreUtil];
}

const doesExists = function(checker, filePath) {
  return checker(filePath);
};

const checkErrors = function(parsedInputs,coreUtil) {
  let { option, count } = parsedInputs;
  if (option != "n" && option != "c") {
    return errorForIllegalOption(option,coreUtil)
  }
  if(count == 0 && coreUtil == "tail"){
    return "";
  }
  if (!(count > 0)) {
    return errorForIllegalCount(option,count,coreUtil);
  }
  return "";
};

const getContentOfFiles = function(
  files,
  option,
  count,
  fs,
  coreUtil
) {
  const existChecker = fs.existsSync;
  const reader = fs.readFileSync;
  files = files.map(file => {
    if (!doesExists(existChecker, file.fileName)) {
      file.contents = errorForExistsChecker(file.fileName,coreUtil);
      return file;
    }
    let heading = createHeading(file.fileName) + "\n";
    if (files.length == 1) {
      heading = "";
    }
    let optionSelected = { n: "getLines", c: "getBytes" };
    let coreUtilFunc = file[optionSelected[option]];
    file.contents = read(reader, "utf-8", file.fileName);
    file.contents = coreUtilFunc(file.contents,count);
    file.contents = heading + file.contents;
    return file;
  });
  return files;
};

const command = function(parsedInputs, fs, coreUtil) {
  let { option, count, files } = parsedInputs;
  files = files.map(fileStructure.bind(null, coreUtil));
  files = getContentOfFiles(files, option, count, fs, coreUtil);
  return files.map(file => file.contents).join("\n");
};

const runCommand = function(userInputs, fs, coreUtil) {
  let parsedInputs = parseInputs(userInputs);
  let err = checkErrors(parsedInputs,coreUtil);
  return err || command(parsedInputs, fs, coreUtil);
};

module.exports = {
  read,
  checkErrors,
  doesExists,
  getContentOfFiles,
  errorForExistsChecker,
  errorForIllegalCount,
  errorForIllegalOption,
  command,
  runCommand
};
