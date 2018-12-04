const getContent = function(separator,length){
  content = this.contents.split(separator);
  return content.slice(0,length).join(separator);
};

module.exports = { getContent };
