// @ts-check

import { ILogManager } from "../core/ILogManager.js";
import { ConsoleLogger } from "../logger/ConsoleLogger.js";
import { LoggerBase } from "../logger/LoggerBase.js";

/**@type{Map<string,new(logManager:InstanceType<ReturnType<typeof ILogManager>>,name:string)=>LoggerBase>}*/
const map = new Map();
map.set('Console', ConsoleLogger);

export class AppenderElement {
  type;
  #builder;
  get builder() { return this.#builder; }
  constructor(/**@type{string}*/type) {
    if (!map.has(type)) throw new TypeError(`type(${type}) is unknown`);
    const builder = map.get(type);
    if (!builder) throw new TypeError(`type(${type}) is unknown`);
    this.type = type;
    this.#builder = builder;
  }
  static assign(/**@type{Record<string,any>}*/obj) {
    if (!obj) return null;
    try {
      const element = new AppenderElement(obj.type);
      return element;
    } catch {
      return null;
    }
  }
}

export function setCustomAppender(/**@type{string}*/type, /**@type{new(logManager:InstanceType<ReturnType<typeof ILogManager>>,name:string)=>LoggerBase}*/constructor) {
  if (!type) throw new TypeError(`type is ${type}`);
  if (!constructor) throw new TypeError(`constructor is ${constructor}`);
  map.set(type, constructor);
}
