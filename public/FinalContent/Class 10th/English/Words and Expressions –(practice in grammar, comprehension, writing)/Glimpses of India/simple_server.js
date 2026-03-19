/**
 * Simple HTTP server for the Glimpses of India interactive lesson
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf'
};

const server = http.createServer((request, response) => {
    console.log(`Request: ${request.url}`);

    // Normalize URL to prevent directory traversal
    let filePath = '.' + request.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Get the file extension
    const extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    // Read the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Page not found
                fs.readFile('./404.html', (error, content) => {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content || '404 Not Found', 'utf-8');
                });
            } else {
                // Server error
                response.writeHead(500);
                response.end(`Server Error: ${error.code}`);
                console.error(`Server Error: ${error.code}`);
            }
        } else {
            // Success
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop');
    console.log('\nGlimpses of India - Interactive English Lesson');
    console.log('-------------------------------------------');
    console.log('This server provides access to the interactive lesson based on');
    console.log('"Glimpses of India" from the NCERT Class X English textbook.');
    console.log('\nFeatures:');
    console.log('- Interactive reading passages');
    console.log('- Vocabulary activities');
    console.log('- Grammar exercises');
    console.log('- Audio narration');
    console.log('- Progress tracking');
});
