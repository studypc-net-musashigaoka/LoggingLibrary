// @ts-check

import { ILogger } from "./ILogger.js";

/** ロガー提供 */
export class ILoggerFactory {
  /**@returns{ILogger}*/
  createLogger(/**@type{string}*/name, /**@type{boolean}*/volatile = false) { throw new Error('オーバーライド必須'); }
}
