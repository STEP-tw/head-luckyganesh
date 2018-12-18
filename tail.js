const { runCommand } = require('./src/lib.js')
const fs = require("fs");
const main = function() {
  console.log(runCommand(process.argv.slice(2),fs,"tail"))
};
main();