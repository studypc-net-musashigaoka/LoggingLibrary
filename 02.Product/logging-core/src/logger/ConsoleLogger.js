// @ts-check

import { ILogManager } from "../core/ILogManager.js";
import { LoggerBase } from "./LoggerBase.js";

/** コンソールへのログ出力を行う */
export class ConsoleLogger extends LoggerBase {
  static #debug = console.debug.bind(console);
  static #log   = console.log  .bind(console);
  static #info  = console.info .bind(console); // logと同等(ブラウザによってはiアイコンが表示される)
  static #warn  = console.warn .bind(console);
  static #error = console.error.bind(console);

  get _verbose  () { return ConsoleLogger.#debug; }
  get _trace    () { return ConsoleLogger.#debug; }
  get _debug    () { return ConsoleLogger.#debug; }
  get _info     () { return ConsoleLogger.#log  ; }
  get _notice   () { return ConsoleLogger.#info ; }
  get _warn     () { return ConsoleLogger.#warn ; }
  get _error    () { return ConsoleLogger.#error; }
  get _severe   () { return ConsoleLogger.#error; }
  get _critical () { return ConsoleLogger.#error; }
  get _alert    () { return ConsoleLogger.#error; }
  get _fatal    () { return ConsoleLogger.#error; }
  get _emergency() { return ConsoleLogger.#error; }

  constructor(/**@type{ILogManager}*/logManager, /**@type{string}*/name) {
    super(logManager, name);
  }
}
