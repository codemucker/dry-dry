import * as chalk from 'chalk';
import * as loglevel from 'loglevel';

/**
 * The Dry Logging Facade
 * Allows to wrap the chosen logging api.
 */
export class Logger {
    private static lvl: loglevel.LogLevelDesc = 'warn';
    private innerLogger: log.Logger;

    /**
     * @param {string} namespace The logger namespace
     */
    private constructor(namespace: string) {
        this.innerLogger = loglevel.getLogger(namespace);
    }

    /**
     * Set the level for all loggers
     * @param {string} namespace The logger level. one of ['error','info','debug','trace']
     */
    public static setLevel(level: string): void {
        Logger.lvl = level as loglevel.LogLevelDesc;
    }

    /**
     * @param {string} namespace The logger namespace
     * @return {Logger} A new logger
     */
    public static getLogger(namespace: string): Logger {
        return new Logger(namespace);
    }

    private logPrefix(){
        const d = new Date()
        const formatNum = (num:number) => {
            if(num < 10){
                return '0' + num
            }
            return num
        }
        return `npm-dry ${formatNum(d.getHours())}${formatNum(d.getMinutes())}:${formatNum(d.getSeconds())}`

    }

    // tslint:disable-next-line: no-any
    public trace(...msg: any[]): void {
        this.innerLogger.setLevel(Logger.lvl);
        this.innerLogger.trace(chalk.default.dim(`${this.logPrefix} [TRACE]: ${msg}`));
    }

    // tslint:disable-next-line: no-any
    public debug(...msg: any[]): void {
        this.innerLogger.setLevel(Logger.lvl);
        this.innerLogger.debug(chalk.default.cyan(`${this.logPrefix} [DEBUG]: ${msg}`));
    }

    // tslint:disable-next-line: no-any
    public info(...msg: any[]): void {
        this.innerLogger.setLevel(Logger.lvl);
        this.innerLogger.info(chalk.default.blue(`${this.logPrefix} [INFO]: ${msg}`));
    }

    // tslint:disable-next-line: no-any
    public warn(...msg: any[]): void {
        this.innerLogger.setLevel(Logger.lvl);
        this.innerLogger.warn(chalk.default.yellow(`${this.logPrefix} [WARN]: ${msg}`));
    }

    // tslint:disable-next-line: no-any
    public error(...msg: any[]): void {
        this.innerLogger.setLevel(Logger.lvl);
        this.innerLogger.error(chalk.default.red(`${this.logPrefix} [ERROR]: ${msg}`));
    }

    public isTraceEnabled(): boolean {
        return this.innerLogger.getLevel() <= loglevel.levels.TRACE;
    }

    public isDebugEnabled(): boolean {
        return this.innerLogger.getLevel() <= loglevel.levels.DEBUG;
    }

    public isInfoEnabled(): boolean {
        return this.innerLogger.getLevel() <= loglevel.levels.INFO;
    }

    public isWarnEnabled(): boolean {
        return this.innerLogger.getLevel() <= loglevel.levels.WARN;
    }

    public isErrorEnabled(): boolean {
        return this.innerLogger.getLevel() <= loglevel.levels.ERROR;
    }
}
