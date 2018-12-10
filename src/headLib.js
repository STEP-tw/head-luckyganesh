const {fileStructure} = require('./fileLibrary');

const { getContentOfFiles , parseInputsOfHead ,checkingErrors } = require('./lib.js');

const head = function(parsedInputs, fs) {
    let { options, length, files } = parsedInputs;
    files = files.map(fileStructure);
    files = getContentOfFiles(files , options, length, fs);
    return files.map(file => file.contents).join("\n");
};

const runHead = function(userInputs,fs){
    let parsedInputs = parseInputsOfHead(userInputs);
    let err = checkingErrors(parsedInputs);
    return err || head(parsedInputs, fs)
}
module.exports = { head , runHead };