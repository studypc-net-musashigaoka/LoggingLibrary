// @ts-check

import { ILogger } from "../ILogger.js";

const mark = Symbol('ILoggerBuilder');

/** ロガー生成器*/
export const ILoggerBuilder = (/**@type{(new(...args:any[])=>any)|undefined}*/Base = undefined) => {
  return class ILoggerBuilder extends (Base ?? Object) {
    constructor(/**@type{any[]}*/...args) {
      super(...args);
      Object.defineProperty(this, mark, {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false,
      });
    }
    /**@returns{InstanceType<ReturnType<typeof ILogger>>}*/
    build(/**@type{string}*/name) { throw new Error('オーバーライド必須'); }
  };
};
Object.defineProperty(ILoggerBuilder, Symbol.hasInstance, {
  value: (/**@type{any}*/instance) => instance && typeof instance === 'object' && mark in instance
});
