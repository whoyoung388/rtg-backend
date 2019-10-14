const { isNumber, isInteger } = require('../src/utils')

//
// Unittest for isNumber
//
test('"abc" is not a number', () => {
    input = 'abc';
    expect(isNumber(input)).toBe(false);
})

test('Empty string is not a number', () => {
    input = '';
    expect(isNumber(input)).toBe(false);
})

test('Integer 5 is a number', () => {
    input = '5';
    expect(isNumber(input)).toBe(true);
})

test('Float 5.6 is a number', () => {
    input = '5.6';
    expect(isNumber(input)).toBe(true);
})

//
// Unittest for isInteger
//
test('Float 5.6 is not an integer', () => {
    input = '5.6';
    expect(isInteger(input)).toBe(false);
})

test('Float 5.0 is not an integer', () => {
    input = '5.0';
    expect(isInteger(input)).toBe(false);
})

test('Infinity is not an integer', () => {
    input = Infinity;
    expect(isInteger(input)).toBe(false);
})

test('Integer 5 is an integer', () => {
    input = '5';
    expect(isInteger(input)).toBe(true);
})

test('Integer 0 is an integer', () => {
    input = '0';
    expect(isInteger(input)).toBe(true);
})

