import React from 'react';
import { GeneratorOptions } from '../types/favicon';

interface GeneratorFormProps {
  options: GeneratorOptions;
  onChange: (options: GeneratorOptions) => void;
}

export function GeneratorForm({ options, onChange }: GeneratorFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...options, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Website Name
        </label>
        <input
          type="text"
          name="name"
          value={options.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Short Name
        </label>
        <input
          type="text"
          name="shortName"
          value={options.shortName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Theme Color
          </label>
          <input
            type="color"
            name="themeColor"
            value={options.themeColor}
            onChange={handleChange}
            className="mt-1 block w-full h-10 rounded-md border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Background Color
          </label>
          <input
            type="color"
            name="backgroundColor"
            value={options.backgroundColor}
            onChange={handleChange}
            className="mt-1 block w-full h-10 rounded-md border-gray-300"
          />
        </div>
      </div>
    </div>
  );
}