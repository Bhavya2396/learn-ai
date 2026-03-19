/**
 * Simple HTTP Server for the A Triumph of Surgery Interactive Lesson
 * 
 * This script creates a basic HTTP server to run the interactive lesson locally.
 * It serves static files and handles basic MIME types.
 * 
 * Usage:
 * 1. Make sure Node.js is installed on your computer
 * 2. Run this file using Node.js: node simple_server.js
 * 3. Open a web browser and navigate to http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Port on which the server will run
const PORT = 8080;

// MIME types for different file extensions
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
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.pdf': 'application/pdf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf'
};

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url);
    
    // Extract the pathname from the URL
    let pathname = parsedUrl.pathname;
    
    // If requesting the root, serve index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Resolve the file path from the current directory
    const filePath = path.join(__dirname, pathname);
    
    // Get the file extension
    const extname = path.extname(filePath);
    
    // Set the default content type to plain text
    let contentType = MIME_TYPES[extname] || 'text/plain';
    
    // Read the file and serve it
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If the file doesn't exist or there's another error
            if (err.code === 'ENOENT') {
                // File not found, serve a 404 page
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<html><body><h1>404 Not Found</h1><p>The requested URL ' + pathname + ' was not found on this server.</p></body></html>');
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<html><body><h1>500 Internal Server Error</h1><p>' + err.message + '</p></body></html>');
            }
        } else {
            // Set the Content-Type header and send the file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server`);
});
