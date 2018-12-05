const { parseInputsOfHead,head ,checkingErrors } = require('./src/headLibrary.js');

const fs = require('fs')
const main = function(){
  let parsedInputs = parseInputsOfHead(process.argv.slice(2));
  let err = checkingErrors(parsedInputs);
  console.log(err ||  head(parsedInputs,fs.readFileSync,fs.existsSync));
}
main();
