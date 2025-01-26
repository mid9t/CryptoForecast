import React, { useState, useEffect } from 'react';
import { Bitcoin } from 'lucide-react';
import PriceChart from './components/PriceChart';
import CryptoStats from './components/CryptoStats';
import { CryptoData, Prediction, TechnicalIndicators } from './types';
import { calculateSMA, calculateRSI, calculateBollingerBands } from './utils/indicators';

// In a real app, this would come from an environment variable
const ALPHA_VANTAGE_API_KEY = 'demo';

function App() {
  const [data, setData] = useState<(CryptoData & TechnicalIndicators)[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, use the actual Alpha Vantage API
        // This is mock data for demonstration
        const mockData = Array.from({ length: 100 }, (_, i) => {
          const date = new Date();
          date.setHours(date.getHours() - i);
          
          return {
            timestamp: date.toISOString(),
            price: 45000 + Math.random() * 5000,
            volume: 1000000 + Math.random() * 500000
          };
        }).reverse();

        // Calculate technical indicators
        const prices = mockData.map(d => d.price);
        const enrichedData = mockData.map((d, i) => {
          const currentPrices = prices.slice(0, i + 1);
          const sma20 = calculateSMA(currentPrices, 20);
          const rsi = calculateRSI(currentPrices);
          const bollingerBands = calculateBollingerBands(currentPrices);

          return {
            ...d,
            sma20,
            rsi,
            bollingerUpper: bollingerBands.upper,
            bollingerLower: bollingerBands.lower
          };
        });

        setData(enrichedData);

        // Mock predictions
        const lastPrice = prices[prices.length - 1];
        const mockPredictions = Array.from({ length: 24 }, (_, i) => {
          const date = new Date();
          date.setHours(date.getHours() + i);
          
          return {
            timestamp: date.toISOString(),
            predictedPrice: lastPrice + (Math.random() - 0.5) * 1000,
            actualPrice: lastPrice + (Math.random() - 0.5) * 1000
          };
        });

        setPredictions(mockPredictions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const lastData = data[data.length - 1];
  const previousData = data[data.length - 2];
  const priceChange24h = ((lastData.price - previousData.price) / previousData.price) * 100;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Bitcoin className="h-10 w-10 text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Bitcoin Price Forecast</h1>
        </div>

        <CryptoStats
          currentPrice={lastData.price}
          priceChange24h={priceChange24h}
          volume24h={lastData.volume}
          rsi={lastData.rsi}
        />

        <PriceChart data={data} predictions={predictions} />
      </div>
    </div>
  );
}

export default App;