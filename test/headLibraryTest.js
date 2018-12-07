const { parseInputsOfHead , read ,isExists ,checkingErrors , getContentOfFiles ,isFileExists ,head} = require('../src/headLibrary.js');

const { fileStructure } = require('../src/fileLibrary.js');
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

const fileExists = function() {
  return { isFile: () => true }
};
const fileNotExists = function() { 
  return {isFile:() => false};
};

const checkExist = () => true;
const checkNotExist = () => false;
describe('getContentOfFiles',function(){
  const files = [fileStructure("file")];
  const { getLines ,getBytes } = files[0];
  it('should return a line',function(){
    deepEqual(getContentOfFiles(files,readLine,checkExist,fileExists,"n",10),[{contents:'this is a line',fileName:"file",getLines,getBytes}]);
  });
  it('should return a character' ,function(){
    deepEqual(getContentOfFiles(files,readCharater,checkExist,fileExists,"c",19),[{contents:'this is a character',fileName:"file",getLines,getBytes}]);
  });
  it('should return content as error', function(){
    deepEqual(getContentOfFiles(files,readCharater,checkNotExist,fileExists,"n",3),[{contents:'head: file: No such file or directory',fileName:'file',getBytes,getLines}]);
  });
  it('should return error in reading file',function(){
    deepEqual(getContentOfFiles(files,readCharater,checkExist,fileNotExists,"n",3),[{contents:'head: Error reading file',fileName:'file',getBytes,getLines}]);
  });
});

describe('isFileExists',function(){
  it('should return true for fileExists function',function(){
    deepEqual(isFileExists(fileExists,"file"),true);
  });
  it('should return false for fileNotExists function',function(){
    deepEqual(isFileExists(fileNotExists,"file"),false);
  });
});

describe('head',function(){
  let readLine = function(){
    return "line1\nline2\nline3\nline4\nline5";
  }
  let readCharacter = function(){
    return "hello";
  }
  it('should work for default condition',function(){
    let userInputs = { options : 'n' ,length:10 ,files:["file"] }
    deepEqual(head(userInputs,readLine,checkExist,fileExists),"line1\nline2\nline3\nline4\nline5");
  });
  it('should work for default character condition',function(){
    let userInputs = { options : 'c' ,length:1 ,files:["file"] }
    deepEqual(head(userInputs,readCharacter,checkExist,fileExists),"h");;
  });
  it('should work for default character condition',function(){
    let userInputs = { options : 'c' ,length:1 ,files:["file","file"] }
    deepEqual(head(userInputs,readCharacter,checkExist,fileExists),"==> file <==\nh\n==> file <==\nh");;
  });
});
