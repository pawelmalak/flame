export const getClientIp = (request: Request): string => {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();

    if (first) {
      return first;
    }
  }

  return request.headers.get('x-real-ip') ?? 'unknown';
};
