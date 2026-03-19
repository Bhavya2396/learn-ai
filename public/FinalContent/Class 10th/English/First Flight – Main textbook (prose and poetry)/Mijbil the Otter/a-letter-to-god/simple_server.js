/**
 * Simple HTTP server for serving the A Letter to God interactive lesson
 * 
 * This file provides a basic server that can serve static files from the directory.
 * It's useful for development and testing the interactive lesson without requiring
 * additional server setup.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Map file extensions to MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((request, response) => {
    console.log(`Request URL: ${request.url}`);
    
    // Parse the URL and get the pathname
    let pathname = url.parse(request.url).pathname;
    
    // If the URL path ends with '/', serve the index.html
    if (pathname === '/' || pathname === '') {
        pathname = '/index.html';
    }
    
    // Create an absolute path to the requested file
    const filePath = path.join(__dirname, pathname);
    
    // Get the file extension
    const extname = path.extname(filePath);
    
    // Set the default content type to application/octet-stream
    let contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Check if the file exists
    fs.exists(filePath, (exists) => {
        if (!exists) {
            // If the file doesn't exist, return 404
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<h1>404 Not Found</h1><p>The requested URL ' + pathname + ' was not found on this server.</p>');
            return;
        }
        
        // If the file exists, read it and serve it
        fs.readFile(filePath, (error, content) => {
            if (error) {
                // If there's an error reading the file, return 500
                if (error.code === 'ENOENT') {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end('<h1>404 Not Found</h1><p>The requested URL ' + pathname + ' was not found on this server.</p>');
                } else {
                    response.writeHead(500, { 'Content-Type': 'text/html' });
                    response.end('<h1>500 Internal Server Error</h1><p>Sorry, there was a problem processing your request.</p>');
                    console.error(error);
                }
            } else {
                // If the file is read successfully, serve it with the correct content type
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    });
});

// Set the port (default to 3000)
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server`);
});
