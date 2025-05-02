export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDateTime = (dateString: string): string => {
  return `${formatDate(dateString)} ${formatTime(dateString)}`;
};

export const getCurrentMonth = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export const getPreviousMonth = (): string => {
  const now = new Date();
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const month = now.getMonth() === 0 ? 12 : now.getMonth();
  return `${year}-${String(month).padStart(2, '0')}`;
};

export const getMonthName = (monthStr: string): string => {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

export const getMonthOptions = (): string[] => {
  const options: string[] = [];
  const now = new Date();
  
  for (let i = 0; i < 12; i++) {
    const year = now.getMonth() - i < 0 ? now.getFullYear() - 1 : now.getFullYear();
    const month = now.getMonth() - i < 0 ? 12 + (now.getMonth() - i) : now.getMonth() - i + 1;
    
    const monthStr = `${year}-${String(month).padStart(2, '0')}`;
    options.push(monthStr);
  }
  
  return options;
};