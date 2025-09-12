"use client";

import React from 'react';
import { FaComments } from 'react-icons/fa';

interface Props {
  onClick: () => void; // Fungsi yang akan dipanggil saat tombol diklik
}

const StartChatCard: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-blue-100 rounded-full">
          <FaComments className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800">Bicara Langsung?</h2>
      <p className="text-gray-500 mt-2 mb-6">Dapatkan respons cepat dari tim kami untuk pertanyaan Anda.</p>
      <button
        onClick={onClick}
        className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        Mulai Live Chat
      </button>
    </div>
  );
};

export default StartChatCard;