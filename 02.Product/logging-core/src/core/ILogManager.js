// @ts-check

import { Level } from './Level.js';

const mark = Symbol('ILogManager');

/** ロガー名と出力レベルの管理 */
export const ILogManager = (/**@type{(new(...args:any[])=>any)|undefined}*/Base = undefined) => {
  return class ILogManager extends (Base ?? Object) {
    constructor(/**@type{any[]}*/...args) {
      super(...args);
      Object.defineProperty(this, mark, {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false,
      });
    }
    get defaultEffectiveLevel() { return Level.off; }
    /**@returns{Level|undefined}*/
    getEffectiveLevel(/**@type{string}*/name) { return undefined; }
    getEffectiveLevelOrDefault(/**@type{string}*/name) { return this.getEffectiveLevel(name) ?? this.defaultEffectiveLevel }
    isEnabledFor(/**@type{string}*/name, /**@type{Level}*/level) { return false; }
  };
};
Object.defineProperty(ILogManager, Symbol.hasInstance, {
  value: (/**@type{any}*/instance) => instance && typeof instance === 'object' && mark in instance
});
