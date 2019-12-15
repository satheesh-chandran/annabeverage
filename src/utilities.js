const fs = require('fs');

// const invalidMessage = function() {
//   return [
//     ['the entered arguments are not valid, use the following format'],
//     [
//       'for ordering\t' +
//         '--save --beverage <juice name> --empId <employee ID> --qty <number of juices>'
//     ],
//     ['for query\t' + '--query --empId <employee ID>']
//   ];
// };

/////////////////////////////////////////////////

const formatter = function(element) {
  return [
    element['--empId'],
    element['--beverage'],
    +element['--qty'],
    element['date']
  ];
};

/////////////////////////////////////////////////

const saveFormatter = function(element) {
  return [
    ['Transaction Recorded:'],
    ['Employee ID,Beverage,Quantity,Date'],
    [
      element['--empId'],
      element['--beverage'],
      +element['--qty'],
      element['date']
    ]
  ];
};

/////////////////////////////////////////////////

const dateFormatter = function(date) {
  let bits = date.split('-');
  bits[1].length == 1 ? (bits[1] = `0${bits[1]}`) : (bits[1] = bits[1]);
  bits[2].length == 1 ? (bits[2] = `0${bits[2]}`) : (bits[2] = bits[2]);
  return bits.join('-');
};

/////////////////////////////////////////////////

const recordTransaction = function(transactionObj, fileOperations) {
  let encoding = fileOperations.encoding;
  let write = fileOperations.write;
  let path = fileOperations.path;
  let transactionStr = JSON.stringify(transactionObj);
  write(path, transactionStr, encoding);
};

/////////////////////////////////////////////////

const getBeverageRecord = function(fileOperations) {
  let exist = fileOperations.exist;
  let read = fileOperations.read;
  let write = fileOperations.write;
  let encoding = fileOperations.encoding;
  let content = fileOperations.content;
  let path = fileOperations.path;
  if (!exist(path) || read(path, encoding) == '') {
    write(path, content, encoding);
  }
  return read(path, encoding);
};

/////////////////////////////////////////////////

const getFileOperations = function(path) {
  let fileOperations = {};
  fileOperations.read = fs.readFileSync;
  fileOperations.write = fs.writeFileSync;
  fileOperations.exist = fs.existsSync;
  fileOperations.encoding = 'utf8';
  fileOperations.content = '[]';
  fileOperations.path = path;
  return fileOperations;
};

/////////////////////////////////////////////////

exports.getBeverageRecord = getBeverageRecord;
exports.recordTransaction = recordTransaction;
exports.getFileOperations = getFileOperations;
exports.formatter = formatter;
exports.saveFormatter = saveFormatter;
exports.dateFormatter = dateFormatter;
