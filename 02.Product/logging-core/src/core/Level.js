// @ts-check

/** ログレベル */
export class Level {
  #level;
  get value() { return this.#level; }
  valueOf() { return this.#level; }
  constructor(/**@type{number}*/level) {
    if (level == null) throw new TypeError(`level is ${level}`);
    if (level < 0) {
      this.#level = 0;
    } else if (255 < level) {
      this.#level = 255;
    } else {
      this.#level = level;
    }
  }

  /**@type{Level}*/static #all      ;
  /**@type{Level}*/static #verbose  ;
  /**@type{Level}*/static #trace    ;
  /**@type{Level}*/static #debug    ;
  /**@type{Level}*/static #info     ;
  /**@type{Level}*/static #notice   ;
  /**@type{Level}*/static #warn     ;
  /**@type{Level}*/static #error    ;
  /**@type{Level}*/static #severe   ;
  /**@type{Level}*/static #critical ;
  /**@type{Level}*/static #alert    ;
  /**@type{Level}*/static #fatal    ;
  /**@type{Level}*/static #emergency;
  /**@type{Level}*/static #off      ;

  static get all      () { return this.#all       ??= new Level(  0); }
  static get verbose  () { return this.#verbose   ??= new Level( 10); }
  static get trace    () { return this.#trace     ??= new Level( 20); }
  static get debug    () { return this.#debug     ??= new Level( 30); }
  static get info     () { return this.#info      ??= new Level( 40); }
  static get notice   () { return this.#notice    ??= new Level( 50); }
  static get warn     () { return this.#warn      ??= new Level( 60); }
  static get error    () { return this.#error     ??= new Level( 70); }
  static get severe   () { return this.#severe    ??= new Level( 80); }
  static get critical () { return this.#critical  ??= new Level( 90); }
  static get alert    () { return this.#alert     ??= new Level(100); }
  static get fatal    () { return this.#fatal     ??= new Level(110); }
  static get emergency() { return this.#emergency ??= new Level(120); }
  static get off      () { return this.#off       ??= new Level(255); }

  static getLevel(/**@type{string}*/name) {
    switch (name?.toLowerCase()) {
      case 'all'      : return this.all      ;
      case 'verbose'  : return this.verbose  ;
      case 'trace'    : return this.trace    ;
      case 'debug'    : return this.debug    ;
      case 'info'     : return this.info     ;
      case 'notice'   : return this.notice   ;
      case 'warn'     : return this.warn     ;
      case 'error'    : return this.error    ;
      case 'severe'   : return this.severe   ;
      case 'critical' : return this.critical ;
      case 'alert'    : return this.alert    ;
      case 'fatal'    : return this.fatal    ;
      case 'emergency': return this.emergency;
      case 'off'      : return this.off      ;
      default: return null;
    }
  }
  static getName(/**@type{Level|number}*/level) {
    const val = level instanceof Level ? level.value : level;
    switch (val) {
      case   0: return 'all'      ;
      case  10: return 'verbose'  ;
      case  20: return 'trace'    ;
      case  30: return 'debug'    ;
      case  40: return 'info'     ;
      case  50: return 'notice'   ;
      case  60: return 'warn'     ;
      case  70: return 'error'    ;
      case  80: return 'severe'   ;
      case  90: return 'critical' ;
      case 100: return 'alert'    ;
      case 110: return 'fatal'    ;
      case 120: return 'emergency';
      case 255: return 'off'      ;
      default: return null;
    }
  }
}
