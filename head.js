const { runHead } = require('./src/headLib.js')
const fs = require("fs");
const main = function() {
  console.log(runHead(process.argv.slice(2),fs))
};
main();
