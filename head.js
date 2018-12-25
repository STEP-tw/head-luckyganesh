const { head } = require('./src/lib')
const fs = require("fs");
const main = function() {
  console.log(head(process.argv.slice(2),fs))
};
main();
