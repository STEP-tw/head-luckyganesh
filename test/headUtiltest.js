const { deepEqual } = require('assert');

const { getContent } = require('../src/headUtil.js');

describe('getContent',() => {
  let content = "hello,hi,bye,good,bad";
  getNames = getContent.bind(content);
  it('should return empty string' ,() => {
    deepEqual(getNames(",",0),"");
  });
  it('should return one name',() => {
    deepEqual(getNames(",",1),"hello");
  });
  it('should return n number of names',() => {
    deepEqual(getNames(",",2),"hello,hi");
  });
});