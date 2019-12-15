const assert = require('assert');
const validtions = require('../src/validations');
const {
  isQueryOptionsValid,
  isSaveOptionsValid,
  isQueryPairVaild,
  isSavePairVaild,
  isValidDate,
  isPosInteger
} = validtions;

describe('isPosInteger', function() {
  it('should return true if the given string can be convert into a positve integer', function() {
    assert.equal(isPosInteger('3'), true);
  });
  it("should return false if the given string can't be convert into a positve integer", function() {
    assert.equal(isPosInteger('3.2'), false);
    assert.equal(isPosInteger('satheesh'), false);
  });
});

describe('isValidDate', function() {
  it('should return true for a valid date', function() {
    assert.equal(isValidDate('2019-12-12'), true);
    assert.equal(isValidDate('2020-2-29'), true);
  });
  it('should return false for a invalid date', function() {
    assert.equal(isValidDate('0000-12-12'), false);
    assert.equal(isValidDate('2019-2-29'), false);
    assert.equal(isValidDate('2019-12-0'), false);
    assert.equal(isValidDate('2019-0-12'), false);
    assert.equal(isValidDate('2019-0-0'), false);
    assert.equal(isValidDate('0000-00-00'), false);
  });
});

describe('isSavePairValid', function() {
  it('should return true for valid pairs', function() {
    assert.equal(isSavePairVaild(['--beverage', 'satheesh']), true);
    assert.equal(isSavePairVaild(['--qty', '1']), true);
    assert.equal(isSavePairVaild(['--empId', '111']), true);
  });
  it('should return false for invalid pairs', function() {
    assert.equal(isSavePairVaild(['satheesh', '--beverage']), false);
    assert.equal(isSavePairVaild(['2', '--qty']), false);
    assert.equal(isSavePairVaild(['222', '--empId']), false);
    assert.equal(isSavePairVaild(['--qty', '1.1']), false);
    assert.equal(isSavePairVaild(['--qty', '1dd']), false);
    assert.equal(isSavePairVaild(['--empId', '1.1']), false);
    assert.equal(isSavePairVaild(['--empId', '1fghj']), false);
    assert.equal(isSavePairVaild(['beverage', 'satheesh']), false);
    assert.equal(isSavePairVaild(['qty', '1']), false);
    assert.equal(isSavePairVaild(['empId', '111']), false);
  });
});

describe('isQueryPairVaild', function() {
  it('should return true for valid pairs', function() {
    assert.equal(isQueryPairVaild(['--beverage', 'satheesh']), true);
    assert.equal(isQueryPairVaild(['--date', '2019-12-12']), true);
    assert.equal(isQueryPairVaild(['--empId', '111']), true);
  });
  it('should return false for invalid pairs', function() {
    assert.equal(isQueryPairVaild(['satheesh', '--beverage']), false);
    assert.equal(isQueryPairVaild(['2019-12-12', '--date']), false);
    assert.equal(isQueryPairVaild(['222', '--empId']), false);
    assert.equal(isQueryPairVaild(['--date', '2019/12/12']), false);
    assert.equal(isQueryPairVaild(['--date', '1dd']), false);
    assert.equal(isQueryPairVaild(['--empId', '1.1']), false);
    assert.equal(isQueryPairVaild(['--empId', '1fghj']), false);
    assert.equal(isQueryPairVaild(['beverage', 'satheesh']), false);
    assert.equal(isQueryPairVaild(['date', '2019-12-12']), false);
    assert.equal(isQueryPairVaild(['empId', '111']), false);
  });
});

describe('isSaveOptionsValid', function() {
  it('should return true for valid options', function() {
    let options = ['--beverage', 'orange', '--qty', '2', '--empId', '111'];
    assert.equal(isSaveOptionsValid(options), true);
  });
  it('should return false for invalid options', function() {
    let options = ['--beverage', 'orange', '--qty', '2.2', '--empId', '111'];
    assert.equal(isSaveOptionsValid(options), false);
    options = ['--beverage', 'orange', '--qty', '22', '--empId', '111dsf'];
    assert.equal(isSaveOptionsValid(options), false);
    options = ['--beverage', 'orange', '--qty', '22', 'empId', '111'];
    assert.equal(isSaveOptionsValid(options), false);
  });
});

describe('isQueryOptionsValid', function() {
  it('should return true for valid options', function() {
    let options = ['--beverage', 'orange', '--empId', '111'];
    assert.equal(isQueryOptionsValid(options), true);
    options = [
      '--beverage',
      'orange',
      '--empId',
      '111',
      '--date',
      '2019-12-12'
    ];
    assert.equal(isQueryOptionsValid(options), true);
  });
  it('should return false for invalid options', function() {
    let options = ['--beverage', 'orange', '--empId', '111ads'];
    assert.equal(isQueryOptionsValid(options), false);
    options = ['--beverage', 'orange', '--date', '22', '--empId', '111dsf'];
    assert.equal(isQueryOptionsValid(options), false);
    options = ['--beverage', 'orange', '--date', '2019-12-12', 'empId', '111'];
    assert.equal(isQueryOptionsValid(options), false);
  });
});
