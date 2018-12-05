const { applyFunction , parseInputsOfHead } = require('../src/headLibrary.js');

const { deepEqual } = require('assert');

describe('applyFunction',function(){
  const identity = function(elem){
    return elem;
  }
  const increment = function(num){
    return ++num;
  }
  it('should apply identity function for the argument given',function(){
    deepEqual(applyFunction(identity,0),0);
    deepEqual(applyFunction(identity,"lines"),"lines");
  });
  it('should apply increment function for the numbers',function(){
    deepEqual(applyFunction(increment,0),1);
  });
});

describe('parseInputsOfHead',function(){
  it('should return all inputs as files',function(){
    deepEqual(parseInputsOfHead(["file1","file2"]),{ options:"n" , length:10 , files:["file1","file2"]});
  });
});

