const assert = require('assert');
const fs = require('fs');
const juiceOperations = require('../src/juiceOperations');
const {
  query,
  isAllPointMatch,
  getQueryPoints,
  save,
  getObjectList
} = juiceOperations;

describe('getObjectList', function() {
  it('should return an object list', function() {
    let actual = getObjectList([1, 2, 3, 4, 5, 6]);
    let expected = { '1': 2, '3': 4, '5': 6 };
    assert.deepStrictEqual(actual, expected);
    actual = getObjectList([1, 2, 3, 4, 5]);
    expected = { '1': 2, '3': 4, '5': undefined };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('getQueryPoints', function() {
  it('should abstract all the query point from the options', function() {
    let options = [
      '--beverage',
      'orange',
      '--empId',
      '111',
      '--date',
      '2019-1-12'
    ];
    let actual = getQueryPoints(options);
    let expected = ['orange', '111', '2019-01-12'];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('isAllPointsMatch', function() {
  it('should return true if all the points present in the given element', function() {
    let element = {
      '--beverage': 'Orange',
      '--qty': '1',
      '--empId': '111',
      date: '2019-12-11T09:40:43.387Z'
    };
    let points = ['Orange', '111', '2019-12-11'];
    assert.equal(isAllPointMatch(points, element), true);
  });
  it('should return false if any of the points not present in the given element', function() {
    let element = {
      '--beverage': 'Orange',
      '--qty': '1',
      '--empId': '111',
      date: '2019-12-11T09:40:43.387Z'
    };
    let points = ['Orange', '11', '2019-12-11'];
    assert.equal(isAllPointMatch(points, element), false);
  });
});

describe('save', function() {
  it('should save the transaction and return the save message', function() {
    const actualDate = new Date();
    const expectedDate = new Date().toJSON();
    const options = ['--beverage', 'orange', '--empId', '111', '--qty', '2'];
    const fileOperations = {
      read: fs.readFileSync,
      write: fs.writeFileSync,
      exist: fs.existsSync,
      encoding: 'utf8',
      content: '[]',
      path: './appTestFiles/juiceTransactions.json'
    };
    const actualValue = save(options, '[]', fileOperations, actualDate);
    const expectedValue = [
      ['Transaction Recorded:'],
      ['Employee ID,Beverage,Quantity,Date'],
      ['111', 'orange', 2, expectedDate]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should return an invalid message if the optiions are invalid', function() {
    const actualDate = new Date();
    const expectedDate = new Date().toJSON();
    const options = ['--beverage', 'orange', '--empId', '11sdf1', '--qty', '2'];
    const fileOperations = {
      read: fs.readFileSync,
      write: fs.writeFileSync,
      exist: fs.existsSync,
      encoding: 'utf8',
      content: '[]',
      path: './juiceTransactions.json'
    };
    const actualValue = save(options, '[]', fileOperations, actualDate);
    const expectedValue = [['options not valid']];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe('query', function() {
  it('should return all the existing matched transactions if queried by empId', function() {
    const previousDetails = [
      {
        '--beverage': 'Orange',
        '--qty': '2',
        '--empId': '111',
        date: '2019-12-11T09:40:43.387Z'
      },
      {
        '--beverage': 'Orange',
        '--qty': '1',
        '--empId': '121',
        date: '2019-12-11T09:40:43.387Z'
      }
    ];
    const options = ['--empId', '111'];
    const actualValue = query(options, JSON.stringify(previousDetails));
    const expectedValue = [
      ['Employee ID,Beverage,Quantity,Date'],
      ['111', 'Orange', 2, '2019-12-11T09:40:43.387Z'],
      ['Total: 2 Juices']
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should return all the existing matched transactions if queried by beverage', function() {
    const previousDetails = [
      {
        '--beverage': 'Orange',
        '--qty': '2',
        '--empId': '111',
        date: '2019-12-11T09:40:43.387Z'
      },
      {
        '--beverage': 'apple',
        '--qty': '2',
        '--empId': '111',
        date: '2019-12-11T09:40:43.387Z'
      }
    ];
    const options = ['--beverage', 'Orange'];
    const actualValue = query(options, JSON.stringify(previousDetails));
    const expectedValue = [
      ['Employee ID,Beverage,Quantity,Date'],
      ['111', 'Orange', 2, '2019-12-11T09:40:43.387Z'],
      ['Total: 2 Juices']
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should return all the existing matched transactions if queried by date', function() {
    const previousDetails = [
      {
        '--beverage': 'Orange',
        '--qty': '2',
        '--empId': '111',
        date: '2019-12-11T09:40:43.387Z'
      },
      {
        '--beverage': 'Orange',
        '--qty': '2',
        '--empId': '111',
        date: '2019-11-11T09:40:43.387Z'
      }
    ];
    const options = ['--date', '2019-12-11'];
    const actualValue = query(options, JSON.stringify(previousDetails));
    const expectedValue = [
      ['Employee ID,Beverage,Quantity,Date'],
      ['111', 'Orange', 2, '2019-12-11T09:40:43.387Z'],
      ['Total: 2 Juices']
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should return an empty list if the queried details not matching', function() {
    const previousDetails = [
      {
        '--beverage': 'Orange',
        '--qty': '2',
        '--empId': '111',
        date: '2019-12-11T09:40:43.387Z'
      },
      {
        '--beverage': 'Orange',
        '--qty': '2',
        '--empId': '111',
        date: '2019-11-11T09:40:43.387Z'
      }
    ];
    const options = ['--date', '2019-1-11'];
    const actualValue = query(options, JSON.stringify(previousDetails));
    const expectedValue = [
      ['Employee ID,Beverage,Quantity,Date'],
      ['Total: 0 Juice']
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should return an error message if the entered options are invalid', function() {
    const previousDetails = [
      {
        '--beverage': 'Orange',
        '--qty': '2',
        '--empId': '111',
        date: '2019-12-11T09:40:43.387Z'
      },
      {
        '--beverage': 'Orange',
        '--qty': '2',
        '--empId': '111',
        date: '2019-11-11T09:40:43.387Z'
      }
    ];
    const options = ['date', '2019-1-11'];
    const actualValue = query(options, JSON.stringify(previousDetails));
    const expectedValue = [['options not valid']];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should work for query with multiple options', function() {
    const previousDetails = [
      {
        '--beverage': 'Orange',
        '--qty': '2',
        '--empId': '111',
        date: '2019-12-11T09:40:43.387Z'
      },
      {
        '--beverage': 'apple',
        '--qty': '1',
        '--empId': '222',
        date: '2019-11-11T09:40:43.387Z'
      }
    ];
    const options = [
      '--date',
      '2019-12-11',
      '--beverage',
      'Orange',
      '--empId',
      '111'
    ];
    const actualValue = query(options, JSON.stringify(previousDetails));
    const expectedValue = [
      ['Employee ID,Beverage,Quantity,Date'],
      ['111', 'Orange', 2, '2019-12-11T09:40:43.387Z'],
      ['Total: 2 Juices']
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
