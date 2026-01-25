const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * Utility to download media files into the public directory.
 * Usage: node scripts/download-media.js <URL> <filename.ext>
 */

const downloadMedia = (url, fileName) => {
  // Determine if it's a picture or video based on extension
  const isVideo = /\.(mp4|webm|ogg)$/i.test(fileName);
  const subFolder = isVideo ? 'videos' : 'pictures';
  
  // Define the absolute path in the public folder
  const targetDir = path.join(__dirname, '../public', subFolder);
  const destPath = path.join(targetDir, fileName);

  // Ensure directories exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const file = fs.createWriteStream(destPath);

  https.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download: Status Code ${response.statusCode}`);
      return;
    }

    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log(`Successfully saved to: /public/${subFolder}/${fileName}`);
    });
  }).on('error', (err) => {
    fs.unlink(destPath, () => {}); // Delete partial file on error
    console.error(`Download error: ${err.message}`);
  });
};

// Execute based on CLI arguments
const [,, url, fileName] = process.argv;

if (!url || !fileName) {
  console.log('Usage: node scripts/download-media.js <URL> <fileName>');
  process.exit(1);
}

downloadMedia(url, fileName);
