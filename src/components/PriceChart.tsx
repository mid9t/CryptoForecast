import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { CryptoData, Prediction, TechnicalIndicators } from '../types';

interface PriceChartProps {
  data: (CryptoData & Partial<TechnicalIndicators>)[];
  predictions: Prediction[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data, predictions }) => {
  const combinedData = [...data, ...predictions.map(p => ({
    timestamp: p.timestamp,
    price: p.actualPrice,
    predictedPrice: p.predictedPrice
  }))];

  return (
    <div className="w-full h-[500px] bg-white p-4 rounded-lg shadow-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM dd HH:mm')}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(timestamp) => format(new Date(timestamp), 'MMM dd yyyy HH:mm')}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            name="Actual Price"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="predictedPrice"
            stroke="#82ca9d"
            name="Predicted Price"
            strokeDasharray="5 5"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="sma20"
            stroke="#ff7300"
            name="SMA 20"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="bollingerUpper"
            stroke="#82ca9d"
            name="Bollinger Upper"
            dot={false}
            opacity={0.5}
          />
          <Line
            type="monotone"
            dataKey="bollingerLower"
            stroke="#82ca9d"
            name="Bollinger Lower"
            dot={false}
            opacity={0.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;