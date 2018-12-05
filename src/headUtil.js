const getContent = function(separator,length){
  content = this.contents.split(separator);
  return content.slice(0,length).join(separator);
};

const createHeading = function(name){
  let heading = "==> "+name+" <=="
  return heading;
}

const findOption = function(elem){
  if(elem[0] != "-" || +elem.slice(1)){
    return 'n';
  }
  return elem[1];
};
const findLength = function(options){
  let length = "10";
  if(options[0] == "-"){
    length = +options[0].slice(1) || +options[0].slice(2) || options[1];
  }
  return length;
}

const isFileName = function(fileName){
  return fileName[0] != "-" && !(+fileName);
}

module.exports = { getContent ,createHeading , findOption ,findLength , isFileName};
