export class BaseError extends Error {
  constructor(message?: string, caused?: Error) {
    super(message);
    this.name = this.constructor.name;
    if (caused && caused.stack) {
      this.stack += caused.message + '\n' + caused.stack;
    }
  }
}
