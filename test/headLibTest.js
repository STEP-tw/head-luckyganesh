const { head } = require('../src/headLib.js')

const { deepEqual } = require('assert')
const { readLine , readCharacter , checkExist } = require('./libTest.js')
describe("head", function() {
    it("should work for default condition", function() {
      const fs = { readFileSync: readLine ,existsSync:checkExist}
      let userInputs = { options: "n", length: 10, files: ["file"] };
      deepEqual(
        head(userInputs, fs ),
        "line1\nline2\nline3\nline4\nline5"
      );
    });
    it("should work for default character condition", function() {
      const fs = { readFileSync: readCharacter ,existsSync:checkExist}
      let userInputs = { options: "c", length: 1, files: ["file"] };
      deepEqual(head(userInputs , fs), "h");
    });
    it("should work for default character condition", function() {
      const fs = { readFileSync: readCharacter ,existsSync:checkExist}
      let userInputs = { options: "c", length: 1, files: ["file", "file"] };
      deepEqual(
        head(userInputs, fs),
        "==> file <==\nh\n==> file <==\nh"
      );
    });
});