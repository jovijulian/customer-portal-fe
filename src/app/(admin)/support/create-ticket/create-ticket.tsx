"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FaPaperPlane, FaSignal, FaSpinner, FaTools } from 'react-icons/fa';

// Opsi kategori masalah
const issueCategories = [
  { id: 'no-internet', label: 'Internet Mati Total', icon: FaSignal },
  { id: 'slow-connection', label: 'Koneksi Lambat', icon: FaSpinner },
  { id: 'other', label: 'Masalah Lainnya', icon: FaTools },
];

const CreateTicketPage = () => {
  const router = useRouter();
  
  // State untuk form
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast.error('Silakan pilih kategori masalah.');
      return;
    }
    if (description.length < 10) {
      toast.error('Mohon jelaskan masalah Anda secara lebih detail (minimal 10 karakter).');
      return;
    }

    setIsSubmitting(true);
    toast.info('Mengirim laporan Anda...');

    // Simulasi pengiriman data ke API
    await new Promise(resolve => setTimeout(resolve, 2500));

    setIsSubmitting(false);
    toast.success('Laporan berhasil dikirim! Anda akan diarahkan ke halaman pelacakan.');

    // Redirect ke halaman detail tiket (yang akan kita buat selanjutnya)
    const newTicketId = `TICKET-${Date.now()}`; // Buat ID tiket palsu
    router.push(`/support/tickets/${newTicketId}`);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Buat Laporan Gangguan</h1>
          <p className="text-gray-500 mt-2">Tim kami akan segera membantu Anda. Mohon isi detail di bawah ini.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bagian Pilihan Kategori */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">1. Apa kategori masalah Anda?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {issueCategories.map((category) => {
                const isSelected = selectedCategory === category.id;
                return (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 border-2 rounded-xl text-center cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 scale-105 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-400'
                    }`}
                  >
                    <category.icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>{category.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bagian Deskripsi Masalah */}
          <div>
            <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-3">2. Jelaskan masalahnya</label>
            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Lampu indikator modem saya berwarna merah dan tidak ada koneksi internet sama sekali sejak pagi ini."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Tombol Kirim */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-lg"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Kirim Laporan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketPage;