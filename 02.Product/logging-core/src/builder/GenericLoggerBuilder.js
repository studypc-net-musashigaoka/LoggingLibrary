// @ts-check

import { ILogger } from "../ILogger.js";
import { ILoggerBuilder } from "./ILoggerBuilder.js";

/** オーバーロードタイプ
 * @typedef {new (name: string) => InstanceType<ReturnType<typeof ILogger>>} LoggerClass
 * @typedef {    (name: string) => InstanceType<ReturnType<typeof ILogger>>} LoggerFn
 */

/** 任意のロガー生成ロジックを登録できるロガー生成器 */
export class GenericLoggerBuilder extends ILoggerBuilder() {
  /**@type{LoggerClass|null}*/#class;
  /**@type{LoggerFn}*/#fn;
  constructor(/**@type{LoggerClass|LoggerFn}*/generic) {
    super();
    if (!generic) throw new TypeError(`generic is ${generic}`);
    // コンストラクタ、bindされたもの、関数宣言、アロー関数など多岐に渡るので
    // 後で実行してエラーになるかどうかで判断する
    // @ts-ignore
    this.#class = this.#fn = generic;
    //#fnは常に入れっぱなしにする
    //if (generic.prototype?.constructor !== generic) {
    //  this.#fn = null;
    //}
  }
  build(/**@type{string}*/name) {
    if (this.#class) {
      try {
        return new this.#class(name);
      } catch (e) {
        if (e?.constructor === TypeError) {
          this.#class = null;
        } else {
          throw e;
        }
      }
    }
    return this.#fn(name); 
  }
}
