import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';

interface CryptoStatsProps {
  currentPrice: number;
  priceChange24h: number;
  volume24h: number;
  rsi: number;
}

const CryptoStats: React.FC<CryptoStatsProps> = ({
  currentPrice,
  priceChange24h,
  volume24h,
  rsi
}) => {
  const priceChangeColor = priceChange24h >= 0 ? 'text-green-500' : 'text-red-500';
  const TrendIcon = priceChange24h >= 0 ? TrendingUp : TrendingDown;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Price</p>
            <p className="text-2xl font-bold">${currentPrice.toLocaleString()}</p>
          </div>
          <DollarSign className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">24h Change</p>
            <p className={`text-2xl font-bold ${priceChangeColor}`}>
              {priceChange24h > 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
            </p>
          </div>
          <TrendIcon className={`h-8 w-8 ${priceChangeColor}`} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">24h Volume</p>
            <p className="text-2xl font-bold">${volume24h.toLocaleString()}</p>
          </div>
          <BarChart3 className="h-8 w-8 text-purple-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">RSI (14)</p>
            <p className="text-2xl font-bold">{rsi.toFixed(2)}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-sm font-medium">RSI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoStats;