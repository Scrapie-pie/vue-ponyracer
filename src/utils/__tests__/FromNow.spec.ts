import { describe, expect, test } from 'vitest';
import fromNow from '@/utils/FromNow';

describe('FromNow', () => {
  test('should transform a date', () => {
    const date = '2020-02-18T08:02:00Z';
    const transformed = fromNow(date, 'en');

    // The utils should transform the date into a human string, using the `date-fns` library
    expect(transformed).toContain('ago');

    const transformedInFrench = fromNow(date, 'fr');
    expect(transformedInFrench).toContain('il y a');
  });
});
