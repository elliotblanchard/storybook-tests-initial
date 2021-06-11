import { min, max, email, lower, upper } from './validations';

describe('validations', () => {
  it('will validate for minimum length', () => {
    expect(min(5)[0]('string longer than 5')).toEqual(['string longer than 5', true]);
    expect(min(5)[0]('four')).toEqual(['four', false]);
    expect(min(2)[0]([1, 2, 3])).toEqual([[1, 2, 3], true]);
    expect(min(2)[0]([1])).toEqual([[1], false]);
  });

  it('will provide a message for minimum length', () => {
    expect(min(5)[1]).toMatchSnapshot();
    expect(min(1)[1]).toMatchSnapshot();
  });

  it('will validate for maximum length', () => {
    expect(max(5)[0]('string longer than 5')).toEqual(['string longer than 5', false]);
    expect(max(5)[0]('four')).toEqual(['four', true]);
    expect(max(2)[0]([1, 2, 3])).toEqual([[1, 2, 3], false]);
    expect(max(2)[0]([1])).toEqual([[1], true]);
  });

  it('will provide a message for maximum length', () => {
    expect(max(6)[1]).toMatchSnapshot();
    expect(max(1)[1]).toMatchSnapshot();
  });

  it('will format strings to be uppercase', () => {
    expect(upper()[0]('lower case string')).toEqual(['LOWER CASE STRING', true]);
    expect(upper()[0]('loWer cAse String')).toEqual(['LOWER CASE STRING', true]);
    expect(upper()[0](4)).toEqual([4, false]);
    expect(upper()[0]({})).toEqual([{}, false]);
  });

  it('will show a message when a non-string is passed to upper', () => {
    expect(upper()[1](4)).toMatchSnapshot();
    expect(upper()[1]({})).toMatchSnapshot();
  });

  it('will format strings to be lowercase', () => {
    expect(lower()[0]('UPPER CASE STRING')).toEqual(['upper case string', true]);
    expect(lower()[0]('uPPEr CaSE STRing')).toEqual(['upper case string', true]);
    expect(lower()[0](4)).toEqual([4, false]);
    expect(lower()[0]({})).toEqual([{}, false]);
  });

  it('will show a message when a non-string is passed to lower', () => {
    expect(lower()[1](4)).toMatchSnapshot();
    expect(lower()[1]({})).toMatchSnapshot();
  });

  it('will validate emails', () => {
    const validEmails = [
      'email@example.com',
      'firstname.lastname@example.com',
      'email@subdomain.example.com',
      'firstname+lastname@example.com',
      'email@123.123.123.123',
      '"email"@example.com',
      '1234567890@example.com',
      'email@example-one.com',
      '_______@example.com',
      'email@example.name',
      'email@example.museum',
      'email@example.co.jp',
      'firstname-lastname@example.com',
    ];
    validEmails.forEach(testEmail => expect(email()[0](testEmail)).toEqual([testEmail, true]));
  });

  it('will reject invalid emails', () => {
    const invalidEmails = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      'email@example.com (Joe Smith)',
    ];
    invalidEmails.forEach(testEmail => expect(email()[0](testEmail)).toEqual([testEmail, false]));
  });
});
