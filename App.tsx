import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageResultCard } from './components/ImageResultCard';
import { LoadingState } from './components/LoadingState';
import { generateCorporateImage } from './services/geminiService';
import { ArrowPathIcon } from './components/icons';

type GeneratedImage = {
  style: string;
  src: string;
};

type AppStep = 'upload' | 'generating' | 'results';
export type EnvironmentOption = 'office' | 'pilates';
export type LogoOption = 'yes' | 'no';

// Base64 encoded logo to ensure it always loads
const vollLogoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX///8zMzMhISF7e3sODg5bW1uZmZmampr29vb8/PwoKCgWFhbz8/PExMSkpKRcXFzZ2dkvLy9ISEg7Oztvb28nJye5ubmsrKzv7+9MTEyQkJAgICBQUFBjY2N3d3dXV1deXl5xcXHLy8uJiYklJSW2s1d3AAAC8UlEQVR4nO3ci3KiQBSFYSCluIsuKKLg2B7//5d2nULsSTgnk53JzDvnV62AJB9SCpIkSZIkSZIkSZIkSZIkSZIkSZIkSZKkP120t3d/fy+w2d3d3d3d/f29b0+y3213t/3udre/3e3udrvb3W1/2t/u9r+9SXZHLkYvxhYj2w13t/10t7vbn7JdiBcm78yT7B7chF6MLSa3G+5u/97d7vY/2W64u/0Dd7v9C3ZbCxcT9z+zz4kS+7v9b+x22e0u/GucIk4S5/8pQ/8y97v9N+x22e0u/lXOEucUcUpxmniPOEecU8QR4hJxjnCKOEucJc4p4ohwijnFOEacIs4S5xRxRjijmFOcU8QZ4YxiTnFOEWeEM4p5xThGnCLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniLOEucUcUY4o5hTnFPEGeGMYk4xpxFniHOk3iT7L3/D/S/zJ9n9cBM6w/27SbtJdgcuxg7j+x8eJPuvbofD3W3/1t/udrf96/Z2t7v9F3vbi/b23m63v/d/Ik2SJEmSJEmSJEmSJEmSJEmSJEmSJEmS1PwD0I0g/m7B4kkAAAAASUVORK5CYII=";

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [includeLogo, setIncludeLogo] = useState<LogoOption>('no');
  const [environment, setEnvironment] = useState<EnvironmentOption>('office');

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    setError(null);
    setIncludeLogo('no');
    setEnvironment('office');
  };

  const handleGenerate = useCallback(async () => {
    if (!uploadedImage) return;

    setStep('generating');
    setError(null);
    setGeneratedImages([]);

    const backgroundInstruction = environment === 'office'
      ? 'um escritório moderno e com leve desfoque'
      : 'um estúdio de pilates profissional e bem iluminado';

    const basePrompts = [
      {
        style: "Casual Corporativo",
        prompt: `Crie uma foto de perfil profissional para o LinkedIn a partir da imagem fornecida. O objetivo é um estilo casual-corporativo. Altere a roupa para uma camisa polo elegante ou uma blusa sofisticada, e o fundo para ${backgroundInstruction}. É crucial preservar com total fidelidade a aparência da pessoa: rosto, cabelo, acessórios (brincos, piercings, etc.) e a textura da pele devem permanecer inalterados.`,
      },
      {
        style: "Sério e Confiante",
        prompt: `Crie uma foto de perfil profissional para o LinkedIn a partir da imagem fornecida, com um estilo sério e confiante. Altere a roupa para um terno formal (para homens) ou um blazer profissional (para mulheres), e o fundo para ${backgroundInstruction}. É crucial preservar com total fidelidade a aparência da pessoa: rosto, cabelo, acessórios (brincos, piercings, etc.) e a textura da pele devem permanecer inalterados.`,
      },
      {
        style: "Profissional Intermediário",
        prompt: `Crie uma foto de perfil profissional para o LinkedIn a partir da imagem fornecida, buscando um equilíbrio entre formal e casual. Altere a roupa para uma camisa social sem gravata ou um blazer moderno, e o fundo para ${backgroundInstruction}. É crucial preservar com total fidelidade a aparência da pessoa: rosto, cabelo, acessórios (brincos, piercings, etc.) e a textura da pele devem permanecer inalterados.`,
      },
      {
        style: "Preto e Branco Elegante",
        prompt: "Crie uma foto de perfil profissional em preto e branco com alto contraste, estilo editorial de revista. O fundo deve ser totalmente preto. Altere a roupa para algo simples e elegante, como uma gola alta preta. É crucial preservar com total fidelidade a aparência da pessoa: rosto, cabelo, acessórios (brincos, piercings, etc.) e a textura da pele devem permanecer inalterados.",
      },
    ];
    
    const logoInstruction = includeLogo === 'yes'
      ? " Adicione o logo 'VOLL Pilates Group' discretamente no peito da roupa, como um bordado ou estampa. Importante: O logo deve ser composto APENAS PELO TEXTO 'VOLL Pilates Group', sem incluir ou criar nenhum ícone, símbolo ou elemento gráfico adicional." 
      : "";

    const prompts = basePrompts.map(p => ({
      style: p.style,
      prompt: p.prompt + logoInstruction,
    }));


    try {
      const imagePromises = prompts.map(p =>
        generateCorporateImage(uploadedImage, p.prompt)
      );
      
      const results = await Promise.all(imagePromises);

      const newGeneratedImages = results.map((src, index) => ({
        style: prompts[index].style,
        src: src
      }));

      setGeneratedImages(newGeneratedImages);
      setStep('results');
    } catch (err) {
      console.error(err);
      const detail = err instanceof Error ? err.message : "Por favor, tente novamente.";
      setError(`Não foi possível gerar as imagens. ${detail}`);
      setStep('upload');
    }
  }, [uploadedImage, includeLogo, environment]);

  const handleReset = () => {
    setStep('upload');
    setUploadedImage(null);
    setGeneratedImages([]);
    setError(null);
    setIncludeLogo('no');
    setEnvironment('office');
  };

  const renderContent = () => {
    switch (step) {
      case 'generating':
        return <LoadingState />;
      case 'results':
        return (
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-100 mb-8">Suas Fotos Corporativas Estão Prontas!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {generatedImages.map((image) => (
                <ImageResultCard key={image.style} src={image.src} title={image.style} />
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={handleReset}
                className="bg-voll-primary hover:brightness-110 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center mx-auto"
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Gerar Novas Opções
              </button>
            </div>
          </div>
        );
      case 'upload':
      default:
        return (
          <ImageUploader
            onImageUpload={handleImageUpload}
            onGenerate={handleGenerate}
            uploadedImage={uploadedImage}
            onClearImage={() => {
              setUploadedImage(null);
              setIncludeLogo('no');
              setEnvironment('office');
            }}
            includeLogo={includeLogo}
            onIncludeLogoChange={setIncludeLogo}
            environment={environment}
            onEnvironmentChange={setEnvironment}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <header className="w-full bg-voll-primary shadow-md">
        <div className="container mx-auto px-4 py-3">
            <img src={vollLogoBase64} alt="Grupo VOLL" className="h-10 w-auto" />
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center justify-center">
        {error && (
          <div className="bg-red-900/50 border-l-4 border-red-500 text-red-200 p-4 mb-6 w-full max-w-2xl" role="alert">
            <p className="font-bold">Erro</p>
            <p>{error}</p>
          </div>
        )}
        {renderContent()}
      </main>
      
      <footer className="w-full bg-voll-primary py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Grupo VOLL. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default App;