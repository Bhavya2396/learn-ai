/**
 * Simple HTTP Server for Madam Rides the Bus Interactive Lesson
 * 
 * This script creates a basic HTTP server to serve the lesson files.
 * Run with: node simple_server.js
 * 
 * Access at: http://localhost:8080
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf'
};

// Create HTTP server
const server = http.createServer((request, response) => {
  console.log(`Request URL: ${request.url}`);

  // Extract URL path
  let filePath = request.url;
  
  // Handle root URL
  if (filePath === '/') {
    filePath = '/index.html';
  }
  
  // Construct complete file path
  filePath = path.join(__dirname, filePath);
  
  // Get file extension and corresponding MIME type
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read and serve the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        fs.readFile(path.join(__dirname, '404.html'), (error, content) => {
          response.writeHead(404, { 'Content-Type': 'text/html' });
          response.end(content, 'utf-8');
        });
      } else {
        // Server error
        response.writeHead(500);
        response.end(`Server Error: ${error.code}`);
      }
    } else {
      // Success - serve the file
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
});

// Set port and start server
const port = 8000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Press Ctrl+C to stop the server`);
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Try a different port.`);
  } else {
    console.error(`Server error: ${err.message}`);
  }
  process.exit(1);
});

// Create a basic 404.html file if it doesn't exist
const notFoundPath = path.join(__dirname, '404.html');
if (!fs.existsSync(notFoundPath)) {
  const notFoundContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #e74c3c;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <p><a href="/">Go to Homepage</a></p>
    </div>
</body>
</html>
  `;
  fs.writeFileSync(notFoundPath, notFoundContent);
}
