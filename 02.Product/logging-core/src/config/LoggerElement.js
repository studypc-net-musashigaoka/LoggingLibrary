// @ts-check

import { Level } from '../core/Level.js';
import { AppenderElement } from './AppenderElement.js';

export class LoggerElement {
  name;
  level;
  /**@type{AppenderElement[]?}*/appenders;
  constructor(/**@type{string}*/name, /**@type{Level}*/level) {
    if (name != undefined && typeof name !== 'string') throw new TypeError('name is not string');
    if (!(level instanceof Level)) throw new TypeError('level is not Level');
    this.name = name;
    this.level = level;
  }
  static assign(/**@type{Record<string,any>}*/obj) {
    if (!obj) return null;
    try {
      const element = new LoggerElement(obj.name, obj.level);
      if (Array.isArray(obj.appenders)) {
        element.appenders = obj.appenders.values().map(v => AppenderElement.assign(v)).filter(v => v != null).toArray();
      }
      return element;
    } catch {
      return null;
    }
  }
}
