export const calculateSMA = (prices: number[], period: number): number => {
  if (prices.length < period) return 0;
  const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0);
  return sum / period;
};

export const calculateRSI = (prices: number[], period: number = 14): number => {
  if (prices.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = prices.length - period; i < prices.length; i++) {
    const difference = prices[i] - prices[i - 1];
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;
  
  if (avgLoss === 0) return 100;
  
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
};

export const calculateBollingerBands = (
  prices: number[],
  period: number = 20,
  multiplier: number = 2
): { upper: number; lower: number } => {
  const sma = calculateSMA(prices, period);
  
  if (prices.length < period) {
    return { upper: sma, lower: sma };
  }

  const squaredDifferences = prices
    .slice(-period)
    .map(price => Math.pow(price - sma, 2));
  
  const standardDeviation = Math.sqrt(
    squaredDifferences.reduce((acc, val) => acc + val, 0) / period
  );

  return {
    upper: sma + (multiplier * standardDeviation),
    lower: sma - (multiplier * standardDeviation)
  };
};