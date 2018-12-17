const {
  createHeading,
  findOption,
  findLength,
  isFileName
} = require("./util.js");

const read = function(reader, encryption, filePath) {
  return reader(filePath, encryption);
};

const errorForExistsChecker = function(fileName,type){
  return  type + ": " + fileName + ": No such file or directory";
}

const errorForIllegalCount = function(option,length,type){
  let options = { n:"line" , c:"byte" }
  let head = "head: illegal " + options[option] + " count -- "+length;
  let tail = "tail: illegal offset -- "+length;
  let types = {head,tail};
  return types[type];
}

const errorForIllegalOption = function(option,type){
  let head = "head: illegal option -- " + option + "\nusage: head [-n lines | -c bytes] [file ...]";
  let tail = "tail: illegal option -- " + option + "\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  types = {head ,tail};
  return types[type];
}

const doesExists = function(checker, filePath) {
  return checker(filePath);
};

const parseInputs = function(userInputs) {
  let options = findOption(userInputs[0]);
  let length = findLength(userInputs.slice(0, 2));
  let files = userInputs.filter(isFileName);
  return { options, length, files };
};

const checkErrors = function(parsedInputs,type) {
  let { options, length } = parsedInputs;
  if (options != "n" && options != "c") {
    return errorForIllegalOption(options,type)
  }
  if(length == 0 && type == "tail"){
    return "";
  }
  if (!(length > 0)) {
    return errorForIllegalCount(options,length,type);
  }
  return "";
};

const getContentOfFiles = function(
  files,
  options,
  length,
  fs,
  type
) {
  const existChecker = fs.existsSync;
  const reader = fs.readFileSync;
  files = files.map(file => {
    if (!doesExists(existChecker, file.fileName)) {
      file.contents = errorForExistsChecker(file.fileName,type);
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
