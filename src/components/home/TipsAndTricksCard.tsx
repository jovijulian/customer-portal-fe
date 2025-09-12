import React from 'react';
import Link from 'next/link';
import { FaLightbulb, FaChevronRight } from 'react-icons/fa';

interface Tip {
  id: number;
  title: string;
  description: string;
  link: string;
}

interface Props {
  tips: Tip[];
}

const TipsAndTricksCard: React.FC<Props> = ({ tips }) => {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <div className="flex items-center mb-4">
        <FaLightbulb className="w-5 h-5 text-yellow-500 mr-3" />
        <h3 className="font-bold text-lg text-gray-800">Tips & Trik</h3>
      </div>
      <div className="space-y-4">
        {tips.map((tip) => (
          <Link href={tip.link} key={tip.id} className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-700 text-sm">{tip.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{tip.description}</p>
              </div>
              <FaChevronRight className="text-gray-400 ml-2" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TipsAndTricksCard;