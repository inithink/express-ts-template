import pino, {LoggerOptions} from 'pino';

const PinoLevelToSeverityLookup = {
  trace: 'TRACE',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
  fatal: 'FATAL',
};

const pinoOption: LoggerOptions = {
  messageKey: 'message',
  formatters: {
    level(label, number) {
      return {
        severity:
        // @ts-ignore
          PinoLevelToSeverityLookup[label] || PinoLevelToSeverityLookup['info'],
        level: number,
      };
    },
  },
};

export let logger: Logger;

if (process.env.NODE_ENV === 'production') {
  logger = pino({
    ...pinoOption,
    level: 'info',
  });
} else {
  logger = pino(
    {
      ...pinoOption,
      level: 'debug',
    },
    require('pino-pretty')({
      sync: true,
      messageKey: 'message',
      levelKey: 'severity',
    }),
  );
}

export interface Logger {
  fatal: LogFn;
  error: LogFn;
  warn: LogFn;
  info: LogFn;
  debug: LogFn;
  trace: LogFn;
}

interface LogFn {
  <T extends object>(obj: T, msg?: string, ...args: any[]): void;

  (obj: unknown, msg?: string, ...args: any[]): void;

  (msg: string, ...args: any[]): void;
}
