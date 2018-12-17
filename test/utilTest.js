const { deepEqual } = require("assert");

const {
  getContentFromTop,
  getContentFromBottom,
  createHeading,
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

describe("getContentFromBottom", () => {
  let file = { contents: "hello,hi,bye,good,bad" };
  let getNames = getContentFromBottom.bind(file);
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
    deepEqual(getContentFromBottom.bind(file)("\n",4),"hi\nbye\ngood\nbad");
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
