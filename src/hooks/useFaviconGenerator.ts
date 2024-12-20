import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { generateFaviconSizes, generateIcoFile } from '../lib/imageProcessor';
import { generateManifest, generateHtmlTags } from '../lib/manifestGenerator';
import { FaviconPackage, GeneratorOptions } from '../types/favicon';

export function useFaviconGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FaviconPackage | null>(null);

  const generate = async (file: File, options: GeneratorOptions) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Read file as ArrayBuffer
      const buffer = await file.arrayBuffer();
      
      // Generate favicons for all sizes
      const faviconBuffers = await generateFaviconSizes(buffer, options.sizes);
      const icoBuffer = await generateIcoFile(buffer);
      
      // Upload to Supabase Storage
      const uploads = await Promise.all(
        Object.entries(faviconBuffers).map(async ([size, buffer]) => {
          const path = `favicons/${Date.now()}/${size}.png`;
          const { data, error } = await supabase.storage
            .from('favicon-images')
            .upload(path, buffer);
            
          if (error) throw error;
          
          const { data: { publicUrl } } = supabase.storage
            .from('favicon-images')
            .getPublicUrl(path);
            
          return [size, publicUrl];
        })
      );
      
      // Upload ICO file
      const { data: icoData } = await supabase.storage
        .from('favicon-images')
        .upload(`favicons/${Date.now()}/favicon.ico`, icoBuffer);
      
      const { data: { publicUrl: icoUrl } } = supabase.storage
        .from('favicon-images')
        .getPublicUrl(icoData.path);
      
      // Create favicon package
      const sizes = Object.fromEntries(uploads);
      const manifest = generateManifest(options, sizes);
      const html = generateHtmlTags(sizes, manifest);
      
      const faviconPackage: FaviconPackage = {
        sizes: { ...sizes, ico: icoUrl },
        manifest: {
          name: options.name,
          shortName: options.shortName,
          themeColor: options.themeColor,
          backgroundColor: options.backgroundColor
        },
        html
      };
      
      // Save to database
      const { error: dbError } = await supabase
        .from('favicons')
        .insert({
          original_image: sizes['512x512'], // Use largest size as original
          favicon_package: faviconPackage
        });
        
      if (dbError) throw dbError;
      
      setResult(faviconPackage);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generate,
    isGenerating,
    error,
    result
  };
}