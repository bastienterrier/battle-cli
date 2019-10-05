import { copyProperties } from '../../src/helpers/utils';

describe('Utils', () => {
  test('copyProperties - simple object', () => {
    const target = {};
    const src  = {
      prop1: 'val1',
      prop2: 'val2',
    };
    copyProperties(src, target);
    expect(target).toEqual(src);
  });
  test('copyProperties - nested object', () => {
    const target = {};
    const src  = {
      prop1: {
        val1: 'val1',
      },
      prop2: 'val2',
    };
    copyProperties(src, target);
    expect(target).toEqual({prop2: 'val2'});
  });
});
