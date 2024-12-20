import Sharp from 'sharp';

export async function generateFaviconSizes(
  imageBuffer: ArrayBuffer,
  sizes: string[]
): Promise<Record<string, ArrayBuffer>> {
  const results: Record<string, ArrayBuffer> = {};
  
  for (const size of sizes) {
    const [width, height] = size.split('x').map(Number);
    const processedBuffer = await Sharp(imageBuffer)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();
    
    results[size] = processedBuffer;
  }

  return results;
}

export async function generateIcoFile(
  imageBuffer: ArrayBuffer,
  sizes: string[] = ['16x16', '32x32', '48x48']
): Promise<ArrayBuffer> {
  const sharp = Sharp(imageBuffer);
  return sharp
    .resize(48, 48)
    .toFormat('ico')
    .toBuffer();
}