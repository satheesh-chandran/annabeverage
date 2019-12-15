const beverageOperations = require('./src/lib.js').beverageOperations;
const getDataStorePath = require('./src/configuration.js').getDataStorePath;
const timeStamp = require('./src/configuration.js').timeStamp;
const getFileOperations = require('./src/utilities').getFileOperations;
const getBeverageRecord = require('./src/utilities').getBeverageRecord;

const main = function() {
  const commandArgs = process.argv.slice(2);
  const now = timeStamp(process.env);
  const path = getDataStorePath(process.env);
  const fileOperations = getFileOperations(path);
  let previousDetails = getBeverageRecord(fileOperations);
  console.log(
    beverageOperations(commandArgs, previousDetails, fileOperations, now).join(
      '\n'
    )
  );
};
main();
