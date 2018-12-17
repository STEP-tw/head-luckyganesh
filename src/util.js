const getContentFromTop = function(separator, length) {
  content = this.contents.split(separator);
  return content
    .slice(0, length)
    .filter(line => line != "")
    .join(separator);
};

const getContentFromBottom = function(separator, length) {
  content = this.contents.split(separator).reverse();
  if(content[0] === ""){
    content = content.slice(1);
  }
  content = content.slice(0,length).reverse();
  return content.join(separator);
};

const createHeading = function(name) {
  let heading = "==> " + name + " <==";
  return heading;
};

module.exports = {
  getContentFromTop,
  getContentFromBottom,
  createHeading
};
