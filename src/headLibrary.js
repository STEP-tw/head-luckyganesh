const { getContent , createHeading } = require('./headUtil.js');
const { fileStructure } = require('./fileLibrary.js');

const applyFunction = function(funcName,argumentToPass){
  return funcName(argumentToPass);
}

module.exports = { applyFunction };
