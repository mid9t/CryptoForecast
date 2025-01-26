export interface CryptoData {
  timestamp: string;
  price: number;
  volume: number;
}

export interface Prediction {
  timestamp: string;
  predictedPrice: number;
  actualPrice: number;
}

export interface TechnicalIndicators {
  sma20: number;
  rsi: number;
  bollingerUpper: number;
  bollingerLower: number;
}