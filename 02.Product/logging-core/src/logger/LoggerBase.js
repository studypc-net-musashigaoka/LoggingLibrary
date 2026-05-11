// @ts-check

import { ILogManager } from "../core/ILogManager.js";
import { Level } from "../core/Level.js";
import { empty, ILogger } from "../ILogger.js";

export const settings = { ttl: 1000 };

export class LoggerBase extends ILogger {
  _logManager;
  _name;
  #cacheExpires = -1;
  #cacheEffectiveLevel = Level.off;
  // これをオーバーライドする
  get _verbose  () { return this._trace    ; }
  get _trace    () { return this._debug    ; }
  get _debug    () { return this._info     ; }
  get _info     () { return this._notice   ; }
  get _notice   () { return this._warn     ; }
  get _warn     () { return this._error    ; }
  get _error    () { return this._severe   ; }
  get _severe   () { return this._critical ; }
  get _critical () { return this._alert    ; }
  get _alert    () { return this._fatal    ; }
  get _fatal    () { return this._emergency; }
  get _emergency() { return empty; }
  // interface実装：外部から呼出す用
  get verbose  () { return this.isVerboseEnabled  () ? this._verbose   : empty; }
  get trace    () { return this.isTraceEnabled    () ? this._trace     : empty; }
  get debug    () { return this.isDebugEnabled    () ? this._debug     : empty; }
  get info     () { return this.isInfoEnabled     () ? this._info      : empty; }
  get notice   () { return this.isNoticeEnabled   () ? this._notice    : empty; }
  get warn     () { return this.isWarnEnabled     () ? this._warn      : empty; }
  get error    () { return this.isErrorEnabled    () ? this._error     : empty; }
  get severe   () { return this.isSevereEnabled   () ? this._severe    : empty; }
  get critical () { return this.isCriticalEnabled () ? this._critical  : empty; }
  get alert    () { return this.isAlertEnabled    () ? this._alert     : empty; }
  get fatal    () { return this.isFatalEnabled    () ? this._fatal     : empty; }
  get emergency() { return this.isEmergencyEnabled() ? this._emergency : empty; }
  constructor(/**@type{ILogManager}*/logManager, /**@type{string}*/name) {
    super();
    if (!logManager) throw new TypeError(`logManager is ${logManager}`);
    this._logManager = logManager;
    this._name = name;
  }

  isEnabledFor(/**@type{Level}*/level) {
    const now = Date.now();
    if (this.#cacheExpires < now) {
      this.#cacheExpires = now + settings.ttl;
      this.#cacheEffectiveLevel = this._logManager.getEffectiveLevelOrDefault(this._name);
    }
    return this.#cacheEffectiveLevel <= level;
  }
}
