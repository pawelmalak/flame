export const createFsSafeTimestamp = (): string => new Date().toISOString().replace(/[:.]/g, '-');
