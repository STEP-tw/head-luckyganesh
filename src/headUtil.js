const getContent = function(separator,length){
  content = this.contents.split(separator);
  return content.slice(0,length).join(separator);
};

const createHeading = function(name){
  let heading = "==> "+name+" <=="
  return heading;
}

module.exports = { getContent ,createHeading};
