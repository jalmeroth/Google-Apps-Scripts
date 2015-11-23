/**
 * Applies a function to a set of arguments, looping over arrays in those
 * arguments. Similar to Array.map, except that it can map the function across
 * multiple arrays, passing forward non-array values.
 * @param {Array} args The arguments to map against.
 * @param {Function} func The function to apply.
 * @return {Array} The results of the mapping.
 * Code from: https://github.com/google/google-apps-script-samples/blob/master/date_add_and_subtract/Code.gs
 */
function multimap(args, func) {
  // Determine the length of the arrays.
  var lengths = args.map(function(arg) {
    if (arg instanceof Array) {
      return arg.length;
    } else {
      return 0;
    }
  });
  var max = Math.max.apply(null, lengths);

  // If there aren't any arrays, just call the function.
  if (max == 0) {
    return func.apply(null, args);
  }

  // Ensure all the arrays are the same length.
  // Arrays of length 1 are exempted, since they are assumed to be rows/columns
  // that should apply to each row/column in the other sets.
  lengths.forEach(function(length) {
    if (length != max && length > 1) {
      throw 'All input ranges must be the same size: ' + max;
    }
  });

  // Recursively apply the map function to each element in the arrays.
  var result = []
  for (var i = 0; i < max; i++) {
    var params = args.map(function(arg) {
      if (arg instanceof Array) {
        return arg.length == 1 ? arg[0] : arg[i];
      } else {
        return arg;
      }
    });
    result.push(multimap(params, func));
  }
  return result;
}
