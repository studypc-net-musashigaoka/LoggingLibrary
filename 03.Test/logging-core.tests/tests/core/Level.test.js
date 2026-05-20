// @ts-check

import { Level } from '@src/core/Level.js';

describe('Levelテスト', () => {
  test('インスタンス比較', () => {
    expect(Level.all < Level.off).toBeTruthy();
    expect(new Level(0) === new Level(0)).toBeFalsy(); // インスタンス比較になる
    assertEqual(new Level(0), new Level(0)); // valueOf比較になる

    function assertEqual(/**@type{Level}*/a, /**@type{Level}*/b) {
      expect(a <= b && b <= a).toBeTruthy();
    }
  });
  test('valueOf()比較', () => {
    expect(Level.all.valueOf()).toBeLessThan(Level.off.valueOf());
  });
});
