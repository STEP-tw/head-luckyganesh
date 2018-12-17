const {
  createHeading,
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

const checkErrors = function(parsedInputs,commandType) {
  let { option, count } = parsedInputs;
  if (option != "n" && option != "c") {
    return errorForIllegalOption(option,commandType)
  }
  if(count == 0 && commandType == "tail"){
    return "";
  }
  if (!(count > 0)) {
    return errorForIllegalCount(option,count,commandType);
  }
  return "";
};

const getContentOfFiles = function(
  files,
  option,
  count,
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
    let commandFunc = file[optionSelected[option]];
    file.contents = read(reader, "utf-8", file.fileName);
    file.contents = commandFunc(file.contents,count);
    file.contents = heading + file.contents;
    return file;
  });
  return files;
};

module.exports = {
  read,
  checkErrors,
  doesExists,
  getContentOfFiles,
  errorForExistsChecker,
  errorForIllegalCount,
  errorForIllegalOption
};
