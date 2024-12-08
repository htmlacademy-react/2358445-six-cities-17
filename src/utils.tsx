const toUpFirstLetter = (value: string) => value[0].toUpperCase() + value.slice(1);

const formatDate = (date: string): string => {
  const tempDate = new Date(Date.parse(date));
  return `${tempDate.toLocaleString('en-US', { month: 'long' })} ${tempDate.getFullYear()}`;
};

const showRating = (rating: number): string => `${Math.round(rating) * 20}%`;

export { toUpFirstLetter, formatDate, showRating };
