const { parseInputsOfHead,head } = require('./src/headLibrary.js');

const fs = require('fs')
const main = function(){
  let parsedInputs = parseInputsOfHead(process.argv.slice(2));
  let err = checkErrors(parsedInputs);
  console.log(err ||  head(parsedInputs,fs.readFileSync));
}
main();
