// @ts-check

import { Level } from './Level.js';

/** ロガー名と出力レベルの管理 */
export class ILogManager {
  get defaultEffectiveLevel() { return Level.off; }
  /**@returns{Level|undefined}*/
  getEffectiveLevel(/**@type{string}*/name) { return undefined; }
  getEffectiveLevelOrDefault(/**@type{string}*/name) { return this.getEffectiveLevel(name) ?? this.defaultEffectiveLevel }
  isEnabledFor(/**@type{string}*/name, /**@type{Level}*/level) { return false; }
}
