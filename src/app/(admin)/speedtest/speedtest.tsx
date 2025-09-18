"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaDownload, FaUpload, FaServer, FaWifi, FaClock, FaChartLine, FaRocket, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

type TestState = 'idle' | 'testing-ping' | 'testing-download' | 'testing-upload' | 'finished' | 'error';

interface SpeedTestResult {
    ping: number;
    download: number;
    upload: number;
}

const SpeedTestPage = () => {
    // Mock userData for demo
    const userData = { packageSpeed: 100 };
    const [testState, setTestState] = useState<TestState>('idle');
    const [ping, setPing] = useState(0);
    const [download, setDownload] = useState(0);
    const [upload, setUpload] = useState(0);
    const [liveSpeed, setLiveSpeed] = useState(0);
    const [graphData, setGraphData] = useState<{ time: number, speed: number }[]>([]);
    const [error, setError] = useState<string>('');
    const [testProgress, setTestProgress] = useState(0);
    const [testHistory, setTestHistory] = useState<SpeedTestResult[]>([]);

    const packageSpeed = useMemo(() => userData?.packageSpeed || 100, [userData]);

    // Simulate ping measurement
    const measurePing = async (): Promise<number> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Math.round(Math.random() * 40 + 10));
            }, 500);
        });
    };

    // Simulate download test with progress
    const measureDownload = async (onProgress: (speed: number) => void): Promise<number> => {
        return new Promise((resolve) => {
            let currentSpeed = 0;
            let maxSpeed = packageSpeed * (0.8 + Math.random() * 0.3);
            let dataPoints = 0;
            const totalDataPoints = 20;

            const interval = setInterval(() => {
                dataPoints++;
                
                // Realistic speed curve - starts slow, peaks, then stabilizes
                let speedFactor;
                if (dataPoints <= 5) {
                    speedFactor = dataPoints / 5 * 0.7; // Ramp up
                } else if (dataPoints <= 15) {
                    speedFactor = 0.7 + (Math.random() - 0.5) * 0.4; // Fluctuate around peak
                } else {
                    speedFactor = 0.8 + (Math.random() - 0.5) * 0.2; // Stabilize
                }

                currentSpeed = maxSpeed * speedFactor;
                onProgress(Math.max(0, currentSpeed));
                setTestProgress((dataPoints / totalDataPoints) * 100);

                if (dataPoints >= totalDataPoints) {
                    clearInterval(interval);
                    resolve(currentSpeed);
                }
            }, 250);
        });
    };

    // Simulate upload test
    const measureUpload = async (onProgress: (speed: number) => void): Promise<number> => {
        return new Promise((resolve) => {
            let currentSpeed = 0;
            let maxSpeed = download * (0.4 + Math.random() * 0.3); // Upload typically slower
            let dataPoints = 0;
            const totalDataPoints = 15;

            const interval = setInterval(() => {
                dataPoints++;
                
                let speedFactor;
                if (dataPoints <= 3) {
                    speedFactor = dataPoints / 3 * 0.6;
                } else if (dataPoints <= 12) {
                    speedFactor = 0.6 + (Math.random() - 0.5) * 0.3;
                } else {
                    speedFactor = 0.7 + (Math.random() - 0.5) * 0.1;
                }

                currentSpeed = maxSpeed * speedFactor;
                onProgress(Math.max(0, currentSpeed));
                setTestProgress((dataPoints / totalDataPoints) * 100);

                if (dataPoints >= totalDataPoints) {
                    clearInterval(interval);
                    resolve(currentSpeed);
                }
            }, 300);
        });
    };

    // Main test function
    const runTest = async () => {
        try {
            setTestState('testing-ping');
            setGraphData([]);
            setLiveSpeed(0);
            setError('');
            setPing(0);
            setDownload(0);
            setUpload(0);
            setTestProgress(0);

            // 1. Test Ping
            const pingResults: number[] = [];
            for (let i = 0; i < 3; i++) {
                const pingResult = await measurePing();
                pingResults.push(pingResult);
                setPing(Math.round(pingResults.reduce((a, b) => a + b, 0) / pingResults.length));
                setTestProgress(((i + 1) / 3) * 100);
                await new Promise(resolve => setTimeout(resolve, 300));
            }

            // 2. Test Download
            setTestState('testing-download');
            setGraphData([]);
            setTestProgress(0);
            let downloadDataPoints: { time: number, speed: number }[] = [];

            const downloadSpeed = await measureDownload((speed) => {
                downloadDataPoints.push({
                    time: downloadDataPoints.length,
                    speed: parseFloat(speed.toFixed(2))
                });
                setGraphData([...downloadDataPoints]);
                setLiveSpeed(speed);
            });

            setDownload(downloadSpeed);

            // 3. Test Upload
            setTestState('testing-upload');
            setGraphData([]);
            setTestProgress(0);
            let uploadDataPoints: { time: number, speed: number }[] = [];

            const uploadSpeed = await measureUpload((speed) => {
                uploadDataPoints.push({
                    time: uploadDataPoints.length,
                    speed: parseFloat(speed.toFixed(2))
                });
                setGraphData([...uploadDataPoints]);
                setLiveSpeed(speed);
            });

            setUpload(uploadSpeed);
            setTestState('finished');
            setTestProgress(100);

            // Add to history
            setTestHistory(prev => [...prev.slice(-4), { ping: Math.round(pingResults.reduce((a, b) => a + b, 0) / pingResults.length), download: downloadSpeed, upload: uploadSpeed }]);

        } catch (error) {
            console.error('Speed test error:', error);
            setError('Terjadi kesalahan saat menguji koneksi. Silakan coba lagi.');
            setTestState('error');
        }
    };

    const getStatusText = () => {
        switch (testState) {
            case 'testing-ping': return `Mengukur latensi jaringan... ${testProgress.toFixed(0)}%`;
            case 'testing-download': return `Mengukur kecepatan unduh... ${testProgress.toFixed(0)}%`;
            case 'testing-upload': return `Mengukur kecepatan unggah... ${testProgress.toFixed(0)}%`;
            case 'finished': return 'Tes Selesai! Semua metrik berhasil diukur.';
            case 'error': return error;
            default: return 'Klik tombol di bawah untuk memulai pengujian komprehensif koneksi internet Anda';
        }
    };

    const getSpeedCategory = (speed: number, type: 'download' | 'upload') => {
        const threshold = type === 'download' ?
            { excellent: 50, good: 25, fair: 10 } :
            { excellent: 25, good: 10, fair: 5 };

        if (speed >= threshold.excellent) return { text: 'Sangat Baik', color: 'text-green-600', icon: 'excellent' };
        if (speed >= threshold.good) return { text: 'Baik', color: 'text-blue-600', icon: 'good' };
        if (speed >= threshold.fair) return { text: 'Cukup', color: 'text-yellow-600', icon: 'fair' };
        return { text: 'Kurang', color: 'text-red-600', icon: 'poor' };
    };

    const getHealthScore = () => {
        if (testState !== 'finished') return 0;
        const pingScore = ping < 20 ? 100 : ping < 50 ? 80 : ping < 100 ? 60 : 40;
        const downloadScore = (download / packageSpeed) * 100;
        const uploadScore = (upload / (packageSpeed * 0.5)) * 100;
        return Math.min(100, Math.round((pingScore + downloadScore + uploadScore) / 3));
    };

    const radialData = [
        {
            name: 'Health Score',
            value: getHealthScore(),
            fill: getHealthScore() >= 80 ? '#10B981' : getHealthScore() >= 60 ? '#3B82F6' : getHealthScore() >= 40 ? '#F59E0B' : '#EF4444'
        }
    ];

    return (
        <div className="space-y-6 max-w-6xl mx-auto p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                    Uji Kecepatan Internet
                </h1>
                <p className="text-gray-500 text-lg">Analisis mendalam performa jaringan NAMI NetHome Anda</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Main Speedometer Section */}
                <div className=" bg-white rounded-3xl shadow-2xl p-8">
                    {/* Large Speedometer */}
                    <div className="relative w-80 h-48 mx-auto mb-8">
                        
                        
                        {/* Speed display */}
                        <div className="absolute w-full text-center">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mx-4 shadow-lg">
                                <p className="text-sm font-semibold text-gray-600 mb-1">
                                    {testState === 'testing-upload' ? 'Kecepatan Upload' : 'Kecepatan Download'}
                                </p>
                                <p className="text-6xl font-bold text-gray-800 tracking-tight leading-none">
                                    {liveSpeed.toFixed(1)}
                                </p>
                                <p className="text-lg font-semibold text-gray-500">Mbps</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    {testState.startsWith('testing') && (
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-600">Progress</span>
                                <span className="text-sm font-bold text-blue-600">{testProgress.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${testProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Status Text */}
                    <div className="text-center mb-8">
                        <p className={`text-lg font-semibold min-h-[3rem] flex items-center justify-center ${testState === 'error' ? 'text-red-600' : 'text-gray-600'}`}>
                            {testState.startsWith('testing') && (
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent mr-3" />
                            )}
                            {getStatusText()}
                        </p>
                    </div>

                    {/* Action Button */}
                    <div className="text-center mb-8">
                        <button
                            onClick={runTest}
                            disabled={testState.startsWith('testing')}
                            className="relative py-4 px-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-xl rounded-full shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:hover:from-blue-600 disabled:hover:to-blue-700"
                        >
                            <span className="flex items-center gap-3">
                                {testState === 'idle' || testState === 'error' ? (
                                    <>
                                        <FaRocket className="text-xl" />
                                        Mulai Tes
                                    </>
                                ) : testState === 'finished' ? (
                                    <>
                                        <FaRocket className="text-xl" />
                                        Uji Lagi
                                    </>
                                ) : (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                        Menguji...
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Health Score & Info Panel */}
                <div className="space-y-6">
                    {/* Health Score */}
                    <div className="bg-white rounded-3xl shadow-2xl p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FaChartLine className="text-blue-600" />
                            Skor Kesehatan
                        </h3>
                        <div className="flex items-center justify-center">
                            <div className="relative w-32 h-32">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadialBarChart data={radialData} startAngle={90} endAngle={-270} innerRadius="70%" outerRadius="90%">
                                        <RadialBar dataKey="value" cornerRadius={10} fill={radialData[0].fill} />
                                    </RadialBarChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-gray-800">{getHealthScore()}</p>
                                        <p className="text-sm text-gray-500">dari 100</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center mt-4 text-sm text-gray-600">
                            {getHealthScore() >= 80 ? 'Koneksi Excellent!' : 
                             getHealthScore() >= 60 ? 'Koneksi Baik' :
                             getHealthScore() >= 40 ? 'Koneksi Cukup' : 'Perlu Peningkatan'}
                        </p>
                    </div>

                    {/* Connection Status */}
                    <div className="bg-white rounded-3xl shadow-2xl p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <FaWifi className="text-blue-600" />
                            Status Koneksi
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <span className="font-medium text-gray-700">Stabilitas</span>
                                <span className="flex items-center gap-2">
                                    {testState === 'finished' ? (
                                        <>
                                            <FaCheckCircle className="text-green-500" />
                                            <span className="text-green-600 font-semibold">Stabil</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaClock className="text-gray-400" />
                                            <span className="text-gray-500">Menunggu</span>
                                        </>
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <span className="font-medium text-gray-700">Latensi</span>
                                <span className="flex items-center gap-2">
                                    {ping > 0 ? (
                                        ping < 50 ? (
                                            <>
                                                <FaCheckCircle className="text-green-500" />
                                                <span className="text-green-600 font-semibold">Rendah</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaTimesCircle className="text-yellow-500" />
                                                <span className="text-yellow-600 font-semibold">Sedang</span>
                                            </>
                                        )
                                    ) : (
                                        <>
                                            <FaClock className="text-gray-400" />
                                            <span className="text-gray-500">Menunggu</span>
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Results */}
            <div className={`transition-all duration-500 ${testState === 'finished' ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}`}>
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Hasil Detail Pengujian</h2>
                    
                    <div className="grid grid-cols-1  gap-6 mb-8">
                        {/* Ping Results */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                    <FaServer className="text-2xl text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Ping / Latensi</h3>
                                <p className="text-4xl font-bold text-gray-800 mb-2">
                                    {ping} <span className="text-xl font-medium text-gray-600">ms</span>
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    {ping < 20 ? <FaCheckCircle className="text-green-500" /> : 
                                     ping < 50 ? <FaCheckCircle className="text-blue-500" /> : 
                                     <FaTimesCircle className="text-yellow-500" />}
                                    <span className={`text-sm font-semibold ${
                                        ping < 20 ? 'text-green-600' :
                                        ping < 50 ? 'text-blue-600' :
                                        ping < 100 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                        {ping < 20 ? 'Sangat Baik' :
                                         ping < 50 ? 'Baik' :
                                         ping < 100 ? 'Cukup' : 'Kurang'}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Waktu respons server</p>
                            </div>
                        </div>

                        {/* Download Results */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                    <FaDownload className="text-2xl text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Download</h3>
                                <p className="text-4xl font-bold text-gray-800 mb-2">
                                    {download.toFixed(1)} <span className="text-xl font-medium text-gray-600">Mbps</span>
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    {getSpeedCategory(download, 'download').icon === 'excellent' ? <FaCheckCircle className="text-green-500" /> : 
                                     getSpeedCategory(download, 'download').icon === 'good' ? <FaCheckCircle className="text-blue-500" /> : 
                                     <FaTimesCircle className="text-yellow-500" />}
                                    <span className={`text-sm font-semibold ${getSpeedCategory(download, 'download').color}`}>
                                        {getSpeedCategory(download, 'download').text}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Kecepatan unduh data</p>
                            </div>
                        </div>

                        {/* Upload Results */}
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border-2 border-purple-100">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                                    <FaUpload className="text-2xl text-purple-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Upload</h3>
                                <p className="text-4xl font-bold text-gray-800 mb-2">
                                    {upload.toFixed(1)} <span className="text-xl font-medium text-gray-600">Mbps</span>
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    {getSpeedCategory(upload, 'upload').icon === 'excellent' ? <FaCheckCircle className="text-green-500" /> : 
                                     getSpeedCategory(upload, 'upload').icon === 'good' ? <FaCheckCircle className="text-blue-500" /> : 
                                     <FaTimesCircle className="text-yellow-500" />}
                                    <span className={`text-sm font-semibold ${getSpeedCategory(upload, 'upload').color}`}>
                                        {getSpeedCategory(upload, 'upload').text}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Kecepatan unggah data</p>
                            </div>
                        </div>
                    </div>

                    {/* Package Comparison */}
                    {testState === 'finished' && (
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-6">
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-4">Perbandingan dengan Paket Anda</h3>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-blue-100 mb-2">Paket Berlangganan</p>
                                        <p className="text-3xl font-bold">{packageSpeed} Mbps</p>
                                    </div>
                                    <div>
                                        <p className="text-blue-100 mb-2">Kecepatan Aktual</p>
                                        <p className="text-3xl font-bold">
                                            {download > 0 ? ((download / packageSpeed) * 100).toFixed(0) : '0'}%
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-blue-500/30 rounded-xl">
                                    <p className="text-sm">
                                        {download > packageSpeed * 0.8 ? '🎉 Performa excellent! Anda mendapat kecepatan sesuai paket.' :
                                         download > packageSpeed * 0.6 ? '👍 Performa baik. Kecepatan dalam rentang normal.' :
                                         '⚠️ Kecepatan di bawah ekspektasi. Hubungi customer service jika masalah berlanjut.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {/* Test History */}
            <div className="bg-white rounded-3xl shadow-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Riwayat Pengujian</h2>
                {testHistory.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Waktu</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Ping (ms)</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Download (Mbps)</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Upload (Mbps)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testHistory.slice().reverse().map((test, index) => (
                                    <tr key={index} className="border-b last:border-none hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">{new Date().toLocaleString()}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{test.ping}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{test.download.toFixed(1)}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{test.upload.toFixed(1)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Belum ada riwayat pengujian. Lakukan pengujian untuk melihat hasilnya di sini.</p>
                )}
            </div>
        </div>
    );
};

export default SpeedTestPage;