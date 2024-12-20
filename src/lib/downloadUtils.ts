import JSZip from 'jszip';
import { FaviconPackage } from '../types/favicon';

export async function createDownloadPackage(faviconPackage: FaviconPackage): Promise<Blob> {
  const zip = new JSZip();

  // Add manifest file
  zip.file(
    'manifest.json',
    JSON.stringify(faviconPackage.manifest, null, 2)
  );

  // Add HTML snippet
  zip.file('favicon-tags.html', faviconPackage.html);

  // Create icons folder
  const iconsFolder = zip.folder('icons');
  
  // Add all favicon images
  for (const [size, url] of Object.entries(faviconPackage.sizes)) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = size === 'ico' ? 'favicon.ico' : `favicon-${size}.png`;
      iconsFolder?.file(filename, blob);
    } catch (error) {
      console.error(`Error downloading ${size} favicon:`, error);
    }
  }

  // Generate README
  const readme = `# Favicon Package
Generated with Favicon Generator

## Installation

1. Copy all files from the 'icons' folder to your website's root directory
2. Insert the HTML code from 'favicon-tags.html' into the <head> section of your HTML
3. Copy 'manifest.json' to your website's root directory

## Files included
- manifest.json (Web App Manifest)
- favicon-tags.html (HTML code for favicons)
- icons/ (Directory containing all favicon files)
  ${Object.keys(faviconPackage.sizes)
    .map(size => size === 'ico' ? '  - favicon.ico' : `  - favicon-${size}.png`)
    .join('\n')}
`;

  zip.file('README.md', readme);

  return zip.generateAsync({ type: 'blob' });
}