const { parseInputsOfHead , read ,isExists ,checkingErrors , getContentOfFile } = require('../src/headLibrary.js');

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

describe('isExists',function(){
  const fileExists = () => true;
  const fileNotExists = () => false;
  it('should return the file exists',function(){
    deepEqual(isExists(fileExists,"file"),true);
  });
  it('should return false for file not existance',function(){
    deepEqual(isExists(fileNotExists,"temp"),false);
  });
});

describe('checkingErrors',function(){
  it('should return empty string' ,function(){
    deepEqual(checkingErrors({ options:'n' , length : 10}),"");
  });
  it('should return err msg for wrong options',function(){
    deepEqual(checkingErrors({ options:'p' , length : 10}),("head: illegal option -- p\nusage: head [-n lines | -c bytes] [file ...]"));
  });
  it('should return err msg for wrong length',function(){
    deepEqual(checkingErrors({ options:'c' , length :0 }),("head: illegal byte count -- 0"));
    deepEqual(checkingErrors({ options:'n' , length :0 }),("head: illegal line count -- 0"));
  });
});

describe('getContentOfFile',function(){
  const checkExist = () => true;
  const checkNoExist = () => false;
  const checkFileExist = () => true;
  const checkFileNotExist = () => false;
  const files = [{fileName:"file",contents:""}];
  it('should return a line',function(){
    deepEqual(getContentOfFile(files,readLine,checkExist,checkFileExist),[{contents:'this is a line',fileName:"file"}]);
  });
  it('should return a character' ,function(){
    deepEqual(getContentOfFile(files,readCharater,checkExist,checkFileExist),[{contents:'this is a character',fileName:"file"}]);
  });
  it('should return content as error', function(){
    deepEqual(getContentOfFile(files,readCharater,checkFileNotExist,readLine,checkFileExist),[{contents:'head: file: No such file or directory',fileName:'file'}]);
  });
});

