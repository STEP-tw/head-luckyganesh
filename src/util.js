const getContentFromTop = function(delimeter,content, length) {
  let result = content.split(delimeter);
  return result
    .slice(0, length)
    .join(delimeter);
};

const getContentFromBottom = function(delimeter, content, length) {
  let result = content.split(delimeter).reverse();
  if(result[0] === ""){
    result = result.slice(1);
  }
  result = result.slice(0,length).reverse();
  return result.join(delimeter);
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
