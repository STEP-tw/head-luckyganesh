const {
  parseInputsOfHead,
  read,
  isExists,
  checkingErrors,
  getContentOfFiles,
  head
} = require("../src/headLibrary.js");

const { fileStructure } = require("../src/fileLibrary.js");
const { deepEqual } = require("assert");

const checkExist = () => true;
const checkNotExist = () => false;
let readLine = function(fileName) {
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

describe("parseInputsOfHead", function() {
  it("should return all inputs as files", function() {
    deepEqual(parseInputsOfHead(["file1", "file2"]), {
      options: "n",
      length: 10,
      files: ["file1", "file2"]
    });
  });
  it("should return the option and length with files", function() {
    deepEqual(parseInputsOfHead(["-n", "10", "file1", "file2"]), {
      options: "n",
      length: 10,
      files: ["file1", "file2"]
    });
  });
  it("should return the option other than n", function() {
    deepEqual(parseInputsOfHead(["-c", "10", "file1", "file2"]), {
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
    deepEqual(checkingErrors({ options: "n", length: 10 }), "");
  });
  it("should return err msg for wrong options", function() {
    deepEqual(
      checkingErrors({ options: "p", length: 10 }),
      "head: illegal option -- p\nusage: head [-n lines | -c bytes] [file ...]"
    );
  });
  it("should return err msg for wrong length", function() {
    deepEqual(
      checkingErrors({ options: "c", length: 0 }),
      "head: illegal byte count -- 0"
    );
    deepEqual(
      checkingErrors({ options: "n", length: 0 }),
      "head: illegal line count -- 0"
    );
  });
});

describe("getContentOfFiles", function() {
  const files = [fileStructure("file")];
  const { getLines, getBytes } = files[0];
  it("should return a line", function() {
    deepEqual(
      getContentOfFiles(files, readLine, checkExist, "n", 2),
      [{ contents: "line1\nline2", fileName: "file", getLines, getBytes }]
    );
  });
  it("should return a character", function() {
    deepEqual(
      getContentOfFiles(files, readCharacter, checkExist, "c", 3),
      [{ contents: "hel", fileName: "file", getLines, getBytes }]
    );
  });
  it("should return content as error", function() {
    deepEqual(
      getContentOfFiles(
        files,
        readCharacter,
        checkNotExist,
        "n",
        3
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
  it("should return error in reading file", function() {
    deepEqual(
      getContentOfFiles(
        files,
        readCharacter,
        checkExist,
        "n",
        3
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

describe("head", function() {
  it("should work for default condition", function() {
    let userInputs = { options: "n", length: 10, files: ["file"] };
    deepEqual(
      head(userInputs, readLine, checkExist),
      "line1\nline2\nline3\nline4\nline5"
    );
  });
  it("should work for default character condition", function() {
    let userInputs = { options: "c", length: 1, files: ["file"] };
    deepEqual(head(userInputs, readCharacter, checkExist), "h");
  });
  it("should work for default character condition", function() {
    let userInputs = { options: "c", length: 1, files: ["file", "file"] };
    deepEqual(
      head(userInputs, readCharacter, checkExist),
      "==> file <==\nh\n==> file <==\nh"
    );
  });
});
