import pino from 'pino';

export const logger = pino({
  enabled: process.env.LOG_DISABLED !== 'false',
  transport: {
    target: 'pino-pretty',
    options: {
      colorized: true,
    },
  },
});
