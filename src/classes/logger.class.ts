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

  constructor(name: string) {
    this.name = name;
  }
}
