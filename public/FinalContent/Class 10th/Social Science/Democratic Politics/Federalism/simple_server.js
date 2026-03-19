// Simple HTTP server for the Constitutional Design interactive lesson
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3003;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url}`);
    
    // Get the file path from the URL
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Get the file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    
    // MIME types for common file extensions
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
        '.pdf': 'application/pdf'
    };
    
    // Set the content type based on the file extension
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Read the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'index.html'), (error, content) => {
                    if (error) {
                        res.writeHead(404);
                        res.end('File not found');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log('Open your browser and navigate to this address to view the interactive lesson');
    console.log('Press Ctrl+C to stop the server');
    
    // Kill any existing processes on this port if needed
    process.on('SIGINT', () => {
        console.log('Shutting down server...');
        server.close();
        process.exit(0);
    });
});
