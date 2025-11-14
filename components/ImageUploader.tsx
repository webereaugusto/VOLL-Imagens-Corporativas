import React, { useRef } from 'react';
import { PhotoIcon, SparklesIcon, XCircleIcon } from './icons';
import type { EnvironmentOption, LogoOption } from '../App';

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
  onGenerate: () => void;
  onClearImage: () => void;
  uploadedImage: string | null;
  includeLogo: LogoOption;
  onIncludeLogoChange: (option: LogoOption) => void;
  environment: EnvironmentOption;
  onEnvironmentChange: (env: EnvironmentOption) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  onGenerate,
  onClearImage,
  uploadedImage,
  includeLogo,
  onIncludeLogoChange,
  environment,
  onEnvironmentChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageUpload(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="w-full max-w-2xl text-center bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
      {!uploadedImage ? (
        <>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Crie sua Foto de Perfil Corporativa</h2>
          <p className="text-gray-400 mb-6">Envie uma foto de rosto e a nossa IA criará 4 opções profissionais.</p>
          <div
            className="border-2 border-dashed border-gray-600 rounded-lg p-10 cursor-pointer hover:border-voll-teal hover:bg-gray-700/50 transition-colors"
            onClick={() => inputRef.current?.click()}
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" />
            <p className="mt-2 text-sm text-gray-400">
              <span className="font-semibold text-voll-teal">Clique para enviar</span> ou arraste e solte
            </p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP até 10MB</p>
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Pré-visualização da Imagem</h2>
          <div className="relative inline-block mb-6">
            <img
              src={uploadedImage}
              alt="Uploaded preview"
              className="max-h-64 w-auto rounded-lg shadow-md object-contain"
            />
            <button
              onClick={onClearImage}
              className="absolute -top-3 -right-3 bg-gray-800 rounded-full p-1 shadow-lg text-gray-400 hover:text-red-500 hover:scale-110 transition-transform"
              title="Remover imagem"
            >
              <XCircleIcon className="h-8 w-8" />
            </button>
          </div>
          
          <div className="mt-4 text-left bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">Personalize sua Imagem</h3>
            
            <div className="space-y-4">
              {/* Environment Options */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ambiente de Fundo</label>
                <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-700 p-1">
                  <button
                    onClick={() => onEnvironmentChange('office')}
                    className={`w-full rounded-md py-2 text-sm font-semibold transition-all duration-200 ${
                      environment === 'office'
                        ? 'bg-gray-100 text-voll-teal shadow'
                        : 'bg-transparent text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    Escritório
                  </button>
                  <button
                    onClick={() => onEnvironmentChange('pilates')}
                    className={`w-full rounded-md py-2 text-sm font-semibold transition-all duration-200 ${
                      environment === 'pilates'
                        ? 'bg-gray-100 text-voll-teal shadow'
                        : 'bg-transparent text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    Estúdio de Pilates
                  </button>
                </div>
              </div>

               {/* Logo Option */}
               <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Incluir logo na roupa</label>
                <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-700 p-1">
                  <button
                    onClick={() => onIncludeLogoChange('yes')}
                    className={`w-full rounded-md py-2 text-sm font-semibold transition-all duration-200 ${
                      includeLogo === 'yes'
                        ? 'bg-gray-100 text-voll-teal shadow'
                        : 'bg-transparent text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    onClick={() => onIncludeLogoChange('no')}
                    className={`w-full rounded-md py-2 text-sm font-semibold transition-all duration-200 ${
                      includeLogo === 'no'
                        ? 'bg-gray-100 text-voll-teal shadow'
                        : 'bg-transparent text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>
            </div>
          </div>


          <button
            onClick={onGenerate}
            className="mt-6 w-full bg-voll-teal hover:bg-voll-teal-darker text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <SparklesIcon className="h-6 w-6 mr-2" />
            Gerar Fotos Corporativas
          </button>
        </div>
      )}
    </div>
  );
};
