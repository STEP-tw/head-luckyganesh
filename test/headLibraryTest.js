const { parseInputsOfHead , read } = require('../src/headLibrary.js');

const { deepEqual } = require('assert');

describe('parseInputsOfHead',function(){
  it('should return all inputs as files',function(){
    deepEqual(parseInputsOfHead(["file1","file2"]),{ options:"n" , length:10 , files:["file1","file2"]});
  });
  it('should return the option and length with files',function(){
    deepEqual(parseInputsOfHead(["-n","10","file1","file2"]),{ options:"n" , length:10 , files:["file1","file2"]});
  });
  it('should return the option other than n',function(){
    deepEqual(parseInputsOfHead(["-c","10","file1","file2"]),{ options:"c" , length:10 , files:["file1","file2"]});
  });
});

let readLine = function(filePath,encryption){
  return "this is a line";
}

let readCharater = function(filePath,encryption){
  return "this is a character";
}

describe('read',function(){
  it('should return a line', function(){
    deepEqual(read(readLine,"./file","utf-8"),"this is a line");
  });
  it('should return a character',function(){
    deepEqual(read(readCharater,"./file","utf-8"),"this is a character");
  });
});
