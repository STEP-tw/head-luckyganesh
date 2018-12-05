const { getContent , createHeading } = require('./headUtil.js');
const { fileStructure } = require('./fileLibrary.js');

const applyFunction = function(funcName,argumentToPass){
  return funcName(argumentToPass);
}

const isFileName = function(fileName){
  return fileName[0] != "-" && !(+fileName);
}

const parseInputsOfHead = function(headInputs){
  let files = headInputs.filter(isFileName);
  return { options:'n', length:10 , files };
}

module.exports = { applyFunction ,parseInputsOfHead};
