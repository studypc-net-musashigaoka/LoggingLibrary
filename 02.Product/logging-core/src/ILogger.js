// @ts-check

import { Level } from "./core/Level.js";

const mark = Symbol('ILogger');
/**@type {(...data:any[])=>void}*/
export const empty = () => { };

/** ログ出力インターフェース */
export const ILogger = (/**@type{(new(...args:any[])=>any)|undefined}*/Base = undefined) => {
  return class ILogger extends (Base ?? Object) {
    constructor(/**@type{any[]}*/...args) {
      super(...args);
      Object.defineProperty(this, mark, {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false,
      });
    }
    get verbose  () { return empty; }
    get trace    () { return empty; }
    get debug    () { return empty; }
    get info     () { return empty; }
    get notice   () { return empty; }
    get warn     () { return empty; }
    get error    () { return empty; }
    get severe   () { return empty; }
    get critical () { return empty; }
    get alert    () { return empty; }
    get fatal    () { return empty; }
    get emergency() { return empty; }
    // isEnabledForだけオーバーライドする
    isEnabledFor(/**@type{Level}*/level) { return false; }
    isVerboseEnabled  () { return this.isEnabledFor(Level.verbose  ); }
    isTraceEnabled    () { return this.isEnabledFor(Level.trace    ); }
    isDebugEnabled    () { return this.isEnabledFor(Level.debug    ); }
    isInfoEnabled     () { return this.isEnabledFor(Level.info     ); }
    isNoticeEnabled   () { return this.isEnabledFor(Level.notice   ); }
    isWarnEnabled     () { return this.isEnabledFor(Level.warn     ); }
    isErrorEnabled    () { return this.isEnabledFor(Level.error    ); }
    isSevereEnabled   () { return this.isEnabledFor(Level.severe   ); }
    isCriticalEnabled () { return this.isEnabledFor(Level.critical ); }
    isAlertEnabled    () { return this.isEnabledFor(Level.alert    ); }
    isFatalEnabled    () { return this.isEnabledFor(Level.fatal    ); }
    isEmergencyEnabled() { return this.isEnabledFor(Level.emergency); }
  };
};
Object.defineProperty(ILogger, Symbol.hasInstance, {
  value: (/**@type{any}*/instance) => instance && typeof instance === 'object' && mark in instance
});
