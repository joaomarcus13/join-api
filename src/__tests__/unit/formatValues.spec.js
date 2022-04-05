import { jest, expect, test, describe } from '@jest/globals';
import * as fn from '../../util/formatValues.js';

describe('format functions', () => {
  it('should return a string with the currency format', () => {
    expect(fn.formatCurrency('1234567.89')).toMatch('R$ 1.234.567,89');
  });

  it('should remove spaces and invalids characters and add "and" if word is not in quote', () => {
    expect(fn.prepareText('"text    "')).toMatch('text');
    expect(fn.prepareText('text text2 ')).toMatch('text and text2');
    expect(fn.prepareText('text %@# text2 tex@t')).toMatch('text and text2');
    expect(fn.prepareText('text   text2 ')).toMatch('text and text2');
    expect(fn.prepareText('"text   text2 ')).toMatch('text and text2');
    expect(fn.prepareText(null)).toBeUndefined();
  });

  it('should to replace single quote by double quote', () => {
    expect(fn.handleQuote('"text"')).toMatch('text');
    expect(fn.handleQuote("'text'")).toMatch('text');
    expect(fn.handleQuote("text'")).toMatch('text');
  });
});
