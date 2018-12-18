const getContentFromTop = function(delimeter,content, count) {
  return content
    .split(delimeter)
    .slice(0,count)
    .join(delimeter);
};

const getContentFromBottom = function(delimeter, content, count) {
  const result = content.split(delimeter).reverse();
  if(result[0] === ""){
    return result.slice(1,+count+1).reverse().join(delimeter);
  }
  return result
    .slice(0,count)
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
