"use client";
import React from 'react';
import { FaCheckCircle, FaSpinner, FaMapMarkerAlt, FaTools } from 'react-icons/fa';

interface StatusStep {
  name: string;
  timestamp: string | null;
  isCurrent: boolean;
  isCompleted: boolean;
  icon: React.ElementType;
}

interface Props {
  progress: StatusStep[];
}

const StatusTracker: React.FC<Props> = ({ progress }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Status Laporan</h2>
      <div className="space-y-1">
        {progress.map((step, index) => (
          <div key={index} className="flex">
            <div className="flex flex-col items-center mr-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.isCompleted || step.isCurrent ? 'border-blue-600 bg-blue-100 text-blue-600' : 'border-gray-200 bg-gray-50 text-gray-400'}`}>
                {step.isCurrent ? <FaSpinner className="animate-spin" /> : <step.icon />}
              </div>
              {index < progress.length - 1 && (
                <div className={`w-0.5 flex-grow my-1 ${step.isCompleted ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
            <div className='pt-1.5'>
              <p className={`font-semibold ${step.isCurrent ? 'text-blue-700' : 'text-gray-800'}`}>{step.name}</p>
              <p className="text-sm text-gray-500">{step.timestamp || '...'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusTracker;