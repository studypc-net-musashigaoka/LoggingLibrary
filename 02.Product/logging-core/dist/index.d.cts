/** ログレベル */
declare class Level {
    /**@type{Level}*/ static #all: Level;
    /**@type{Level}*/ static #verbose: Level;
    /**@type{Level}*/ static #trace: Level;
    /**@type{Level}*/ static #debug: Level;
    /**@type{Level}*/ static #info: Level;
    /**@type{Level}*/ static #notice: Level;
    /**@type{Level}*/ static #warn: Level;
    /**@type{Level}*/ static #error: Level;
    /**@type{Level}*/ static #severe: Level;
    /**@type{Level}*/ static #critical: Level;
    /**@type{Level}*/ static #alert: Level;
    /**@type{Level}*/ static #fatal: Level;
    /**@type{Level}*/ static #emergency: Level;
    /**@type{Level}*/ static #off: Level;
    static get all(): Level;
    static get verbose(): Level;
    static get trace(): Level;
    static get debug(): Level;
    static get info(): Level;
    static get notice(): Level;
    static get warn(): Level;
    static get error(): Level;
    static get severe(): Level;
    static get critical(): Level;
    static get alert(): Level;
    static get fatal(): Level;
    static get emergency(): Level;
    static get off(): Level;
    static getLevel(name: string): Level | null;
    static getName(level: Level | number): "all" | "verbose" | "trace" | "debug" | "info" | "notice" | "warn" | "error" | "severe" | "critical" | "alert" | "fatal" | "emergency" | "off" | null;
    constructor(level: number);
    get value(): number;
    valueOf(): number;
    #private;
}

declare function empty(...data: any[]): void;
/** ログ出力 */
declare class ILogger {
    get verbose(): (...data: any[]) => void;
    get trace(): (...data: any[]) => void;
    get debug(): (...data: any[]) => void;
    get info(): (...data: any[]) => void;
    get notice(): (...data: any[]) => void;
    get warn(): (...data: any[]) => void;
    get error(): (...data: any[]) => void;
    get severe(): (...data: any[]) => void;
    get critical(): (...data: any[]) => void;
    get alert(): (...data: any[]) => void;
    get fatal(): (...data: any[]) => void;
    get emergency(): (...data: any[]) => void;
    isEnabledFor(level: Level): boolean;
    isVerboseEnabled(): boolean;
    isTraceEnabled(): boolean;
    isDebugEnabled(): boolean;
    isInfoEnabled(): boolean;
    isNoticeEnabled(): boolean;
    isWarnEnabled(): boolean;
    isErrorEnabled(): boolean;
    isSevereEnabled(): boolean;
    isCriticalEnabled(): boolean;
    isAlertEnabled(): boolean;
    isFatalEnabled(): boolean;
    isEmergencyEnabled(): boolean;
}

/** ロガー提供 */
declare class ILoggerFactory {
    /**@returns{ILogger}*/
    createLogger(name: string, volatile?: boolean): ILogger;
}

/** ロガー名と出力レベルの管理 */
declare class ILogManager {
    get defaultEffectiveLevel(): Level;
    /**@returns{Level|undefined}*/
    getEffectiveLevel(name: string): Level | undefined;
    getEffectiveLevelOrDefault(name: string): Level;
    isEnabledFor(name: string, level: Level): boolean;
}

declare namespace settings {
    let ttl: number;
}
declare class LoggerBase extends ILogger {
    constructor(logManager: ILogManager, name: string);
    _logManager: ILogManager;
    _name: string;
    get _verbose(): (...data: any[]) => void;
    get _trace(): (...data: any[]) => void;
    get _debug(): (...data: any[]) => void;
    get _info(): (...data: any[]) => void;
    get _notice(): (...data: any[]) => void;
    get _warn(): (...data: any[]) => void;
    get _error(): (...data: any[]) => void;
    get _severe(): (...data: any[]) => void;
    get _critical(): (...data: any[]) => void;
    get _alert(): (...data: any[]) => void;
    get _fatal(): (...data: any[]) => void;
    get _emergency(): (...data: any[]) => void;
    #private;
}

declare function setCustomAppender(type: string, constructor: new (logManager: ILogManager, name: string) => LoggerBase): void;
declare class AppenderElement {
    static assign(obj: Record<string, any>): AppenderElement | null;
    constructor(type: string);
    type: string;
    get builder(): new (logManager: ILogManager, name: string) => LoggerBase;
    #private;
}

declare class LogManager extends ILogManager {
    set defaultEffectiveLevel(value: Level);
    get defaultEffectiveLevel(): Level;
    setEffectiveLevel(name: string, level: Level): void;
    deleteEffectiveLevel(name: string): void;
    clearEffectiveLevel(): void;
    #private;
}

declare class LoggerElement {
    static assign(obj: Record<string, any>): LoggerElement | null;
    constructor(name: string, level: Level);
    name: string;
    level: Level;
    /**@type{AppenderElement[]?}*/ appenders: AppenderElement[] | null;
}

declare class Configurator {
    static assign(obj: Record<string, any>): Configurator;
    get logManager(): LogManager;
    /**@type{LoggerElement?}*/ root: LoggerElement | null;
    /**@type{LoggerElement[]?}*/ loggers: LoggerElement[] | null;
    /**@type{number?}*/ ttl: number | null;
    /**���K�[�񋟃C���^�[�t�F�[�X���쐬���܂� @returns{ILoggerFactory}*/
    create(): ILoggerFactory;
    #private;
}

export { Configurator, ILogManager, ILogger, ILoggerFactory, LogManager, empty, setCustomAppender, settings };
