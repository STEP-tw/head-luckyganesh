const { deepEqual } = require("assert");

const { fileStructure } = require("../src/fileLibrary.js");

const { getContentFromTop , getContentFromBottom} = require('../src/util.js')

describe("fileStructure", () => {
  it("should create an empty file structure for  head", () => {
    let expected = {fileName : "file" , contents : ""};
    expected.getLines = getContentFromTop.bind(expected,"\n");
    expected.getBytes = getContentFromTop.bind(expected,"");
    let actual = fileStructure("head","file");
    deepEqual(actual.fileName,expected.fileName);
    deepEqual(actual.contents,expected.contents);
  });
  it('should create an empty fileStructure and testing inside function by adding contents', function() {
    let actual = fileStructure("head","file");
    let content = "1\n2\n3\n4\n5\n6"
    deepEqual(actual.getLines(content,4),"1\n2\n3\n4");
    deepEqual(actual.getBytes(content,4),"1\n2\n");
  });
  it('should create an empty file structure for tail', () => {
    let expected = {fileName : "file" , contents : ""};
    expected.getLines = getContentFromBottom.bind(expected,"\n");
    expected.getBytes = getContentFromBottom.bind(expected,"");
    actual = fileStructure("tail","file");
    deepEqual(actual.fileName,expected.fileName);
    deepEqual(actual.contents,expected.contents);
  });
  it('should create an empty fileStructure and testing inside function by adding contents', function() {
    let actual = fileStructure("tail","file");
    let content = "1\n2\n3\n4\n5\n6"
    deepEqual(actual.getLines(content,4),"3\n4\n5\n6");
    deepEqual(actual.getBytes(content,4),"\n5\n6");
  });
});
