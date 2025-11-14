
import React from 'react';
import { ArrowDownTrayIcon } from './icons';

interface ImageResultCardProps {
  src: string;
  title: string;
}

export const ImageResultCard: React.FC<ImageResultCardProps> = ({ src, title }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `grupo_voll_${title.replace(/\s+/g, '_').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-voll-teal/20">
      <img src={src} alt={title} className="w-full h-auto object-cover aspect-square" />
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-100 text-center mb-4">{title}</h3>
        <button
          onClick={handleDownload}
          className="w-full bg-voll-teal hover:bg-voll-teal-darker text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-300"
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Download
        </button>
      </div>
    </div>
  );
};
