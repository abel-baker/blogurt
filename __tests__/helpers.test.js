const { format_date, format_plural } = require('../utils/helpers');

test('format-date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(format_date(date)).toBe('3/20/2020');
})

test('format-plural() returns a formatted plural', () => {
  expect(format_plural("Tiger", 2)).toBe("Tigers");
  expect(format_plural("Lion", 1)).toBe("Lion");
})