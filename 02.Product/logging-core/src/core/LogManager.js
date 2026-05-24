// @ts-check

import { ILogManager } from "./ILogManager.js";
import { Level } from "./Level.js";

export class LogManager extends ILogManager() {
  #defaultEffectiveLevel = Level.info;
  /**@override*/
  get defaultEffectiveLevel() { return this.#defaultEffectiveLevel; }
  /**@override*/
  set defaultEffectiveLevel(value) { this.#defaultEffectiveLevel = value; }

  /**@override*/
  getEffectiveLevel(/**@type{string}*/name) {
    return this.#mapEffectiveLevel.get(name);
  }
  /**@override*/
  isEnabledFor(/**@type{string}*/name, /**@type{Level}*/level) {
    return this.getEffectiveLevelOrDefault(name) <= level;
  }

  /**@type{Map<string,Level>}*/#mapEffectiveLevel = new Map();
  setEffectiveLevel(/**@type{string}*/name, /**@type{Level}*/level) {
    if (level) {
      this.#mapEffectiveLevel.set(name ?? '', level);
    } else {
      this.deleteEffectiveLevel(name);
    }
  }
  deleteEffectiveLevel(/**@type{string}*/name) {
    this.#mapEffectiveLevel.delete(name ?? '');
  }
  clearEffectiveLevel() {
    this.#mapEffectiveLevel.clear();
  }
}
