/**
 * Simple HTTP server for local development of The Sound of Music interactive lesson
 * 
 * This server serves static files from the current directory
 * Run with: node simple_server.js
 * Then access in browser at: http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Port for the server to listen on
const PORT = 3000;

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
    '.txt': 'text/plain'
};

// Create the server
const server = http.createServer((req, res) => {
    // Parse the request URL
    const parsedUrl = url.parse(req.url);
    
    // Get the file path
    let filePath = '.' + parsedUrl.pathname;
    
    // Default to index.html if root path
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Get the file extension
    const extname = path.extname(filePath);
    
    // Set the content type based on file extension
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                fs.readFile('./404.html', (error, content) => {
                    if (error) {
                        // If 404.html is not found, send a plain text response
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('404 Not Found');
                    } else {
                        // Send 404.html
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success - file found
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════╗
║                                                    ║
║    The Sound of Music - Interactive Lesson         ║
║                                                    ║
║    Server running at http://localhost:${PORT}         ║
║                                                    ║
╚════════════════════════════════════════════════════╝
    `);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please choose a different port.`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});