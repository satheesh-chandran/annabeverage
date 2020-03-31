const getPairedOptions = function(options) {
  const pairedOptions = [];
  for (index = 0; index < options.length; index += 2) {
    pairedOptions.push([options[index], options[index + 1]]);
  }
  return pairedOptions;
};

const isPosInteger = num => Number.isInteger(+num) && +num > 0;

const isValidDate = function(date) {
  const bits = date.split('-');
  if (bits[0] == 0) return false;
  const d = new Date(bits[0], bits[1] - 1, bits[2]);
  return d && d.getMonth() + 1 == bits[1];
};

const isSavePairVaild = function(pair) {
  if (!['--beverage', '--empId', '--qty'].includes(pair[0])) {
    return false;
  }
  const predicates = {
    '--beverage': () => true,
    '--empId': isPosInteger,
    '--qty': isPosInteger
  };
  return predicates[pair[0]](pair[1]);
};

const isQueryPairVaild = function(pair) {
  if (!['--date', '--empId', '--beverage'].includes(pair[0])) {
    return false;
  }
  const predicates = {
    '--date': isValidDate,
    '--empId': isPosInteger,
    '--beverage': () => true
  };
  return predicates[pair[0]](pair[1]);
};

/////////////////////////////////////////////////

const isSaveOptionsValid = options =>
  getPairedOptions(options).every(isSavePairVaild);

const isQueryOptionsValid = options =>
  getPairedOptions(options).every(isQueryPairVaild);

module.exports = {
  isQueryOptionsValid,
  isSaveOptionsValid,
  isQueryPairVaild,
  isSavePairVaild,
  isValidDate,
  isPosInteger
};
