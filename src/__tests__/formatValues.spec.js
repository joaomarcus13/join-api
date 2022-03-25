import { jest, expect, test, describe } from '@jest/globals';
import { formatCurrency } from '../util/formatValues.js';

describe('format functions', () => {
  it('should return a string with the currency format', () => {
    expect(formatCurrency('1234567.89')).toMatch('R$ 1.234.567,89');
  });
});
