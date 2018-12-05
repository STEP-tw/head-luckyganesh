const { getContent , createHeading } = require('./headUtil.js');
const { fileStructure } = require('./fileLibrary.js');

const applyFunction = function(funcName,argumentToPass){
  return funcName(argumentToPass);
}

const parseInputsOfHead = function(headInputs){
  return { options:'n', length:10 , files:headInputs };
}

module.exports = { applyFunction ,parseInputsOfHead};
