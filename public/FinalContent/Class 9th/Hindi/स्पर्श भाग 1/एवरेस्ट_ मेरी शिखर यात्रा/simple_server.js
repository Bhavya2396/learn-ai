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
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.woff2': 'font/woff2',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer((request, response) => {
  console.log(`Request URL: ${request.url}`);
  
  // Enable CORS for all requests
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
    return;
  }
  
  // If URL is '/', serve index.html
  let filePath = request.url === '/' 
    ? path.join(__dirname, 'index.html')
    : path.join(__dirname, request.url);
  
  // Security check: prevent directory traversal
  const resolvedPath = path.resolve(filePath);
  const serverRoot = path.resolve(__dirname);
  
  if (!resolvedPath.startsWith(serverRoot)) {
    response.writeHead(403, { 'Content-Type': 'text/plain' });
    response.end('403 Forbidden: Access denied');
    return;
  }
  
  // Get the file extension
  let extname = path.extname(filePath);
  let contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found - try to serve 404.html if it exists
        console.error(`File not found: ${filePath}`);
        
        const notFoundPath = path.join(__dirname, '404.html');
        fs.readFile(notFoundPath, (error, content) => {
          response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          if (error) {
            response.end(`
              <!DOCTYPE html>
              <html lang="hi">
              <head>
                <meta charset="UTF-8">
                <title>404 - पृष्ठ नहीं मिला</title>
                <style>
                  body { font-family: 'Noto Sans Devanagari', Arial, sans-serif; text-align: center; padding: 50px; }
                  h1 { color: #d32f2f; }
                  a { color: #1976d2; text-decoration: none; }
                  a:hover { text-decoration: underline; }
                </style>
              </head>
              <body>
                <h1>404 - पृष्ठ नहीं मिला</h1>
                <p>खुजा गया पृष्ठ उपलब्ध नहीं है।</p>
                <p><a href="/">मुख्य पृष्ठ पर वापस जाएं</a></p>
              </body>
              </html>
            `, 'utf-8');
          } else {
            response.end(content, 'utf-8');
          }
        });
      } else {
        // Server error
        console.error(`Server error: ${error.code}`);
        response.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(`
          <!DOCTYPE html>
          <html lang="hi">
          <head>
            <meta charset="UTF-8">
            <title>500 - सर्वर त्रुटि</title>
            <style>
              body { font-family: 'Noto Sans Devanagari', Arial, sans-serif; text-align: center; padding: 50px; }
              h1 { color: #d32f2f; }
            </style>
          </head>
          <body>
            <h1>500 - सर्वर त्रुटि</h1>
            <p>सर्वर में त्रुटि हुई है: ${error.code}</p>
          </body>
          </html>
        `);
      }
    } else {
      // Success - serve the file
      response.writeHead(200, { 
        'Content-Type': contentType + (contentType.startsWith('text/') ? '; charset=utf-8' : '')
      });
      response.end(content, 'utf-8');
    }
  });
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try a different port or stop the other server.`);
  } else {
    console.error('Server error:', error);
  }
});

server.listen(PORT, () => {
  console.log(`
🏔️  एवरेस्ट: मेरी शिखर यात्रा सर्वर चालू!
📍 Server running at: http://localhost:${PORT}/
🌐 Web interface: http://localhost:${PORT}/
📚 Interactive Hindi lesson based on Bachendri Pal's Everest journey

Press Ctrl+C to stop the server
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n📴 Server shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server stopped successfully');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n📴 Server received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server stopped successfully');
    process.exit(0);
  });
});
