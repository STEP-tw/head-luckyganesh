const { runCommand } = require('./src/lib')
const fs = require("fs");
const main = function() {
  console.log(runCommand(process.argv.slice(2),fs,"head"))
};
main();
