const {
  read,
  doesExists,
  checkErrors,
  getContentOfFiles,
  errorForExistsChecker,
  errorForIllegalCount,
  errorForIllegalOption,
  command,
  runCommand
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

describe("doesExists", function() {
  it("should return the file exists", function() {
    deepEqual(doesExists(checkExist, "file"), true);
  });
  it("should return false for file not existance", function() {
    deepEqual(doesExists(checkNotExist, "temp"), false);
  });
});

describe("checkErrors", function() {
  it("should return empty string", function() {
    deepEqual(checkErrors({ option: "n", count: 10 },"head"), "");
  });
  it("should return err msg for wrong options", function() {
    deepEqual(
      checkErrors({ option: "p", count: 10 },"head"),
      "head: illegal option -- p\nusage: head [-n lines | -c bytes] [file ...]"
    );
  });
  it("should return err msg for wrong count", function() {
    deepEqual(
      checkErrors({ option: "c", count: 0 },"head"),
      "head: illegal byte count -- 0"
    );
    deepEqual(
      checkErrors({ option: "n", count: 0 },"head"),
      "head: illegal line count -- 0"
    );
  });
  it("shouldn't return any error for count 0 of type tail",() => {
    deepEqual(checkErrors({option:"n", count : 0},"tail"),"");
  })
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
    deepEqual(errorForExistsChecker
      ('file',"head"),"head: file: No such file or directory");
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

describe('errorForIllegalOption', function() {
  it('should return error msg for head', function() {
    deepEqual(errorForIllegalOption("k","head"),"head: illegal option -- k\nusage: head [-n lines | -c bytes] [file ...]")
  });
  it('should return error msg for tail', function() {
    deepEqual(errorForIllegalOption("k","tail"),"tail: illegal option -- k\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]")
  });
});

describe("command", function() {
  it("should work for default condition", function() {
    const fs = { readFileSync: readLine, existsSync: checkExist };
    let userInputs = { option: "n", count: 10, files: ["file"] };
    deepEqual(
      command(userInputs, fs, "head"),
      "line1\nline2\nline3\nline4\nline5"
    );
  });
  it("should work for default character condition", function() {
    const fs = { readFileSync: readCharacter, existsSync: checkExist };
    let userInputs = { option: "c", count: 1, files: ["file"] };
    deepEqual(command(userInputs, fs, "head"), "h");
  });
  it("should work for default character condition", function() {
    const fs = { readFileSync: readCharacter, existsSync: checkExist };
    let userInputs = { option: "c", count: 1, files: ["file", "file"] };
    deepEqual(command(userInputs, fs, "head"), "==> file <==\nh\n==> file <==\nh");
  });
});

describe("runCommand", function() {
  it("should work for default condition", function() {
    const fs = { readFileSync: readLine, existsSync: checkExist };
    deepEqual(
      runCommand(["file"], fs, "head"),
      "line1\nline2\nline3\nline4\nline5"
    );
  });
  it("should work to give n lines ", function() {
    const fs = { readFileSync: readLine, existsSync: checkExist };
    deepEqual(runCommand(["-n3", "file"], fs, "head"), "line1\nline2\nline3");
    deepEqual(runCommand(["-n1", "file"], fs, "head"), "line1");
  });
  it("should work to give n bytes", function() {
    const fs = { readFileSync: readCharacter, existsSync: checkExist };
    deepEqual(runCommand(["-c2", "file"], fs, "head"), "he");
    deepEqual(runCommand(["-c3", "file"], fs, "head"), "hel");
  });
  it("should return 2 lines from end", function() {
    const fs = { readFileSync: readLine, existsSync: checkExist };
    deepEqual(runCommand(["-n2", "file1"], fs, "tail"), "line4\nline5");
  });
});