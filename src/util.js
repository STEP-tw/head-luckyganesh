const getContentFromTop = function(separator, length) {
  result = this.contents.split(separator);
  return result
    .slice(0, length)
    .filter(line => line != "")
    .join(separator);
};

const getContentFromBottom = function(separator, length) {
  result = this.contents.split(separator).reverse();
  if(result[0] === ""){
    result = result.slice(1);
  }
  result = result.slice(0,length).reverse();
  return result.join(separator);
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
