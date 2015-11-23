/**
* Generate a unique ID-string based on your own input.
* 
* @param {string|Range} input The input to be calculated with
* @param {number} maxLen The max. length of resulting ID
* @return The calculated ID based on input
* @customfunction
*/
function makeid(input, maxLen) {
  maxLen = typeof maxLen !== 'undefined' ? maxLen : 10;
  return multimap([input, maxLen], function(input, maxLen) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, input);
    
    for(var i = 0; i < digest.length && i < maxLen; i++){
      /*
      Math.floor = returns the largest integer less than or equal to a given number
      Math.abs = returns the absolute value of a number
      Modulus % = Divides the value of one expression by the value of another, and returns the remainder
      charAt = returns the character at the specified index in a string
      */
      text += possible.charAt(Math.abs(Math.floor(digest[i])) % possible.length);
    }
    
    return text;
  });
}