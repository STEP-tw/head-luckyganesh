const { deepEqual } = require('assert');

const { getContent,createHeading } = require('../src/headUtil.js');

describe('getContent',() => {
  let file = { contents:"hello,hi,bye,good,bad"};
  getNames = getContent.bind(file);
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

describe('createHeading',function(){
  it('should create empty heading',function(){
    deepEqual(createHeading(""),"==>  <==");
  });
});
