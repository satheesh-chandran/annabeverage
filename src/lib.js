const save = require('./juiceOperations').save;
const query = require('./juiceOperations').query;

const getUserRequirement = function(commandArgs) {
  const userRequirement = {};
  userRequirement.operation = commandArgs[0];
  userRequirement.options = commandArgs.slice(1);
  return userRequirement;
};

const beverageOperations = function(
  commandArgs,
  previousDetails,
  fileOperations,
  now
) {
  const allOperations = { '--save': save, '--query': query };
  if (!Object.keys(allOperations).includes(commandArgs[0])) {
    return [['entered operation is invalid']];
  }
  const userRequirement = getUserRequirement(commandArgs);
  return allOperations[userRequirement.operation](
    userRequirement.options,
    previousDetails,
    fileOperations,
    now
  );
};

module.exports = { beverageOperations, getUserRequirement };
