// @ts-check

import { ILogManager } from "../core/ILogManager.js";
import { LoggerBase } from "./LoggerBase.js";

/** 複数のロガーを代理で呼び出すロガー */
export class MultiLogger extends LoggerBase {
  /**@type{LoggerBase[]}*/#loggers;
  /**@type{(...data:any[])=>void}*/#verbose  ;
  /**@type{(...data:any[])=>void}*/#trace    ;
  /**@type{(...data:any[])=>void}*/#debug    ;
  /**@type{(...data:any[])=>void}*/#info     ;
  /**@type{(...data:any[])=>void}*/#notice   ;
  /**@type{(...data:any[])=>void}*/#warn     ;
  /**@type{(...data:any[])=>void}*/#error    ;
  /**@type{(...data:any[])=>void}*/#severe   ;
  /**@type{(...data:any[])=>void}*/#critical ;
  /**@type{(...data:any[])=>void}*/#alert    ;
  /**@type{(...data:any[])=>void}*/#fatal    ;
  /**@type{(...data:any[])=>void}*/#emergency;
  get _verbose  () { return this.#verbose   ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._verbose  (...data); }; }
  get _trace    () { return this.#trace     ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._trace    (...data); }; }
  get _debug    () { return this.#debug     ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._debug    (...data); }; }
  get _info     () { return this.#info      ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._info     (...data); }; }
  get _notice   () { return this.#notice    ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._notice   (...data); }; }
  get _warn     () { return this.#warn      ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._warn     (...data); }; }
  get _error    () { return this.#error     ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._error    (...data); }; }
  get _severe   () { return this.#severe    ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._severe   (...data); }; }
  get _critical () { return this.#critical  ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._critical (...data); }; }
  get _alert    () { return this.#alert     ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._alert    (...data); }; }
  get _fatal    () { return this.#fatal     ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._fatal    (...data); }; }
  get _emergency() { return this.#emergency ??= (/**@type{any[]}*/...data) => { for (const logger of this.#loggers) logger._emergency(...data); }; }
  constructor(/**@type{(new(logManager:ILogManager,name:string)=>LoggerBase)[]}*/constructors, /**@type{ILogManager}*/logManager, /**@type{string}*/name) {
    super(logManager, name);
    if (!constructors) throw new TypeError(`constructors is ${constructors}`);
    this.#loggers = constructors/*.filter(v => v)*/.map(v => new v(logManager, name));
  }
}
