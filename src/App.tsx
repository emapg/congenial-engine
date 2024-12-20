import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ImageUploader } from './components/ImageUploader';
import { PreviewGrid } from './components/PreviewGrid';
import { GeneratorOptions } from './components/GeneratorOptions';
import { LoadingOverlay } from './components/LoadingOverlay';
import { DownloadSection } from './components/DownloadSection';
import { useFaviconGenerator } from './hooks/useFaviconGenerator';
import { DEFAULT_GENERATOR_OPTIONS } from './lib/constants';
import { createDownloadPackage } from './lib/downloadUtils';
import type { GeneratorOptions as Options } from './types/favicon';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [options, setOptions] = useState<Options>(DEFAULT_GENERATOR_OPTIONS);
  const { generate, isGenerating, error, result } = useFaviconGenerator();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    await generate(selectedImage, options);
  };

  const handleDownload = async () => {
    if (!result) return;
    
    try {
      const blob = await createDownloadPackage(result);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'favicon-package.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating download package:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">
                Favicon Generator
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ImageUploader onImageSelect={handleImageSelect} />
              
              {selectedImage && (
                <div className="mt-6">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`w-full px-4 py-2 rounded-md text-white font-medium
                      ${isGenerating
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Favicons'}
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-md">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {result && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold mb-4">Preview</h2>
                  <PreviewGrid previewUrls={result.sizes} />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <GeneratorOptions
              options={options}
              onChange={setOptions}
            />

            {result && (
              <DownloadSection
                package={result}
                onDownload={handleDownload}
              />
            )}
          </div>
        </div>
      </main>

      {isGenerating && (
        <LoadingOverlay message="Generating favicons..." />
      )}
    </div>
  );
}

export default App;