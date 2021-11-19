export const applyAuth = () => {
  const token = localStorage.getItem('token') || '';
  return { Authorization_Flame: `Bearer ${token}` };
};
