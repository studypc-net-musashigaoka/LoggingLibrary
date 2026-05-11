// @ts-check

import { ILoggerBuilder } from "../builder/ILoggerBuilder.js";
import { NullLoggerBuilder } from "../builder/NullLoggerBuilder.js";
import { ILogger } from "../ILogger.js";
import { ILoggerFactory } from "../ILoggerFactory.js";

export class LoggerFactory extends ILoggerFactory {
  /**@type{ILoggerBuilder}*/#defaultBuilder;;
  /**@type{Map<string,ILoggerBuilder>}*/#cacheBuilder = new Map();
  /**@type{Map<string,ILogger>}*/#cacheLogger = new Map();
  constructor(/**@type{ILoggerBuilder|undefined}*/loggerBuilder = undefined) {
    super();
    this.#defaultBuilder = loggerBuilder ?? NullLoggerBuilder.instance;
  }
  set(/**@type{string}*/name, /**@type{ILoggerBuilder}*/loggerBuilder) {
    if (!loggerBuilder) throw new TypeError(`loggerBuilder is ${loggerBuilder}`);
    this.#cacheBuilder.set(name, loggerBuilder);
    this.#cacheLogger.delete(name);
  }

  createLogger(/**@type{string}*/name, /**@type{boolean}*/volatile = false) {
    if (volatile) return this.#build(name);
    let logger = this.#cacheLogger.get(name);
    if (!logger) {
      logger = this.#build(name);
      this.#cacheLogger.set(name, logger);
    }
    return logger;
  }
  #build(/**@type{string}*/name) {
    const builder = this.#cacheBuilder.get(name) ?? this.#defaultBuilder;
    const logger = builder.build(name);
    return logger;
  }
}
