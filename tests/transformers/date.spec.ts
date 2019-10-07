import { humanizeDate } from '../../src/transformers/date';

describe('Transformers', () => {
  test('humanizeDate', () => {
    const date = new Date(1570448193286);
    expect(humanizeDate(date)).toEqual('7/10/2019 à 13h36m33s');
  });
});
