"use client"
import React, { useState } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 z-50 w-15 h-15 bg-blue-600 rounded-full text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-110"
          style={{
            right: 'max(1rem, calc(50vw - 13rem))', // 12rem = max-w-md/2 + padding
          }}
        >
          <FaCommentDots className="w-8 h-8" />
        </button>
      )}

      {isOpen && (
        <div 
          className="fixed bottom-24 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)]"
          style={{
            right: 'max(1rem, calc(50vw - 13rem))', // 18rem = max-w-md/2 + widget width/2
          }}
        >
          <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-2xl">
            <h3 className="font-bold">Butuh Bantuan?</h3>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-75">
              <FaTimes />
            </button>
          </div>
          <div className="flex-grow p-4 text-center text-gray-500">
            <p>Fitur Live Chat akan segera hadir!</p>
          </div>
          <div className="p-2 border-t">
            <input type="text" placeholder="Ketik pesan Anda..." className="w-full p-2 border rounded-lg" />
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChatWidget;