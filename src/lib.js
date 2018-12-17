const {
  createHeading,
  findOption,
  findLength,
  isFilePath
} = require("./util.js");

const read = function(reader, encryption, filePath) {
  return reader(filePath, encryption);
};

const errorForExistsChecker = function(fileName,commandType){
  return  commandType + ": " + fileName + ": No such file or directory";
}

const errorForIllegalCount = function(option,length,command){
  let options = { n:"line" , c:"byte" }
  let head = "head: illegal " + options[option] + " count -- "+length;
  let tail = "tail: illegal offset -- "+length;
  let errorTypes = {head,tail};
  return errorTypes[command];
}

const errorForIllegalOption = function(option,command){
  let head = "head: illegal option -- " + option + "\nusage: head [-n lines | -c bytes] [file ...]";
  let tail = "tail: illegal option -- " + option + "\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  let errorTypes = {head ,tail};
  return errorTypes[command];
}

const doesExists = function(checker, filePath) {
  return checker(filePath);
};

const parseInputs = function(userInputs) {
  let options = findOption(userInputs[0]);
  let length = findLength(userInputs.slice(0, 2));
  let files = userInputs.filter(isFilePath);
  return { options, length, files };
};

const checkErrors = function(parsedInputs,commandType) {
  let { options, length } = parsedInputs;
  if (options != "n" && options != "c") {
    return errorForIllegalOption(options,commandType)
  }
  if(length == 0 && commandType == "tail"){
    return "";
  }
  if (!(length > 0)) {
    return errorForIllegalCount(options,length,commandType);
  }
  return "";
};

const getContentOfFiles = function(
  files,
  options,
  length,
  fs,
  commandType
) {
  const existChecker = fs.existsSync;
  const reader = fs.readFileSync;
  files = files.map(file => {
    if (!doesExists(existChecker, file.fileName)) {
      file.contents = errorForExistsChecker(file.fileName,commandType);
      return file;
    }
    let heading = createHeading(file.fileName) + "\n";
    if (files.length == 1) {
      heading = "";
    }
    let optionSelected = { n: "getLines", c: "getBytes" };
    let commandFunc = file[optionSelected[options]];
    file.contents = read(reader, "utf-8", file.fileName);
    file.contents = commandFunc(length);
    file.contents = heading + file.contents;
    return file;
  });
  return files;
};

module.exports = {
  parseInputs,
  read,
  checkErrors,
  doesExists,
  getContentOfFiles,
  errorForExistsChecker,
  errorForIllegalCount,
  errorForIllegalOption
};
