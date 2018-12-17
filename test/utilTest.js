const { deepEqual } = require("assert");

const {
  getContentFromTop,
  getContentOfTail,
  createHeading,
  findOption,
  findLength,
  isFileName,
  isNumber,
  isDefined
} = require("../src/util.js");

describe("getContentFromTop", () => {
  let file = { contents: "hello,hi,bye,good,bad" };
  let getNames = getContentFromTop.bind(file);
  it("should return empty string", () => {
    deepEqual(getNames(",", 0), "");
  });
  it("should return one name", () => {
    deepEqual(getNames(",", 1), "hello");
  });
  it("should return n number of names", () => {
    deepEqual(getNames(",", 2), "hello,hi");
  });
});

describe("getContentOfTail", () => {
  let file = { contents: "hello,hi,bye,good,bad" };
  let getNames = getContentOfTail.bind(file);
  it("should return empty string", () => {
    deepEqual(getNames(",", 0), "");
  });
  it("should return one name", () => {
    deepEqual(getNames(",", 1), "bad");
  });
  it("should return n number of names", () => {
    deepEqual(getNames(",", 2), "good,bad");
  });
  it('should return n number of names even there is empty space in last', () => {
    file = {contents:"hello\nhi\nbye\ngood\nbad\n"}
    deepEqual(getContentOfTail.bind(file)("\n",4),"hi\nbye\ngood\nbad");
  })
});

describe("createHeading", function() {
  it("should create empty heading", function() {
    deepEqual(createHeading(""), "==>  <==");
  });
  it("should create heading for a name", function() {
    deepEqual(createHeading("file"), "==> file <==");
  });
  it("should create heading for numbers", function() {
    deepEqual(createHeading(123), "==> 123 <==");
  });
});

describe("findOption", function() {
  it("should return default option n for name of file", function() {
    deepEqual(findOption("file"), "n");
  });
  it("should return exact option they given", function() {
    deepEqual(findOption("-n"), "n");
    deepEqual(findOption("-c"), "c");
  });
  it("should return default case for number", function() {
    deepEqual(findOption("-5"), "n");
  });
});

describe("findLength", function() {
  it("should return default length n for name of file", function() {
    deepEqual(findLength(["file", "file2"]), 10);
  });
  it("should return exact length they given", function() {
    deepEqual(findLength(["-n", "8"]), 8);
    deepEqual(findLength(["-c", "3"]), 3);
  });
  it("should return length even if it is included in option", function() {
    deepEqual(findLength(["-n5", "79"]), 5);
    deepEqual(findLength(["-c56", "file"]), 56);
  });
  it("should return default case for number", function() {
    deepEqual(findLength(["-5", "file"]), 5);
  });
});

describe("isFileName", function() {
  it("should tell the truth for name", function() {
    deepEqual(isFileName("file"), true);
  });
  it("should tell the false for not a name", function() {
    deepEqual(isFileName("5"), false);
    deepEqual(isFileName("-n5"), false);
    deepEqual(isFileName("-5"), false);
  });
});

describe('isNumber', function() {
  it('should return true for 0', function() {
    deepEqual(isNumber(0),true);
  });
  it('should return true for any positve number', function() {
    deepEqual(isNumber(1),true);
    deepEqual(isNumber(10),true);
  });
  it('should return true for negative numbers',() => {
    deepEqual(isNumber(-1),true);
  });
  it('should return true for numbers even if the numbers in strings', () => {
    deepEqual(isNumber('1'),true);
    deepEqual(isNumber('0'),true);
    deepEqual(isNumber('-1'),true);
  });
});

describe('isDefined', function() {
  it('should return true for defined variable', function() {
    deepEqual(isDefined(0),true);
    deepEqual(isDefined("msg"),true);
    deepEqual(isDefined([1,2,3]),true);
  });
  it('should return false for undefined variable', function() {
    deepEqual(isDefined(),false);
    deepEqual(isDefined(""),false);
  });
});