/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logger: Logger;

  constructor() {
    super();
    const { combine, timestamp, metadata, printf } = format;
    this.logger = createLogger({
      format: combine(
        timestamp(),
        metadata(),
        printf((data) => {
          const { correlationId, timestamp, ...meta } = data.metadata;
          return `[${data.level}] - [${timestamp}] - [${correlationId || ''}] ${
            data.message
          } ${JSON.stringify(meta, null, 2)}`;
        }),
      ),
      transports: [
        new transports.Console({ level: 'debug' }),
        new transports.File({
          filename: 'public/logs/rtc_logs.log',
          level: 'debug',
        }),
      ],
    });
  }

  set setCorrelationId(correlationId: string) {
    this.logger.defaultMeta = {
      ...this.logger.defaultMeta,
      correlationId,
    };
  }

  get getCorrelationId(): string {
    return this.logger.defaultMeta.correlationId;
  }

  log(message: string, ...meta: any[]) {
    this.logger.info(message, ...meta);
  }

  warn(message: string, ...meta: any[]) {
    this.logger.warn(message, ...meta);
  }

  error(message: string, ...meta: any[]) {
    this.logger.error(message, ...meta);
  }

  debug(message: string, ...meta: any[]) {
    this.logger.debug(message, ...meta);
  }
}
