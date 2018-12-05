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
  if(options[0][0] != "-"){
    return 10;
  }
  if(isFinite(options[0])){
    return options[0].slice(1);
  }
  if(isFinite(options[0].slice(2)) && options[0].slice(2) != ""){
    return options[0].slice(2);
  }
  return options[1];
}

const isFileName = function(fileName){
  return fileName[0] != "-" && !(+fileName);
}

module.exports = { getContent ,createHeading , findOption ,findLength , isFileName};
