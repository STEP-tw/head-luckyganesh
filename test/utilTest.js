const { deepEqual } = require("assert");

const {
  getContentFromTop,
  getContentFromBottom,
  createHeading,
} = require("../src/util.js");

describe("getContentFromTop", () => {
  let file = "hello,hi,bye,good,bad"
  it("should return empty string", () => {
    deepEqual(getContentFromTop(",",file, 0), "");
  });
  it("should return one name", () => {
    deepEqual(getContentFromTop(",",file, 1), "hello");
  });
  it("should return n number of names", () => {
    deepEqual(getContentFromTop(",",file, 2), "hello,hi");
  });
});

describe("getContentFromBottom", () => {
  let file = "hello,hi,bye,good,bad";
  it("should return empty string", () => {
    deepEqual(getContentFromBottom(",",file, 0), "");
  });
  it("should return one name", () => {
    deepEqual(getContentFromBottom(",",file, 1), "bad");
  });
  it("should return n number of names", () => {
    deepEqual(getContentFromBottom(",",file, 2), "good,bad");
  });
  it('should return n number of names even there is empty space in last', () => {
    file = "hello\nhi\nbye\ngood\nbad\n"
    deepEqual(getContentFromBottom("\n",file,4),"hi\nbye\ngood\nbad");
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
