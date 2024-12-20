export const FAVICON_SIZES = [
  '16x16',
  '32x32',
  '48x48',
  '72x72',
  '96x96',
  '120x120',
  '128x128',
  '144x144',
  '152x152',
  '180x180',
  '192x192',
  '384x384',
  '512x512',
] as const;

export const DEFAULT_GENERATOR_OPTIONS: GeneratorOptions = {
  name: 'My Website',
  shortName: 'Website',
  themeColor: '#ffffff',
  backgroundColor: '#ffffff',
  sizes: FAVICON_SIZES,
};