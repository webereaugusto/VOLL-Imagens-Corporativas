
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <svg
    className="animate-spin h-12 w-12 text-voll-teal"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
      <LoadingSpinner />
      <h2 className="mt-6 text-2xl font-bold text-gray-100">Gerando suas fotos...</h2>
      <p className="mt-2 text-gray-400 max-w-sm">
        Nossa IA está criando suas imagens profissionais. Isso pode levar alguns instantes.
      </p>
    </div>
  );
};
