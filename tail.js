const { tail } = require('./src/lib.js')
const fs = require("fs");
const main = function() {
  console.log(tail(process.argv.slice(2),fs))
};
main();