const getContentFromTop = function(delimeter,content, length) {
  let result = content.split(delimeter);
  return result
    .slice(0, length)
    .join(delimeter);
};

const getContentFromBottom = function(delimeter, content, length) {
  const result = content.split(delimeter).reverse();
  if(result[0] === ""){
    return result.slice(1,+length+1).reverse().join(delimeter);
  }
  return result
    .slice(0,length)
    .reverse()
    .join(delimeter);
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
