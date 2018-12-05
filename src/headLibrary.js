const { getContent , createHeading } = require('./headUtil.js');
const { fileStructure } = require('./fileLibrary.js');

const applyFunction = function(funcName,argumentToPass){
  return funcName(argumentToPass);
}

const findOption = function(elem){
  if(elem[0] != "-" || +elem.slice(1)){
    return 'n';
  }
  return elem[1];
};
const findLength = function(options){
  let length = "10";
  if(options[0] == "-"){
    length = +options[0].slice(1) || +options[0].slice(2) || options[1];
  }
  return length;
}

const isFileName = function(fileName){
  return fileName[0] != "-" && !(+fileName);
}

const parseInputsOfHead = function(headInputs){
  let options = findOption(headInputs[0]);
  let length = findLength(headInputs.slice(0,2));
  let files = headInputs.filter(isFileName);
  return { options, length , files };
}

module.exports = { applyFunction ,parseInputsOfHead};
