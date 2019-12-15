const assert = require('assert');
const fs = require('fs');
const lib = require('../src/lib');
const { beverageOperations, getUserRequirement } = lib;

describe('getUserRequirement', function() {
  it('should convert the commandline arguments into an object form', function() {
    const actual = getUserRequirement([1, 2, 3, 4, 5, 6]);
    const expected = { operation: 1, options: [2, 3, 4, 5, 6] };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('beverageOperations', function() {
  it('should return an error message if the operation is invalid', function() {
    const commandArgs = [
      'save',
      '--beverage',
      'orange',
      '--empId',
      '111',
      '--qty',
      '2'
    ];
    const fileOperations = {
      read: fs.readFileSync,
      write: fs.writeFileSync,
      exist: fs.existsSync,
      encoding: 'utf8',
      content: '[]',
      path: './data/juiceTransactions.json'
    };
    const actualDate = new Date();
    const expectedDate = new Date().toJSON();
    const actual = beverageOperations(
      commandArgs,
      '[]',
      fileOperations,
      actualDate
    );
    const expected = [['entered operation is invalid']];
    assert.deepStrictEqual(actual, expected);
  });
  it('should return an error message if the options corresponding to operation is invalid', function() {
    const commandArgs = [
      '--save',
      '--beverage',
      'orange',
      '--empId',
      '11sad1',
      '--qty',
      '2'
    ];
    const fileOperations = {
      read: fs.readFileSync,
      write: fs.writeFileSync,
      exist: fs.existsSync,
      encoding: 'utf8',
      content: '[]',
      path: './data/juiceTransactions.json'
    };
    const actualDate = new Date();
    const expectedDate = new Date().toJSON();
    const actual = beverageOperations(
      commandArgs,
      '[]',
      fileOperations,
      actualDate
    );
    const expected = [['options not valid']];
    assert.deepStrictEqual(actual, expected);
  });
  it('should return an error message if the options corresponding to operation is invalid', function() {
    const commandArgs = [
      '--query',
      '--beverage',
      'orange',
      '--empId',
      '111',
      '--qty',
      '2'
    ];
    const fileOperations = {
      read: fs.readFileSync,
      write: fs.writeFileSync,
      exist: fs.existsSync,
      encoding: 'utf8',
      content: '[]',
      path: './data/juiceTransactions.json'
    };
    const actualDate = new Date();
    const expectedDate = new Date().toJSON();
    const actual = beverageOperations(
      commandArgs,
      '[]',
      fileOperations,
      actualDate
    );
    const expected = [['options not valid']];
    assert.deepStrictEqual(actual, expected);
  });
  it('should return a save message for save operation', function() {
    const commandArgs = [
      '--save',
      '--beverage',
      'orange',
      '--empId',
      '111',
      '--qty',
      '2'
    ];
    const fileOperations = {
      read: fs.readFileSync,
      write: fs.writeFileSync,
      exist: fs.existsSync,
      encoding: 'utf8',
      content: '[]',
      path: './data/juiceTransactions.json'
    };
    const actualDate = new Date();
    const expectedDate = new Date().toJSON();
    const actual = beverageOperations(
      commandArgs,
      '[]',
      fileOperations,
      actualDate
    );
    const expected = [
      ['Transaction Recorded:'],
      ['Employee ID,Beverage,Quantity,Date'],
      ['111', 'orange', 2, expectedDate]
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
