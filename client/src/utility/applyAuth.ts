export const applyAuth = () => {
  const token = localStorage.getItem('token') || '';
  return { 'Authorization-Flame': `Bearer ${token}` };
};
