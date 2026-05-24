// @ts-check

import { NullLogger } from "../logger/NullLogger.js";
import { ILoggerBuilder } from "./ILoggerBuilder.js";

/** 何もしないロガー生成器*/
export class NullLoggerBuilder extends ILoggerBuilder() {
  static #instance = new NullLoggerBuilder();
  static get instance() { return this.#instance; }
  /**@override*/
  build(/**@type{string}*/name) { return NullLogger.instance; void name; }
}
