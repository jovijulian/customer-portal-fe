"use client";

import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FaCalendarAlt, FaChartLine, FaClipboardList } from 'react-icons/fa';

// Tipe data untuk pemakaian harian
interface DailyUsage {
  date: string; // Format "1 Sep", "2 Sep", etc.
  usage: number; // dalam GB
}

// Fungsi untuk membuat data mock untuk sebulan
const generateMonthlyData = (): DailyUsage[] => {
  const data: DailyUsage[] = [];
  for (let i = 1; i <= 30; i++) {
    // Buat pemakaian lebih tinggi di akhir pekan (Sabtu/Minggu)
    const dayOfWeek = new Date(2025, 8, i).getDay(); // September 2025
    const baseUsage = Math.random() * 2 + 1; // 1-3 GB
    const weekendBoost = (dayOfWeek === 6 || dayOfWeek === 0) ? Math.random() * 3 : 0;
    data.push({
      date: `${i} Sep`,
      usage: parseFloat((baseUsage + weekendBoost).toFixed(1)),
    });
  }
  return data;
};

const HistoryPage = () => {
  // State untuk data pemakaian (kita gunakan data mock)
  const [usageData] = useState<DailyUsage[]>(generateMonthlyData());
  // State untuk filter (di aplikasi nyata, ini akan memicu API call baru)
  const [selectedMonth, setSelectedMonth] = useState('september-2025');

  // Menghitung total pemakaian untuk ringkasan
  const totalUsage = useMemo(() => 
    usageData.reduce((acc, day) => acc + day.usage, 0),
    [usageData]
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Riwayat Pemakaian</h1>
            <p className="text-gray-500 mt-1">Analisis detail penggunaan kuota internet Anda.</p>
        </div>
        {/* Filter Periode */}
        <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="september-2025">September 2025</option>
                <option value="august-2025">Agustus 2025</option>
                <option value="july-2025">Juli 2025</option>
            </select>
        </div>
      </div>

      {/* --- KARTU RINGKASAN TOTAL --- */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Ringkasan Pemakaian</h2>
        <p className="text-4xl font-extrabold text-blue-600">{totalUsage.toFixed(1)} GB</p>
        <p className="text-gray-500">Total kuota terpakai untuk periode September 2025</p>
      </div>

      {/* --- KARTU GRAFIK PEMAKAIAN --- */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-600"/>
            Grafik Harian
        </h2>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={usageData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `${value} GB`} tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '0.75rem' }} />
                    <Legend />
                    <Line type="monotone" dataKey="usage" name="Pemakaian (GB)" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>

     
    </div>
  );
};

export default HistoryPage;