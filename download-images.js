const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const OUTPUT_DIR = './public/images';
const SRC_DIR = './'; // Root directory to scan
const EXTENSIONS = ['.tsx', '.ts', '.js', '.jsx'];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Regex to find Unsplash URLs
const urlRegex = /https:\/\/images\.unsplash\.com\/[^"'\s`)]+/g;
const downloaded = new Set();
const mapping = {};

function scanDirectory(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git' && file !== 'public') {
            scanDirectory(fullPath);
        } else if (EXTENSIONS.includes(path.extname(file))) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const matches = content.match(urlRegex);
            
            if (matches) {
                matches.forEach(url => processUrl(url));
            }
        }
    });
}

function processUrl(url) {
    // Clean URL (remove quotes if captured or params if unwanted, though params often control crop)
    // We keep params for Unsplash as they control quality/crop
    const cleanUrl = url.split('?')[0]; 
    
    // Generate a unique filename based on the photo ID
    const photoId = cleanUrl.split('/').pop();
    const filename = `lenxo-${photoId}.jpg`;
    const localPath = path.join(OUTPUT_DIR, filename);

    if (!downloaded.has(url)) {
        downloaded.add(url);
        
        // Map original full URL to local path
        mapping[url] = `/images/${filename}`;

        console.log(`Downloading: ${filename}...`);
        
        const file = fs.createWriteStream(localPath);
        https.get(url, function(response) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
            });
        }).on('error', function(err) {
            fs.unlink(localPath); 
            console.error(`Error downloading ${filename}: ${err.message}`);
        });
    }
}

console.log('Scanning for images...');
scanDirectory(SRC_DIR);

// Optional: Write a mapping file to help you find/replace later
process.on('exit', () => {
    fs.writeFileSync('image-map.json', JSON.stringify(mapping, null, 2));
    console.log('\nDone! Check image-map.json for your URL replacements.');
});