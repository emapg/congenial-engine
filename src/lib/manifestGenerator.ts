import { ManifestData } from '../types/favicon';

export function generateManifest(
  data: ManifestData,
  icons: Record<string, string>
): string {
  const manifest = {
    name: data.name,
    short_name: data.shortName,
    icons: Object.entries(icons).map(([size, url]) => {
      const [width] = size.split('x');
      return {
        src: url,
        sizes: size,
        type: 'image/png',
        purpose: 'any maskable'
      };
    }),
    theme_color: data.themeColor,
    background_color: data.backgroundColor,
    display: 'standalone'
  };

  return JSON.stringify(manifest, null, 2);
}

export function generateHtmlTags(
  icons: Record<string, string>,
  manifest: string
): string {
  const tags = [
    `<link rel="manifest" href="${manifest}">`,
    `<meta name="theme-color" content="${manifest.theme_color}">`,
    ...Object.entries(icons).map(([size, url]) => {
      const [width] = size.split('x');
      if (size === '180x180') {
        return `<link rel="apple-touch-icon" sizes="${size}" href="${url}">`;
      }
      return `<link rel="icon" type="image/png" sizes="${size}" href="${url}">`;
    })
  ];

  return tags.join('\n');
}