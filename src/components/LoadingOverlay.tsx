import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message: string;
}

export function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="mt-2 text-gray-700">{message}</p>
      </div>
    </div>
  );
}