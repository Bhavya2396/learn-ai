const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME types for different file extensions
const mimeTypes = {
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
    '.txt': 'text/plain'
};

// Create server
const server = http.createServer((req, res) => {
    // Normalize URL by removing query strings and trailing slashes
    let url = req.url.split('?')[0];
    if (url.endsWith('/') && url.length > 1) {
        url = url.slice(0, -1);
    }
    
    // Handle root URL
    if (url === '/' || url === '') {
        url = '/index.html';
    }
    
    // Get file path
    const filePath = path.join(__dirname, url);
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found');
            return;
        }
        
        // Get file extension
        const extname = path.extname(filePath);
        
        // Set content type
        const contentType = mimeTypes[extname] || 'text/plain';
        
        // Read and serve file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('500 Internal Server Error');
                return;
            }
            
            // Set headers and serve content
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

// Start server
const port = process.env.PORT || 5000;
const hostname = process.env.HOST || '127.0.0.1';
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Press Ctrl+C to stop the server.`);
});
