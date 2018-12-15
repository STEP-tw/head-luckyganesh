const { deepEqual } = require("assert");

const { fileStructure } = require("../src/fileLibrary.js");

const { getContent , getContentOfTail} = require('../src/util.js')

describe("fileStructure", () => {
  it("should create an empty file structure for  head", () => {
    let expected = {fileName : "file" , contents : ""};
    expected.getLines = getContent.bind(expected,"\n");
    expected.getBytes = getContent.bind(expected,"");
    let actual = fileStructure("head","file");
    deepEqual(actual.fileName,expected.fileName);
    deepEqual(actual.contents,expected.contents);
  });
  it('should create an empty fileStructure and testing inside function by adding contents', function() {
    let actual = fileStructure("head","file");
    actual.contents = "1\n2\n3\n4\n5\n6"
    deepEqual(actual.getLines(4),"1\n2\n3\n4");
    deepEqual(actual.getBytes(4),"1\n2\n");
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
