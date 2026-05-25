export const register = async (): Promise<void> => {
  if (process.env.NEXT_RUNTIME !== 'nodejs') {
    return;
  }

  const { initDatabase } = await import('./db/init');

  await initDatabase();
};
