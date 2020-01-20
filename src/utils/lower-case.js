
/**
 * Lowercase a string, return an empty string if null or undefined
 * @param {String} str String to lowercase
 * @returns {String} Lowercased string
 */
module.exports = (str) => {
  if (str === null || str === undefined) {
    return '';
  }
  return String(str).toLowerCase();
};
