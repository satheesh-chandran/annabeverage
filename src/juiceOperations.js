const isQueryOptionsValid = require('./validations').isQueryOptionsValid;
const isSaveOptionsValid = require('./validations').isSaveOptionsValid;
const recordTransaction = require('./utilities').recordTransaction;
const saveFormatter = require('./utilities').saveFormatter;
const formatter = require('./utilities').formatter;
const dateFormatter = require('./utilities').dateFormatter;

const getObjectList = function(timeStampedArg) {
  const purchaseDetails = {};
  for (let index = 0; index < timeStampedArg.length; index += 2) {
    purchaseDetails[timeStampedArg[index]] = timeStampedArg[index + 1];
  }
  return purchaseDetails;
};

/////////////////////////////////////////////////

const save = function(options, previousDetails, fileOperations, now) {
  if (!isSaveOptionsValid(options)) {
    return [['options not valid']];
  }
  previousDetails = JSON.parse(previousDetails);
  const purchaseDetails = getObjectList(options);
  purchaseDetails.date = now.toJSON();
  previousDetails.push(purchaseDetails);
  recordTransaction(previousDetails, fileOperations);
  return saveFormatter(purchaseDetails);
};

/////////////////////////////////////////////////

const getQueryPoints = function(options) {
  const queryPoints = [];
  for (let index = 0; index < options.length; index += 2) {
    options[index] == '--date'
      ? queryPoints.push(dateFormatter(options[index + 1]))
      : queryPoints.push(options[index + 1]);
  }
  return queryPoints;
};

/////////////////////////////////////////////////

const isAllPointMatch = function(queryPoints, element) {
  let elementCopy = element;
  const systemDate = elementCopy.date;
  elementCopy.date = systemDate.slice(0, 10);
  let flag = true;
  for (let i = 0; i < queryPoints.length; i++) {
    flag = flag && Object.values(elementCopy).includes(queryPoints[i]);
  }
  elementCopy.date = systemDate;
  return flag;
};

/////////////////////////////////////////////////

const sum = function(a, element) {
  return a + element[2];
};

/////////////////////////////////////////////////

const query = function(options, previousDetails) {
  if (!isQueryOptionsValid(options)) {
    return [['options not valid']];
  }
  const queryPoints = getQueryPoints(options);
  previousDetails = JSON.parse(previousDetails);
  let matchedList = previousDetails.filter(
    isAllPointMatch.bind(null, queryPoints)
  );
  matchedList = matchedList.map(formatter);
  const total = matchedList.reduce(sum, 0);
  total > 1
    ? matchedList.push([`Total: ${total} Juices`])
    : matchedList.push([`Total: ${total} Juice`]);
  matchedList.unshift(['Employee ID,Beverage,Quantity,Date']);
  return matchedList;
};

/////////////////////////////////////////////////

module.exports = {
  query,
  isAllPointMatch,
  getQueryPoints,
  save,
  getObjectList
};
