/**
 * Simple HTTP Server for Diary Ka Ek Panna
 * Serves the interactive Hindi lesson locally
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8'
};

// Default port
const PORT = process.env.PORT || 3000;

// Create server
const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
    
    // Handle root path
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Remove leading slash and decode URL
    const filePath = path.join(__dirname, decodeURIComponent(pathname.slice(1)));
    
    // Security check - prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 Forbidden');
        return;
    }
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <!DOCTYPE html>
                <html lang="hi">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>404 - पृष्ठ नहीं मिला</title>
                    <style>
                        body {
                            font-family: 'Noto Sans Devanagari', sans-serif;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            margin: 0;
                            padding: 0;
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .error-container {
                            background: white;
                            padding: 2rem;
                            border-radius: 10px;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                            text-align: center;
                            max-width: 500px;
                        }
                        .error-code {
                            font-size: 4rem;
                            color: #e74c3c;
                            margin: 0;
                        }
                        .error-message {
                            font-size: 1.5rem;
                            color: #2c3e50;
                            margin: 1rem 0;
                        }
                        .error-description {
                            color: #7f8c8d;
                            margin: 1rem 0;
                        }
                        .home-link {
                            display: inline-block;
                            background: #3498db;
                            color: white;
                            padding: 0.75rem 1.5rem;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 1rem;
                            transition: background 0.3s;
                        }
                        .home-link:hover {
                            background: #2980b9;
                        }
                    </style>
                </head>
                <body>
                    <div class="error-container">
                        <h1 class="error-code">404</h1>
                        <h2 class="error-message">पृष्ठ नहीं मिला</h2>
                        <p class="error-description">आप जिस पृष्ठ की तलाश कर रहे हैं, वह मौजूद नहीं है।</p>
                        <a href="/" class="home-link">मुख्य पृष्ठ पर वापस जाएं</a>
                    </div>
                </body>
                </html>
            `);
            return;
        }
        
        // Read and serve file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('500 Internal Server Error');
                return;
            }
            
            // Set headers
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            
            // Send file content
            res.end(data);
        });
    });
});

// Start server
server.listen(PORT, () => {
    console.log('🚀 Diary Ka Ek Panna Server Started!');
    console.log('📖 Interactive Hindi Lesson Server');
    console.log('🌐 Server running at:');
    console.log(`   Local:   http://localhost:${PORT}`);
    console.log(`   Network: http://0.0.0.0:${PORT}`);
    console.log('');
    console.log('📚 Available pages:');
    console.log(`   Main Lesson: http://localhost:${PORT}/`);
    console.log(`   CSS Files:   http://localhost:${PORT}/css/`);
    console.log(`   JS Files:    http://localhost:${PORT}/js/`);
    console.log('');
    console.log('💡 Tips:');
    console.log('   - Use Ctrl+C to stop the server');
    console.log('   - Refresh the page to see changes');
    console.log('   - Check browser console for any errors');
    console.log('');
    console.log('🎯 Ready to learn Hindi!');
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please try a different port.`);
        console.error('   You can set a different port using: PORT=3001 node simple_server.js');
    } else {
        console.error('❌ Server error:', err);
    }
    process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server stopped successfully');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server stopped successfully');
        process.exit(0);
    });
});

// Export server for testing
module.exports = server;
