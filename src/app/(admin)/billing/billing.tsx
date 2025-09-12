"use client";

import React, { useState } from 'react';
import { FaDownload, FaFileInvoiceDollar, FaHistory, FaCreditCard } from 'react-icons/fa';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface Invoice {
  id: string;
  period: string;
  amount: number;
  dueDate: string;
  status: 'Belum Dibayar' | 'Lunas' | 'Jatuh Tempo';
}

const initialCurrentInvoice: Invoice = {
  id: 'INV-202509-001',
  period: 'Tagihan 1 Sep - 30 Sep 2025',
  amount: 227000,
  dueDate: '20 Sep 2025',
  status: 'Belum Dibayar',
};

const initialPaymentHistory: Invoice[] = [
  { id: 'INV-202508-001', period: 'Tagihan Agustus 2025', amount: 227000, dueDate: '', status: 'Lunas' },
  { id: 'INV-202507-001', period: 'Tagihan Juli 2025', amount: 116000, dueDate: '', status: 'Lunas' },
  { id: 'INV-202506-001', period: 'Tagihan Juni 2025', amount: 116000, dueDate: '', status: 'Lunas' },
];

const BillingPage = () => {
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(initialCurrentInvoice);
  const [history, setHistory] = useState<Invoice[]>(initialPaymentHistory);
  const [isPaying, setIsPaying] = useState(false);

  const handlePayment = async () => {
    if (!currentInvoice) return;

    setIsPaying(true);
    toast.info('Memproses pembayaran...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    setHistory([{ ...currentInvoice, status: 'Lunas' }, ...history]);
    setCurrentInvoice(null);

    setIsPaying(false);
    toast.success('Pembayaran berhasil!');
  };

  const getStatusChip = (status: Invoice['status']) => {
    switch (status) {
      case 'Lunas':
        return 'bg-green-100 text-green-800';
      case 'Belum Dibayar':
        return 'bg-yellow-100 text-yellow-800';
      case 'Jatuh Tempo':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-800">Billing & Tagihan</h1>
        <p className="text-gray-500 mt-1">Kelola dan bayar tagihan Anda dengan mudah.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaFileInvoiceDollar className="text-blue-600" />
          Tagihan Saat Ini
        </h2>
        {currentInvoice ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">{currentInvoice.period}</p>
                <p className="text-3xl font-extrabold text-gray-900">Rp{currentInvoice.amount.toLocaleString('id-ID')}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-bold rounded-full ${getStatusChip(currentInvoice.status)}`}>
                {currentInvoice.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Jatuh tempo pada: <span className="font-semibold">{currentInvoice.dueDate}</span></p>
            <button
              onClick={handlePayment}
              disabled={isPaying}
              className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all text-lg"
            >
              {isPaying ? 'Memproses...' : 'Bayar Sekarang'}
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">Tidak ada tagihan yang perlu dibayar saat ini. 👍</p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaCreditCard className="text-blue-600" />
          Metode Pembayaran Tersedia
        </h2>
        <div className="flex items-center justify-center space-x-6">
          {/* <Image src="/images/payment/qris.png" alt="QRIS" width={80} height={30} className="object-contain" />
          <Image src="/images/payment/va.png" alt="Virtual Account" width={100} height={30} className="object-contain" />
          <Image src="/images/payment/ewallet.png" alt="E-Wallet" width={120} height={30} className="object-contain" /> */}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaHistory className="text-blue-600" />
          Riwayat Tagihan
        </h2>
        <div className="space-y-3">
          {history.map(inv => (
            <div key={inv.id} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-semibold text-gray-700">{inv.period}</p>
                <p className="text-sm text-gray-500">Rp{inv.amount.toLocaleString('id-ID')}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusChip(inv.status)}`}>
                  {inv.status}
                </span>
                <button className="text-gray-400 hover:text-blue-600" title="Download Invoice">
                  <FaDownload />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;