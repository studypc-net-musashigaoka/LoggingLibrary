// @ts-check

import { ILogger } from "../ILogger.js";

/** ロガー生成器*/
export class ILoggerBuilder {
  /**@returns{ILogger}*/
  build(/**@type{string}*/name) { throw new Error('オーバーライド必須'); }
}
