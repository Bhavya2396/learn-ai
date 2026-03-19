// Simple HTTP server for testing
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    // Parse URL
    let parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Normalize pathname to serve index.html for root requests
    if (pathname === '/' || pathname === '') {
        pathname = '/index.html';
    }

    // Get the file extension
    let ext = path.parse(pathname).ext;

    // Map file extension to MIME type
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    // Convert pathname to filesystem path
    let filePath = path.join(__dirname, pathname);
    console.log(`Serving: ${filePath}`);

    // Check if file exists
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // File not found
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404: File Not Found');
                return;
            }
            
            // Some other error
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
            return;
        }

        // Success - send the file
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(data);
    });
});

// Server port
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server`);
});
