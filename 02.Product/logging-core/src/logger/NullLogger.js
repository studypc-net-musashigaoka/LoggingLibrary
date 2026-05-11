// @ts-check

import { ILogger } from "../ILogger.js";

/** 何もしないロガー */
export class NullLogger extends ILogger {
  static #instance = new NullLogger();
  static get instance() { return this.#instance }
}
