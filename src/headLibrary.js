const { createHeading ,
findOption,
findLength,
isFileName
} = require('./headUtil.js');

const { fileStructure } = require('./fileLibrary.js');

const read = function(reader,encryption,filePath){
  return reader(filePath,encryption);
}

const isExists = function(checker,filePath){
  return checker(filePath);
}

const isFileExists = function(fileChecker,filePath){
  return fileChecker(filePath).isFile();
}

const parseInputsOfHead = function(headInputs){
  let options = findOption(headInputs[0]);
  let length = findLength(headInputs.slice(0,2));
  let files = headInputs.filter(isFileName);
  return { options, length , files };
}

const checkingErrors = function(parsedInputs){
  let { options ,length } = parsedInputs;
  if(options != 'n' && options != 'c'){
    return ("head: illegal option -- "+options+"\nusage: head [-n lines | -c bytes] [file ...]");
  }
  let option = { 'n' : "line", 'c' : 'byte' }
  if(!(length > 0)){
   return  ("head: illegal "+option[options]+" count -- "+length);
  }
  return "";
}

getContentOfFile = function(files,reader,existChecker,fileChecker){
  files = files.map((file) => {
    if(!isExists(existChecker,file.fileName)){
      file.contents = ("head: "+file.fileName+": No such file or directory")
      return file;
    }
    if(!isFileExists(fileChecker,file.fileName)){
      file.contents = ("head: Error reading "+file.fileName);
      return file;
    }
    file.contents = read(reader,"utf-8",file.fileName);
    return file;
  });
  return files;
};

const extractContent = function( files,options,length,existChecker){
  contents = files.map((file) => {
    if(!isExists(existChecker,file.fileName)){
      return file.contents;
    }
    if(options == 'n'){
      return file.getLines(length);
    }
    return file.getBytes(length);
  });
  return contents;
};

const showFormat = function(contents,files,existChecker){
  if(contents.length == 1){
    return contents[0];
  }
  let delimeter = ""
  return contents.map((content,index) => {
    if(!isExists(existChecker,files[index].fileName)){
      return content;
    }
    let msg = delimeter+createHeading(files[index].fileName)+"\n"+content;
    delimeter = "\n";
    return msg;
  }).join('\n');;
}

const head = function(parsedInputs,reader,existChecker,fileChecker){
  let { options ,length , files } = parsedInputs;
  files = files.map(fileStructure);
  files = getContentOfFile(files,reader,existChecker,fileChecker);
  let contents = extractContent(files,options,length,existChecker);
  return showFormat(contents,files,existChecker);
}

module.exports = { parseInputsOfHead , read , head ,checkingErrors, isExists , checkingErrors , getContentOfFile , isFileExists , extractContent };
