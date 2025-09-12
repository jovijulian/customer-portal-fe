"use client";
import Image from 'next/image';

interface Props {
    name: string;
    eta: string; 
    photoUrl: string;
}

const TechnicianCard: React.FC<Props> = ({ name, eta, photoUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Teknisi Anda</h2>
        <div className="flex items-center space-x-4">
            <Image
                src={photoUrl}
                alt={`Foto ${name}`}
                width={64}
                height={64}
                className="rounded-full object-cover"
            />
            <div>
                <p className="font-bold text-lg text-gray-800">{name}</p>
                <p className="text-sm text-gray-600">Estimasi tiba dalam <span className="font-semibold text-blue-600">{eta}</span></p>
            </div>
        </div>
    </div>
  );
};

export default TechnicianCard;