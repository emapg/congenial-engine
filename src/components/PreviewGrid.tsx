import React from 'react';

interface PreviewGridProps {
  previewUrls: {
    [key: string]: string;
  };
}

export function PreviewGrid({ previewUrls }: PreviewGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(previewUrls).map(([size, url]) => (
        <div key={size} className="bg-white p-4 rounded-lg shadow">
          <div className="aspect-square relative mb-2">
            <img
              src={url}
              alt={`Favicon ${size}`}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
          <p className="text-sm text-center text-gray-600">{size}</p>
        </div>
      ))}
    </div>
  );
}