const { deepEqual } = require("assert");

const {
  parseInputs,
  getOption,
  getCount,
  isFilePath,
  isNumber,
  isDefined
} = require("../src/parseInputs.js");

describe("getOption", function() {
  it("should return default option n for name of file", function() {
    deepEqual(getOption("file"), "n");
  });
  it("should return exact option they given", function() {
    deepEqual(getOption("-n"), "n");
    deepEqual(getOption("-c"), "c");
  });
  it("should return default case for number", function() {
    deepEqual(getOption("-5"), "n");
  });
});

describe("getCount", function() {
  it("should return default count n for name of file", function() {
    deepEqual(getCount(["file", "file2"]), 10);
  });
  it("should return exact count they given", function() {
    deepEqual(getCount(["-n", "8"]), 8);
    deepEqual(getCount(["-c", "3"]), 3);
  });
  it("should return count even if it is included in option", function() {
    deepEqual(getCount(["-n5", "79"]), 5);
    deepEqual(getCount(["-c56", "file"]), 56);
  });
  it("should return default case for number", function() {
    deepEqual(getCount(["-5", "file"]), 5);
  });
});

describe("isFilePath", function() {
  it("should tell the truth for name", function() {
    deepEqual(isFilePath("file"), true);
  });
  it("should tell the false for not a name", function() {
    deepEqual(isFilePath("5"), false);
    deepEqual(isFilePath("-n5"), false);
    deepEqual(isFilePath("-5"), false);
  });
});

describe("isNumber", function() {
  it("should return true for 0", function() {
    deepEqual(isNumber(0), true);
  });
  it("should return true for any positve number", function() {
    deepEqual(isNumber(1), true);
    deepEqual(isNumber(10), true);
  });
  it("should return true for negative numbers", () => {
    deepEqual(isNumber(-1), true);
  });
  it("should return true for numbers even if the numbers in strings", () => {
    deepEqual(isNumber("1"), true);
    deepEqual(isNumber("0"), true);
    deepEqual(isNumber("-1"), true);
  });
});

describe("isDefined", function() {
  it("should return true for defined variable", function() {
    deepEqual(isDefined(0), true);
    deepEqual(isDefined("msg"), true);
    deepEqual(isDefined([1, 2, 3]), true);
  });
  it("should return false for undefined variable", function() {
    deepEqual(isDefined(), false);
    deepEqual(isDefined(""), false);
  });
});

describe("parseInputs", function() {
  it("should return all inputs as files", function() {
    deepEqual(parseInputs(["file1", "file2"]), {
      option: "n",
      count: 10,
      files: ["file1", "file2"]
    });
  });
  it("should return the option and count with files", function() {
    deepEqual(parseInputs(["-n", "10", "file1", "file2"]), {
      option: "n",
      count: 10,
      files: ["file1", "file2"]
    });
  });
  it("should return the option other than n", function() {
    deepEqual(parseInputs(["-c", "10", "file1", "file2"]), {
      option: "c",
      count: 10,
      files: ["file1", "file2"]
    });
  });
});
