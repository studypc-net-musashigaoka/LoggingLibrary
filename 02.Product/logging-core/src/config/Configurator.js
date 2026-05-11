// @ts-check

import { GenericLoggerBuilder } from "../builder/GenericLoggerBuilder.js";
import { LoggerFactory } from "../core/LoggerFactory.js";
import { LogManager } from "../core/LogManager.js";
import { ILoggerFactory } from "../ILoggerFactory.js";
import { MultiLogger } from "../logger/MultiLogger.js";
import { AppenderElement } from "./AppenderElement.js";
import { LoggerElement } from "./LoggerElement.js";

export class Configurator {
  #logManager = new LogManager();
  get logManager() { return this.#logManager; }
  /**@type{LoggerElement?}*/root = null;
  /**@type{LoggerElement[]?}*/loggers = null;
  /**@type{number?}*/ttl = null;
  static assign(/**@type{Record<string,any>}*/obj) {
    if (!obj) throw new TypeError(`obj is ${obj}`);
    const config = new Configurator();
    if (obj.root != null && typeof obj.root === 'object') { // チェックは必須ではない
      config.root = LoggerElement.assign({ ...obj.root, name: '' });
      if (config.root) config.logManager.defaultEffectiveLevel = config.root.level;
    }
    if (Array.isArray(obj.loggers)) {
      config.loggers = obj.loggers/*.values()*/.map(v => LoggerElement.assign(v)).filter(v => v != null)/*.toArray()*/;
      for (const logger of config.loggers) config.logManager.setEffectiveLevel(logger.name, logger.level);
    }
    if (typeof obj.ttl === 'number') {
      config.ttl = obj.ttl;
    }
    return config;
  }
  /**ロガー提供インターフェースを作成します @returns{ILoggerFactory}*/
  create() {
    const rootBuilder = this.#create(this.root?.appenders);
    const factory = new LoggerFactory(rootBuilder ? new GenericLoggerBuilder(rootBuilder) : undefined);
    // 作成中
    for (const logger of this.loggers??[]) {
      const builder = this.#create(logger.appenders);
      if (builder) factory.set(logger.name, new GenericLoggerBuilder(builder));
    }
    return factory;
  }

  #create(/**@type{AppenderElement[]|null|undefined}*/appenders) {
    if (!appenders || appenders.length === 0) return null;
    if (appenders.length === 1) return appenders[0]?.builder.bind(null, this.logManager);
    const constructors = appenders.map(v => v.builder)/*.filter(v => v)*/;
    return MultiLogger.bind(null, constructors, this.logManager);
  }
}
