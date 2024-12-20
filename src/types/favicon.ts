export type FaviconSize = '16x16' | '32x32' | '48x48' | '72x72' | '96x96' | '120x120' | 
  '128x128' | '144x144' | '152x152' | '180x180' | '192x192' | '384x384' | '512x512';

export interface GeneratorOptions {
  name: string;
  shortName: string;
  themeColor: string;
  backgroundColor: string;
  sizes: readonly FaviconSize[];
}

export interface ManifestData {
  name: string;
  shortName: string;
  themeColor: string;
  backgroundColor: string;
}

export interface FaviconPackage {
  sizes: Record<string, string>;
  manifest: ManifestData;
  html: string;
}