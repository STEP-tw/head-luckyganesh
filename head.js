const { parseInputsOfHead,head } = require('./src/headLibrary.js');

const fs = require('fs')
const main = function(){
  let parsedInputs = parseInputsOfHead(process.argv.slice(2));
  let { options ,length } = parsedInputs;
  if(options != 'n' && options != 'c'){
    console.log("head: illegal option --"+options+"\nusage: head [-n lines | -c bytes] [file ...]");
    return ;
  }
  if(!(length > 0)){
    console.log("head: illegal line count --"+length);
    return ;
  }
  let result = head(parsedInputs,fs.readFileSync);
  console.log(result);
}
main();
