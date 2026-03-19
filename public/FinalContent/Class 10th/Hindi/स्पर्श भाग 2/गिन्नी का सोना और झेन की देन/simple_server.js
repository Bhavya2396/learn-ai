const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// MIME types mapping
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

const server = http.createServer((request, response) => {
  console.log(`Request URL: ${request.url}`);
  
  // If URL is '/', serve index.html
  let filePath = request.url === '/' 
    ? path.join(__dirname, 'index.html')
    : path.join(__dirname, request.url);
  
  // Get the file extension
  let extname = path.extname(filePath);
  let contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        console.error(`File not found: ${filePath}`);
        
        fs.readFile(path.join(__dirname, '404.html'), (error, content) => {
          response.writeHead(404, { 'Content-Type': 'text/html' });
          response.end(content || '404 Not Found', 'utf-8');
        });
      } else {
        // Server error
        console.error(`Server error: ${error.code}`);
        response.writeHead(500);
        response.end(`Server Error: ${error.code}`);
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
  console.log(`Press Ctrl+C to stop the server`);
});
