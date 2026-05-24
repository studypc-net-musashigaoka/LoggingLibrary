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

  /** @override */get _verbose  () { return ConsoleLogger.#debug; }
  /** @override */get _trace    () { return ConsoleLogger.#debug; }
  /** @override */get _debug    () { return ConsoleLogger.#debug; }
  /** @override */get _info     () { return ConsoleLogger.#log  ; }
  /** @override */get _notice   () { return ConsoleLogger.#info ; }
  /** @override */get _warn     () { return ConsoleLogger.#warn ; }
  /** @override */get _error    () { return ConsoleLogger.#error; }
  /** @override */get _severe   () { return ConsoleLogger.#error; }
  /** @override */get _critical () { return ConsoleLogger.#error; }
  /** @override */get _alert    () { return ConsoleLogger.#error; }
  /** @override */get _fatal    () { return ConsoleLogger.#error; }
  /** @override */get _emergency() { return ConsoleLogger.#error; }

  constructor(/**@type{InstanceType<ReturnType<typeof ILogManager>>}*/logManager, /**@type{string}*/name) {
    super(logManager, name);
  }
}
