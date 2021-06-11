import deepObjectTransform from './deepObjectTransform';
import getStyleValueFromVarString from './getStyleValueFromVarString';

describe('Util functions', () => {
  it('deepObjectTransform should loop nested object correctly', () => {
    const example = {
      name: {
        firstName: 'jamie',
        lastName: 'doe',
      },
      info: {
        age: 10,
        isBevyEmployee: true,
        pets: ['bongu', 'stitch'],
      },
    };

    const testFn = item => item + 1;

    const expected = {
      name: { firstName: 'jamie1', lastName: 'doe1' },
      info: {
        age: 11,
        isBevyEmployee: 2,
        pets: ['bongu1', 'stitch1'],
      },
    };

    const result = deepObjectTransform(example, testFn);
    expect(result).toEqual(expected);
  });

  it('getValueFromVarString should return corresponding CSS value when variable is givin', () => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: item => {
          if (item === '--theme-palette-primary') {
            return '#AB34EF';
          }
          return 'No matching var';
        },
      }),
    });

    expect(getStyleValueFromVarString('var(--theme-palette-primary)')).toEqual('#AB34EF');
    expect(getStyleValueFromVarString('var(--theme-palette-secondary)')).toEqual('No matching var');
    expect(getStyleValueFromVarString('var(--primary)')).toEqual('No matching var');
    expect(getStyleValueFromVarString('#333333')).toEqual('#333333');
  });
});
