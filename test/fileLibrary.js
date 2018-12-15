const { deepEqual } = require("assert");

const { fileStructure } = require("../src/fileLibrary.js");

const { getContent , getContentOfTail} = require('../src/util.js')

describe("fileStructure", () => {
  it("should create an empty file structure for  head", () => {
    let expected = {fileName : "file" , contents : ""};
    expected.getLines = getContent.bind(expected,"\n");
    expected.getBytes = getContent.bind(expected,"");
    actual = fileStructure("head","file");
    deepEqual(actual.fileName,expected.fileName);
    deepEqual(actual.contents,expected.contents);
  });
  it('should create an empty file structure for tail', () => {
    let expected = {fileName : "file" , contents : ""};
    expected.getLines = getContentOfTail.bind(expected,"\n");
    expected.getBytes = getContentOfTail.bind(expected,"");
    actual = fileStructure("tail","file");
    deepEqual(actual.fileName,expected.fileName);
    deepEqual(actual.contents,expected.contents);
  })
});
