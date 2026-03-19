/**
 * Simple HTTP server for testing the Kar Chale Hum Fida Interactive Hindi Module
 * 
 * Usage:
 * 1. Make sure you have Node.js installed
 * 2. Run this file using Node.js: `node simple_server.js`
 * 3. Open your browser and navigate to http://localhost:8080
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf'
};

// Create the HTTP server
const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);

    // Parse the URL and get the pathname
    let filePath = req.url;
    
    // If the URL is '/', serve the index.html file
    if (filePath === '/') {
        filePath = '/index.html';
    }

    // Determine the file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    
    // Set the content type based on the file extension
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    // Read the file from the filesystem
    fs.readFile(__dirname + filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                fs.readFile(__dirname + '/404.html', (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
                console.error(`Server Error: ${error.code}`);
            }
        } else {
            // Successful response
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server`);
});
