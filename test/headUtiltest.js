const { deepEqual } = require('assert');

const { getContent,createHeading,
findOption
} = require('../src/headUtil.js');

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
  it('should create heading for a name',function(){
    deepEqual(createHeading("file"),"==> file <==");
  });
  it('should create heading for numbers',function(){
    deepEqual(createHeading(123),"==> 123 <==");
  });
});

describe('findOption',function(){
  it('should return default option n for name of file',function(){
    deepEqual(findOption("file"),"n");
  });
  it('should return exact option they given',function(){
    deepEqual(findOption('-n'),'n');
    deepEqual(findOption('-c'),'c');
  });
  it('should return default case for number',function(){
    deepEqual(findOption('-5'),'n');
  });
});
