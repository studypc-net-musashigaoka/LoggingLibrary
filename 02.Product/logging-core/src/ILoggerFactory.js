// @ts-check

import { ILogger } from "./ILogger.js";

const mark = Symbol('ILoggerFactory');

/** ロガー提供 */
export const ILoggerFactory = (/**@type{(new(...args:any[])=>any)|undefined}*/Base = undefined) => {
  return class ILoggerFactory extends (Base ?? Object) {
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
    createLogger(/**@type{string}*/name, /**@type{boolean}*/volatile = false) { throw new Error('オーバーライド必須'); }
  };
};
Object.defineProperty(ILoggerFactory, Symbol.hasInstance, {
  value: (/**@type{any}*/instance) => instance && typeof instance === 'object' && mark in instance
});
