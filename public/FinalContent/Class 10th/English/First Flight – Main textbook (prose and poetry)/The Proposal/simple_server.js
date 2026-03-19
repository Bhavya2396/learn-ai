/**
 * Simple HTTP server for the interactive lesson
 * Usage: node simple_server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define the port
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
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf'
};

// Create the server
const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);
    
    // Parse the URL
    const parsedUrl = url.parse(req.url);
    
    // Get the path name
    let pathname = parsedUrl.pathname;
    
    // If path ends with '/', serve index.html
    if (pathname.endsWith('/')) {
        pathname += 'index.html';
    }
    
    // Get the file path
    const filePath = path.join(__dirname, pathname);
    
    // Get the file extension
    const ext = path.extname(filePath);
    
    // Determine the content type
    const contentType = MIME_TYPES[ext] || 'text/plain';
    
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }
        
        // Read the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
                return;
            }
            
            // Success!
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
    console.log('To access the lesson, open your browser and navigate to:');
    console.log(`http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop the server');
});
