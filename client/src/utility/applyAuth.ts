export const applyAuth = () => {
  const token = localStorage.getItem('token') || '';
  return { Authorization: `Bearer ${token}` };
};
