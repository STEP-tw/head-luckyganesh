const { parseInputsOfHead,head } = require('./src/headLibrary.js');

const fs = require('fs')
const main = function(){
  let parsedInputs = parseInputsOfHead(process.argv.slice(2));
  let result = head(parsedInputs,fs.readFileSync);
  console.log(result);
}
main();
