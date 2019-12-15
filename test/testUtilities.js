const fs = require('fs');
// const assert = require('chai').assert;
const assert = require('assert');
const utilities = require('../src/utilities.js');
const {
  getBeverageRecord,
  recordTransaction,
  getFileOperations,
  formatter,
  saveFormatter,
  dateFormatter
} = utilities;

//---------------------------testRecordTransaction---------------------
describe('testRecordTransaction', function() {
  it('should write the content to the file', function() {
    const write = function(path, content, encoding) {
      assert.strictEqual('./test/testFile', path);
      assert.strictEqual('{}', content);
      assert.strictEqual('utf8', encoding);
    };

    let fileOperations = {
      write: write,
      encoding: 'utf8',
      content: '[]',
      path: './test/testFile'
    };

    let expected = undefined;
    let actual = recordTransaction({}, fileOperations);
    assert.strictEqual(actual, expected);
  });
});

//--------------------------testGetBeverageRecord----------------------
describe('testGetBeverageRecord', function() {
  it('should read content of the file when the file is already exists and contains some content', function() {
    const read = function(path, encoding) {
      assert.strictEqual('./test/testFile', path);
      assert.strictEqual('utf8', encoding);
      return 'hello';
    };

    const write = function(path, content, encoding) {
      assert.strictEqual('./test/testFile', path);
      assert.strictEqual('[]', content);
      assert.strictEqual('utf8', encoding);
    };

    const exist = function(path) {
      assert.strictEqual('./test/testFile', path);
      return true;
    };

    let fileOperations = {
      read: read,
      write: write,
      exist: exist,
      encoding: 'utf8',
      content: '[]',
      path: './test/testFile'
    };

    let expected = 'hello';
    let actual = getBeverageRecord(fileOperations);
    assert.deepStrictEqual(actual, expected);
  });

  it('should create one file if the file is not exists', function() {
    const read = function(path, encoding) {
      assert.strictEqual('./test/testFile', path);
      assert.strictEqual('utf8', encoding);
      return '{}';
    };

    const write = function(path, content, encoding) {
      assert.strictEqual('./test/testFile', path);
      assert.strictEqual('{}', content);
      assert.strictEqual('utf8', encoding);
    };

    const exist = function(path) {
      assert.strictEqual('./test/testFile', path);
      return false;
    };

    let fileOperations = {
      read: read,
      write: write,
      exist: exist,
      encoding: 'utf8',
      content: '{}',
      path: './test/testFile'
    };

    let expected = '{}';
    let actual = getBeverageRecord(fileOperations);
    assert.deepStrictEqual(actual, expected);
  });
});

//-------------------------getFileOperations---------------------------
describe('testFileOperations', function() {
  it('should give an object with specified properties and values', function() {
    let expected = {
      read: fs.readFileSync,
      write: fs.writeFileSync,
      exist: fs.existsSync,
      encoding: 'utf8',
      content: '[]',
      path: './data/juiceTransactions.json'
    };
    let actual = getFileOperations('./data/juiceTransactions.json');
    assert.deepStrictEqual(actual, expected);
  });
});

describe('formatter', function() {
  it('should return a formatted array according to the given object', function() {
    const element = {
      '--beverage': 'Orange',
      '--qty': '1',
      '--empId': '111',
      date: '2019-12-11T09:40:43.387Z'
    };
    let expected = ['111', 'Orange', 1, '2019-12-11T09:40:43.387Z'];
    let actual = formatter(element);
    assert.deepStrictEqual(actual, expected);
  });
});

describe('saveFormatter', function() {
  it('should return a formatted save message according to the given object', function() {
    const element = {
      '--beverage': 'Orange',
      '--qty': '1',
      '--empId': '111',
      date: '2019-12-11T09:40:43.387Z'
    };
    let expected = [
      ['Transaction Recorded:'],
      ['Employee ID,Beverage,Quantity,Date'],
      ['111', 'Orange', 1, '2019-12-11T09:40:43.387Z']
    ];
    let actual = saveFormatter(element);
    assert.deepStrictEqual(actual, expected);
  });
});

describe('dateFormatter', function() {
  it('should give a standard formatted valid date', function() {
    assert.equal(dateFormatter('2019-12-12'), '2019-12-12');
    assert.equal(dateFormatter('2019-1-12'), '2019-01-12');
    assert.equal(dateFormatter('2019-12-1'), '2019-12-01');
    assert.equal(dateFormatter('2019-1-1'), '2019-01-01');
  });
});
