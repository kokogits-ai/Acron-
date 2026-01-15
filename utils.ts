
export const formatCurrency = (amount: number, currency: string = 'EUR') => {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
};

export const generateReference = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString().slice(-4);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fi-FI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
