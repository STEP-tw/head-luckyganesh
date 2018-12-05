const { createHeading ,
findOption,
findLength,
isFileName
} = require('./headUtil.js');

const { fileStructure } = require('./fileLibrary.js');

const read = function(reader,encryption,filePath){
  return reader(filePath,encryption);
}

const parseInputsOfHead = function(headInputs){
  let options = findOption(headInputs[0]);
  let length = findLength(headInputs.slice(0,2));
  let files = headInputs.filter(isFileName);
  return { options, length , files };
}

module.exports = { parseInputsOfHead , read };
