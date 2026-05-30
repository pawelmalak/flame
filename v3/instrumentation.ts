export const register = async (): Promise<void> => {
  if (process.env.NEXT_RUNTIME !== 'nodejs') {
    return;
  }

  const { registerNode } = await import('./instrumentation-node');

  await registerNode();
};
