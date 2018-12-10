const { head , runHead } = require('../src/headLib.js')

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

describe('runHead',function(){
    it('should work for default condition',function(){
        const fs = { readFileSync: readLine ,existsSync:checkExist}
        deepEqual(runHead(['file1'],fs),'line1\nline2\nline3\nline4\nline5')
    })
    it('should work to give n lines ',function(){
        const fs = { readFileSync: readLine ,existsSync:checkExist}
        deepEqual(runHead(["-n3",'file1'],fs),'line1\nline2\nline3')
        deepEqual(runHead(["-n1",'file1'],fs),'line1')
    })
    it('should work to give n bytes', function(){
        const fs = { readFileSync: readCharacter ,existsSync:checkExist}
        deepEqual(runHead(['-c2','file'],fs),'he')
        deepEqual(runHead(['-c3','file'],fs),'hel')
    })
})