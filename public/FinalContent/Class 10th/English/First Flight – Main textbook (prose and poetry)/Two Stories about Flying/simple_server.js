/**
 * Simple HTTP Server for Two Stories about Flying interactive lesson
 * 
 * This server allows you to serve the HTML files locally without CORS issues.
 * It requires Node.js to run.
 * 
 * Usage:
 * 1. Install Node.js if not already installed: https://nodejs.org/
 * 2. Open a terminal/command prompt
 * 3. Navigate to this directory
 * 4. Run: node simple_server.js
 * 5. Open your browser and go to: http://localhost:8080
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Port to listen on
const PORT = 8080;

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
};

// Create the HTTP server
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);

  // Handle the request
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendError(res, 405, 'Method Not Allowed');
    return;
  }

  // Parse URL to get the file path
  let filePath;
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else {
    filePath = path.join(__dirname, req.url);
  }

  // Get the file extension
  const extname = path.extname(filePath).toLowerCase();

  // Determine the content type based on the file extension
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  // Read the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If the file is not found, send 404
      if (err.code === 'ENOENT') {
        sendError(res, 404, 'Not Found');
      } else {
        // For other errors, send 500
        sendError(res, 500, 'Internal Server Error');
      }
      return;
    }

    // If everything is OK, send the file
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Helper function to send error responses
function sendError(res, statusCode, message) {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
  res.end(`${statusCode} - ${message}`);
}

// Start the server
server.listen(PORT, () => {
  console.log(`
    =========================================
    Two Stories about Flying
    Interactive English Lesson Server
    =========================================
    
    Server running at http://localhost:${PORT}
    
    Open your browser and visit:
    http://localhost:${PORT}
    
    Press Ctrl+C to stop the server
  `);
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Error: Port ${PORT} is already in use. Try a different port.`);
  } else {
    console.error('Server error:', err);
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nServer stopped');
  process.exit(0);
});
