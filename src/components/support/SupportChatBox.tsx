"use client";

import React from 'react';
import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';

const SupportChatBox = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col h-96">
      {/* Header Chat */}
      <div className="flex items-center p-4 bg-blue-600 text-white rounded-t-2xl">
        <FaUserCircle className="w-6 h-6 mr-3" />
        <h3 className="font-bold">Live Chat dengan Customer Service</h3>
      </div>
      
      {/* Konten Chat (Placeholder) */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50">
        <div className="flex items-start gap-2">
            <FaUserCircle className="w-8 h-8 text-gray-400"/>
            <div className="p-3 bg-gray-200 rounded-lg max-w-xs">
                <p className="text-sm text-gray-800">Halo, ada yang bisa kami bantu?</p>
            </div>
        </div>
         <div className="flex items-start gap-2 flex-row-reverse">
            <FaUserCircle className="w-8 h-8 text-blue-500"/>
            <div className="p-3 bg-blue-500 text-white rounded-lg max-w-xs">
                <p className="text-sm">Ya, internet saya tiba-tiba mati.</p>
            </div>
        </div>
      </div>
      
      {/* Input Pesan */}
      <div className="p-4 border-t bg-white rounded-b-2xl">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ketik pesan Anda..." 
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800">
            <FaPaperPlane className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportChatBox;