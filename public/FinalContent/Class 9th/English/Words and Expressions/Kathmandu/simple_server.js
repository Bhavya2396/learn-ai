/**
 * Simple HTTP server for local development
 * This file provides a basic server to run the interactive lesson locally
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

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
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    // Handle GET requests
    if (req.method === 'GET') {
        // Normalize the URL to prevent directory traversal attacks
        let url = req.url;
        
        // Handle root path
        if (url === '/') {
            url = '/index.html';
        }
        
        // Remove query parameters
        url = url.split('?')[0];
        
        // Resolve the file path
        const filePath = path.join(__dirname, url);
        
        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // File not found
                res.statusCode = 404;
                res.end('File not found');
                return;
            }
            
            // Get the file extension to determine the MIME type
            const ext = path.extname(filePath);
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            
            // Read and serve the file
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Internal server error');
                    return;
                }
                
                // Set the appropriate content type and serve the file
                res.setHeader('Content-Type', contentType);
                res.end(data);
            });
        });
    } else {
        // Handle other HTTP methods
        res.statusCode = 405;
        res.end('Method Not Allowed');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server`);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Try a different port.`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});
