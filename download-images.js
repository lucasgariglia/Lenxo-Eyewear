import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OUTPUT_DIR = path.join(__dirname, 'public', 'images');
const SRC_DIR = __dirname; 
const EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx'];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Regex to find Unsplash URLs (captures the ID)
// Matches: https://images.unsplash.com/photo-12345...
const urlRegex = /(https:\/\/images\.unsplash\.com\/photo-[\w-]+)([^"'\s`)]*)/g;

const processedIDs = new Set();

function scanDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        // Ignore common build/config folders to speed up scanning
        if (stat.isDirectory() && !['node_modules', '.git', 'public', 'dist', 'build'].includes(file)) {
            scanDirectory(fullPath);
        } else if (EXTENSIONS.includes(path.extname(file)) && file !== 'download-images.js') {
            processFile(fullPath);
        }
    });
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Replace function that handles the match
    const newContent = content.replace(urlRegex, (fullMatch, baseUrl, params) => {
        
        // Extract ID (e.g. photo-159107...)
        const photoId = baseUrl.split('/').pop();
        const filename = `lenxo-${photoId}.jpg`;
        // In the React app, public/images/x.jpg is accessed via /images/x.jpg
        const localPath = `/images/${filename}`; 
        const savePath = path.join(OUTPUT_DIR, filename);

        // Download High-Res version if we haven't processed this ID yet
        if (!processedIDs.has(photoId)) {
            processedIDs.add(photoId);
            
            // Force high quality download url regardless of what was in the code
            const downloadUrl = `${baseUrl}?q=85&w=2000&auto=format&fit=crop`;
            
            if (!fs.existsSync(savePath)) {
                console.log(`Downloading HD Asset: ${filename}`);
                downloadImage(downloadUrl, savePath);
            }
        }

        hasChanges = true;
        return localPath;
    });

    if (hasChanges) {
        console.log(`Updated references in: ${filePath}`);
        fs.writeFileSync(filePath, newContent, 'utf8');
    }
}

function downloadImage(url, savePath) {
    const file = fs.createWriteStream(savePath);
    https.get(url, function(response) {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => file.close());
        } else {
            console.error(`Failed to download ${url}: Status ${response.statusCode}`);
            fs.unlink(savePath, () => {}); // Delete empty file
        }
    }).on('error', function(err) {
        fs.unlink(savePath, () => {}); 
        console.error(`Error downloading: ${err.message}`);
    });
}

console.log('--- STARTING MIGRATION (ESM Mode) ---');
console.log('1. Scanning for Unsplash links...');
console.log('2. Downloading High-Res (2000px) versions...');
console.log('3. Rewriting source code to use local /public/images/...');
console.log('--------------------------');

scanDirectory(SRC_DIR);

console.log('--------------------------');
console.log('MIGRATION COMPLETE.');
console.log('Please restart your dev server if needed.');
