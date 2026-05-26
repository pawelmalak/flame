import pino, { type DestinationStream, type Logger, type LoggerOptions } from 'pino';

const REDACT_PATHS = ['password', 'token', 'cookie', 'authorization', 'req.headers.authorization'];

const REDACT_CENSOR = '[REDACTED]';

const getLogLevel = (): string => process.env.LOG_LEVEL || 'info';

const isLogPretty = (): boolean => {
  if (process.env.LOG_PRETTY !== undefined) {
    return process.env.LOG_PRETTY === 'true';
  }

  return process.env.NODE_ENV === 'development';
};

const buildBaseOptions = (): LoggerOptions => ({
  level: getLogLevel(),
  redact: { paths: REDACT_PATHS, censor: REDACT_CENSOR },
});

export const buildLoggerOptions = (): LoggerOptions => {
  const options = buildBaseOptions();

  if (isLogPretty()) {
    options.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:HH:MM:ss.l',
        ignore: 'pid,hostname',
      },
    };
  }

  return options;
};

export const createLogger = (destination?: DestinationStream): Logger => {
  if (destination) {
    return pino(buildBaseOptions(), destination);
  }

  return pino(buildLoggerOptions());
};

type GlobalWithLogger = typeof globalThis & {
  __flameLog?: Logger;
};

const globalRef = globalThis as GlobalWithLogger;

export const log: Logger = globalRef.__flameLog ?? (globalRef.__flameLog = createLogger());

export const authLog = log.child({ domain: 'auth' });
export const dbLog = log.child({ domain: 'db' });
export const configLog = log.child({ domain: 'config' });
export const workspaceLog = log.child({ domain: 'workspace' });
export const appsLog = log.child({ domain: 'apps' });
export const bookmarksLog = log.child({ domain: 'bookmarks' });
export const categoriesLog = log.child({ domain: 'categories' });
export const searchLog = log.child({ domain: 'search' });
export const weatherLog = log.child({ domain: 'weather' });
export const healthLog = log.child({ domain: 'health' });
export const faviconLog = log.child({ domain: 'favicon' });
export const dockerLog = log.child({ domain: 'docker' });
export const k8sLog = log.child({ domain: 'k8s' });
export const versionLog = log.child({ domain: 'version' });
export const migrationLog = log.child({ domain: 'migration' });
export const uploadLog = log.child({ domain: 'upload' });

export type BootBannerContext = {
  version: string;
  port: number | string;
  authMode: 'enabled' | 'disabled';
  nodeEnv: string;
};

export const logBootBanner = (ctx: BootBannerContext): void => {
  log.info(ctx, 'flame starting');
};
