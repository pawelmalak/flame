import { authLog } from './logger';

export type AuthEnvCheckResult = { success: true } | { success: false; reason: 'missing-password' };

export const checkAuthEnv = (): AuthEnvCheckResult => {
  if (process.env.AUTH_DISABLED === 'true') {
    return { success: true };
  }

  if (!process.env.PASSWORD) {
    return { success: false, reason: 'missing-password' };
  }

  return { success: true };
};

export const enforceAuthEnv = (): void => {
  const envCheckResult = checkAuthEnv();

  if (envCheckResult.success) {
    return;
  }

  authLog.fatal(
    { reason: envCheckResult.reason },
    'PASSWORD env required when auth enabled - set PASSWORD or AUTH_DISABLED=true to start the server',
  );

  process.exit(1);
};
