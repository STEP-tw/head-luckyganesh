const {
  parseInputs,
  read,
  isExists,
  checkingErrors,
  getContentOfFiles,
  errorForExistChecker,
  errorForIllegalCount,
} = require("../src/lib.js");

const { fileStructure } = require("../src/fileLibrary.js");
const { deepEqual } = require("assert");

const checkExist = () => true;
const checkNotExist = () => false;

const readLine = function(fileName) {
  if ((fileName = "file")) {
    return "line1\nline2\nline3\nline4\nline5";
  }
  if (fileName == "file1") {
    return "char1\nchar2\nchar3\nchar4\nchar5";
  }
  return "byte1\nbyte2\nbyte3\nbyte4\nbyte5";
};

let readCharacter = function(name) {
  return "hello";
};

describe("parseInputs", function() {
  it("should return all inputs as files", function() {
    deepEqual(parseInputs(["file1", "file2"]), {
      options: "n",
      length: 10,
      files: ["file1", "file2"]
    });
  });
  it("should return the option and length with files", function() {
    deepEqual(parseInputs(["-n", "10", "file1", "file2"]), {
      options: "n",
      length: 10,
      files: ["file1", "file2"]
    });
  });
  it("should return the option other than n", function() {
    deepEqual(parseInputs(["-c", "10", "file1", "file2"]), {
      options: "c",
      length: 10,
      files: ["file1", "file2"]
    });
  });
});

describe("read", function() {
  it("should return a line", function() {
    deepEqual(
      read(readLine, "./file", "utf-8"),
      "line1\nline2\nline3\nline4\nline5"
    );
  });
  it("should return a character", function() {
    deepEqual(read(readCharacter, "./file", "utf-8"), "hello");
  });
});

describe("isExists", function() {
  it("should return the file exists", function() {
    deepEqual(isExists(checkExist, "file"), true);
  });
  it("should return false for file not existance", function() {
    deepEqual(isExists(checkNotExist, "temp"), false);
  });
});

describe("checkingErrors", function() {
  it("should return empty string", function() {
    deepEqual(checkingErrors({ options: "n", length: 10 },"head"), "");
  });
  it("should return err msg for wrong options", function() {
    deepEqual(
      checkingErrors({ options: "p", length: 10 },"head"),
      "head: illegal option -- p\nusage: head [-n lines | -c bytes] [file ...]"
    );
  });
  it("should return err msg for wrong length", function() {
    deepEqual(
      checkingErrors({ options: "c", length: 0 },"head"),
      "head: illegal byte count -- 0"
    );
    deepEqual(
      checkingErrors({ options: "n", length: 0 },"head"),
      "head: illegal line count -- 0"
    );
  });
});

describe("getContentOfFiles", function() {
  const files = [fileStructure("head","file")];
  const { getLines, getBytes } = files[0];
  it("should return a line", function() {
    const fs = { readFileSync: readLine ,existsSync:checkExist}
    deepEqual(
      getContentOfFiles(files, "n", 2, fs ,"head"),
      [{ contents: "line1\nline2", fileName: "file", getLines, getBytes }]
    );
  });
  it("should return a character", function() {
    const fs = { readFileSync: readCharacter ,existsSync:checkExist}
    deepEqual(
      getContentOfFiles(files, "c", 3 , fs , "head"),
      [{ contents: "hel", fileName: "file", getLines, getBytes }]
    );
  });
  it("should return content as error", function() {
    const fs = { readFileSync: readCharacter ,existsSync:checkNotExist}
    deepEqual(
      getContentOfFiles(
        files,
        "n",
        3,
        fs,
        "head"
      ),
      [
        {
          contents: "head: file: No such file or directory",
          fileName: "file",
          getBytes,
          getLines
        }
      ]
    );
  });
  it("should return characters in reading file", function() {
    const fs = { readFileSync: readCharacter , existsSync: checkExist}
    deepEqual(
      getContentOfFiles(
        files,
        "n",
        3,
        fs,
        "head"
      ),
      [
        {
          contents: "hello",
          fileName: "file",
          getBytes,
          getLines
        }
      ]
    );
  });
});

describe('error for Existchecker',function(){
  it('should give the format of error',function(){
    deepEqual(errorForExistChecker('file',"head"),"head: file: No such file or directory");
  });
});

describe('error for illegal count',function(){
  it('should give error msg for illegal number of lines',function(){
    deepEqual(errorForIllegalCount('n',0,"head"),"head: illegal line count -- 0");
    deepEqual(errorForIllegalCount('n',"abc","head"),"head: illegal line count -- abc");
  });
  it('should give error msg for illegal number of bytes',function(){
    deepEqual(errorForIllegalCount('c',0,"head"),"head: illegal byte count -- 0");
    deepEqual(errorForIllegalCount('c',"bca","head"),"head: illegal byte count -- bca");
  });
});

module.exports = { readCharacter , readLine , checkExist }