import React from 'react';
import { Settings, Palette } from 'lucide-react';
import { GeneratorOptions as Options } from '../types/favicon';
import { DEFAULT_GENERATOR_OPTIONS } from '../lib/constants';

interface GeneratorOptionsProps {
  options: Options;
  onChange: (options: Options) => void;
}

export function GeneratorOptions({ options, onChange }: GeneratorOptionsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...options, [name]: value });
  };

  const resetOptions = () => {
    onChange(DEFAULT_GENERATOR_OPTIONS);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Generator Options
        </h2>
        <button
          onClick={resetOptions}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset to defaults
        </button>
      </div>

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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 text-sm"
            placeholder="My Awesome Website"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 text-sm"
            placeholder="Website"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Palette className="w-4 h-4 mr-1" />
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
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Palette className="w-4 h-4 mr-1" />
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
    </div>
  );
}