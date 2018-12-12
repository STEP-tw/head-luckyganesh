const { deepEqual } = require("assert");

const { fileStructure } = require("../src/fileLibrary.js");

describe("fileStructure", () => {
  it("should create an empty file contents", () => {
    deepEqual(fileStructure("head","file").contents, "");
  });
});
