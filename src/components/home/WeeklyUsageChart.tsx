"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FaChartBar } from 'react-icons/fa';

interface DailyUsage {
  day: string;
  usage: number;
}

interface Props {
  data: DailyUsage[];
}

const WeeklyUsageChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <div className="flex items-center mb-4">
        <FaChartBar className="w-5 h-5 text-gray-500 mr-3" />
        <h3 className="font-bold text-lg text-gray-800">Pemakaian Mingguan</h3>
      </div>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(value) => `${value} GB`} tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }} 
              contentStyle={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
              }}
              labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
              formatter={(value: number) => [`${value} GB`, 'Pemakaian']}
            />
            <Bar dataKey="usage" name="Pemakaian" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyUsageChart;