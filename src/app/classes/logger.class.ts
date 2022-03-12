export class Logger {

  name = '';

  log(...args: unknown[]) {
    console.log(`[${this.name}] `, ...args);
  }

  warn(...args: unknown[]) {
    console.warn(`[${this.name}] `, ...args);
  }

  error(...args: unknown[]) {
    console.error(`[${this.name}] `, ...args);
  }

  /**
   * Constructor Function
   * @param name Example-Dash-Camel
   */
  constructor(name: string) {
    this.name = name;
  }
}
