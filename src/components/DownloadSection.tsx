import React from 'react';
import { Download } from 'lucide-react';
import { FaviconPackage } from '../types/favicon';

interface DownloadSectionProps {
  package: FaviconPackage;
  onDownload: () => void;
}

export function DownloadSection({ package: faviconPackage, onDownload }: DownloadSectionProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Download Package
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded border">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            HTML Tags
          </h4>
          <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
            {faviconPackage.html}
          </pre>
        </div>

        <div className="bg-white p-4 rounded border">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Web Manifest
          </h4>
          <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
            {JSON.stringify(faviconPackage.manifest, null, 2)}
          </pre>
        </div>

        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Package
        </button>
      </div>
    </div>
  );
}