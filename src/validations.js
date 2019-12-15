const getPairedOptions = function(options) {
  const pairedOptions = [];
  for (index = 0; index < options.length; index += 2) {
    pairedOptions.push([options[index], options[index + 1]]);
  }
  return pairedOptions;
};

/////////////////////////////////////////////////

const isPosInteger = function(num) {
  const number = +num;
  return Number.isInteger(number) && number > 0;
};

/////////////////////////////////////////////////

const isValidDate = function(date) {
  let bits = date.split('-');
  if (bits[0] == 0) {
    return false;
  }
  let d = new Date(bits[0], bits[1] - 1, bits[2]);
  return d && d.getMonth() + 1 == bits[1];
};

/////////////////////////////////////////////////

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

/////////////////////////////////////////////////

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

const isSaveOptionsValid = function(options) {
  const pairedOptions = getPairedOptions(options);
  return pairedOptions.every(isSavePairVaild);
};

/////////////////////////////////////////////////

const isQueryOptionsValid = function(options) {
  const pairedOptions = getPairedOptions(options);
  return pairedOptions.every(isQueryPairVaild);
};

/////////////////////////////////////////////////

module.exports = {
  isQueryOptionsValid,
  isSaveOptionsValid,
  isQueryPairVaild,
  isSavePairVaild,
  isValidDate,
  isPosInteger
};
