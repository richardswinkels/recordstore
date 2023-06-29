export const formatEuro = (amount) => {
  const parsedAmount = parseFloat(amount);
  const formattedAmount = parsedAmount.toFixed(2).replace('.', ','); // Replace decimal point with comma
  return `€ ${formattedAmount}`;
}