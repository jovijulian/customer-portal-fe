"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaPlus, FaChevronRight, FaTicketAlt, FaQuestionCircle, FaSpinner, FaComments } from 'react-icons/fa';
import SupportChatBox from '@/components/support/SupportChatBox';
import LiveChatWidget from '@/components/home/LiveChatWidget';

// Data mock untuk tiket yang sedang aktif
const activeTickets = [
    {
        id: 'TICKET-1715843400',
        category: 'Koneksi Lambat',
        status: 'Teknisi Ditugaskan',
        date: '16 Mei 2024',
    },
    {
        id: 'TICKET-1715842300',
        category: 'Internet Mati Total',
        status: 'Mencari Teknisi',
        date: '15 Mei 2024',
    }
];

// Data mock untuk FAQ
const faqs = [
    {
        question: 'Bagaimana cara me-reboot modem?',
        answer: 'Cabut kabel power modem, tunggu 1 menit, lalu colokkan kembali. Tunggu hingga semua lampu indikator stabil.'
    },
    {
        question: 'Mengapa koneksi internet saya lambat?',
        answer: 'Banyak faktor yang bisa memengaruhi, seperti jumlah perangkat yang terhubung, gangguan di area Anda, atau masalah pada perangkat. Coba reboot modem terlebih dahulu.'
    },
    {
        question: 'Bagaimana cara mengganti password WiFi?',
        answer: 'Anda bisa mengganti password WiFi melalui menu Pengaturan di aplikasi ini.'
    }
]

const SupportHubPage = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">Pusat Bantuan</h1>
                <p className="text-gray-500 mt-2">Kami siap membantu setiap kendala Anda.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <LiveChatWidget />
              
                <div className="space-y-6">
                    {/* Tombol Aksi Utama */}
                    <Link href="/support/create-ticket" className="block w-full text-center py-4 px-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-lg">
                        <FaPlus />
                        Buat Laporan Gangguan Baru
                    </Link>

                    {/* Bagian Laporan Aktif */}

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FaTicketAlt className="text-blue-600" />
                        Laporan Aktif Anda
                    </h2>
                    <div className="space-y-4">
                        {activeTickets.length > 0 ? (
                            activeTickets.map(ticket => (
                                <Link href={`/support/tickets/${ticket.id}`} key={ticket.id} className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-gray-700">{ticket.category}</p>
                                            <p className="text-sm text-gray-500">ID: {ticket.id} • {ticket.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-blue-600 flex items-center gap-2">
                                                {ticket.status} <FaChevronRight />
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-4">Tidak ada laporan aktif saat ini.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Bagian Bantuan Cepat (FAQ) dipindah ke bawah */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaQuestionCircle className="text-blue-600" />
                    Bantuan Cepat (FAQ)
                </h2>
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b">
                            <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center py-3 text-left">
                                <span className="font-semibold text-gray-700">{faq.question}</span>
                                <FaChevronRight className={`transition-transform duration-300 ${openFaq === index ? 'rotate-90' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40' : 'max-h-0'}`}>
                                <p className="text-gray-600 pb-4 pr-4">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SupportHubPage;