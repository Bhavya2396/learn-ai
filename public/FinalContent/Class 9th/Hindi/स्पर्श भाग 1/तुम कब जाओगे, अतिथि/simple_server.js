/**
 * Simple HTTP Server for Chapter 3 Educational Module
 * तुम कब जाओगे, अतिथि - शरद जोशी
 * 
 * A lightweight Node.js server to serve the educational content
 * with proper MIME types and CORS support for development.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Server configuration
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

// MIME type mappings
const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.htm': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

// Get MIME type based on file extension
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'application/octet-stream';
}

// Log with timestamp
function log(message) {
    const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);
    console.log(`[${timestamp}] ${message}`);
}

// Serve static files
function serveStaticFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 - फ़ाइल नहीं मिली</title>
                        <style>
                            body { 
                                font-family: Arial, sans-serif; 
                                text-align: center; 
                                margin-top: 50px;
                                background: #f5f5f5;
                            }
                            .error-container {
                                background: white;
                                padding: 40px;
                                border-radius: 10px;
                                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                                display: inline-block;
                                margin: 20px;
                            }
                            h1 { color: #e74c3c; }
                            p { color: #666; margin: 20px 0; }
                            a { color: #3498db; text-decoration: none; }
                            a:hover { text-decoration: underline; }
                        </style>
                    </head>
                    <body>
                        <div class="error-container">
                            <h1>404 - फ़ाइल नहीं मिली</h1>
                            <p>माफ़ करें, आपके द्वारा मांगी गई फ़ाइल उपलब्ध नहीं है।</p>
                            <p><a href="/">होम पेज पर वापस जाएं</a></p>
                        </div>
                    </body>
                    </html>
                `);
            } else {
                // Other server error
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>500 - सर्वर त्रुटि</title>
                        <style>
                            body { 
                                font-family: Arial, sans-serif; 
                                text-align: center; 
                                margin-top: 50px;
                                background: #f5f5f5;
                            }
                            .error-container {
                                background: white;
                                padding: 40px;
                                border-radius: 10px;
                                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                                display: inline-block;
                                margin: 20px;
                            }
                            h1 { color: #e74c3c; }
                            p { color: #666; }
                        </style>
                    </head>
                    <body>
                        <div class="error-container">
                            <h1>500 - सर्वर त्रुटि</h1>
                            <p>सर्वर में कोई समस्या है। कृपया बाद में दोबारा कोशिश करें।</p>
                        </div>
                    </body>
                    </html>
                `);
            }
            log(`Error serving ${filePath}: ${err.message}`);
            return;
        }

        // Successful file serve
        const mimeType = getMimeType(filePath);
        const headers = {
            'Content-Type': mimeType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        };

        res.writeHead(200, headers);
        res.end(data);
        log(`Served: ${filePath} (${mimeType})`);
    });
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Handle OPTIONS requests for CORS
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end();
        return;
    }

    // Security: Prevent directory traversal
    pathname = decodeURIComponent(pathname);
    if (pathname.includes('..') || pathname.includes('~')) {
        res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>403 - पहुंच निषेध</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        text-align: center; 
                        margin-top: 50px;
                        background: #f5f5f5;
                    }
                    .error-container {
                        background: white;
                        padding: 40px;
                        border-radius: 10px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        display: inline-block;
                        margin: 20px;
                    }
                    h1 { color: #e74c3c; }
                    p { color: #666; }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1>403 - पहुंच निषेध</h1>
                    <p>आपको इस संसाधन तक पहुंचने की अनुमति नहीं है।</p>
                </div>
            </body>
            </html>
        `);
        log(`Blocked potentially dangerous request: ${pathname}`);
        return;
    }

    // Default to index.html for root path
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Construct file path
    const filePath = path.join(__dirname, pathname);

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File doesn't exist, serve 404
            serveStaticFile(filePath, res);
            return;
        }

        // Check if it's a directory
        fs.stat(filePath, (err, stats) => {
            if (err) {
                serveStaticFile(filePath, res);
                return;
            }

            if (stats.isDirectory()) {
                // Try to serve index.html from directory
                const indexPath = path.join(filePath, 'index.html');
                fs.access(indexPath, fs.constants.F_OK, (err) => {
                    if (err) {
                        // No index.html, serve directory listing
                        fs.readdir(filePath, (err, files) => {
                            if (err) {
                                serveStaticFile(filePath, res);
                                return;
                            }

                            const html = `
                                <!DOCTYPE html>
                                <html>
                                <head>
                                    <title>Directory Listing - ${pathname}</title>
                                    <style>
                                        body { 
                                            font-family: Arial, sans-serif; 
                                            margin: 40px;
                                            background: #f8f9fa;
                                        }
                                        .container {
                                            background: white;
                                            padding: 30px;
                                            border-radius: 8px;
                                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                        }
                                        h1 { color: #333; border-bottom: 2px solid #8b4513; padding-bottom: 10px; }
                                        ul { list-style: none; padding: 0; }
                                        li { 
                                            margin: 10px 0; 
                                            padding: 10px;
                                            background: #f8f9fa;
                                            border-radius: 4px;
                                        }
                                        a { 
                                            color: #8b4513; 
                                            text-decoration: none; 
                                            font-weight: 500;
                                        }
                                        a:hover { text-decoration: underline; }
                                        .back { margin-bottom: 20px; }
                                        .file-icon { margin-right: 8px; }
                                    </style>
                                </head>
                                <body>
                                    <div class="container">
                                        <h1>📁 Directory: ${pathname}</h1>
                                        ${pathname !== '/' ? '<div class="back"><a href="../">📁 .. (वापस जाएं)</a></div>' : ''}
                                        <ul>
                                            ${files.map(file => {
                                                const isDir = fs.statSync(path.join(filePath, file)).isDirectory();
                                                const icon = isDir ? '📁' : '📄';
                                                return `<li><span class="file-icon">${icon}</span><a href="${pathname === '/' ? '' : pathname}/${file}">${file}</a></li>`;
                                            }).join('')}
                                        </ul>
                                    </div>
                                </body>
                                </html>
                            `;
                            
                            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end(html);
                            log(`Served directory listing: ${pathname}`);
                        });
                    } else {
                        serveStaticFile(indexPath, res);
                    }
                });
            } else {
                // It's a file, serve it
                serveStaticFile(filePath, res);
            }
        });
    });
});

// Start the server
server.listen(PORT, HOST, () => {
    console.log('\n🚀 Chapter 3 Educational Module Server Started!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📚 तुम कब जाओगे, अतिथि - शरद जोशी`);
    console.log(`🌐 Server running at: http://${HOST}:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n💡 Usage Instructions:`);
    console.log(`   • Open your browser and go to: http://${HOST}:${PORT}`);
    console.log(`   • Click the 🔊 button to enable audio narration`);
    console.log(`   • Navigate through different sections using the menu`);
    console.log(`   • Use Ctrl+C to stop the server\n`);
    log(`Server started successfully`);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Error: Port ${PORT} is already in use!`);
        console.log(`💡 Try running the server on a different port:`);
        console.log(`   PORT=8001 node simple_server.js`);
        console.log(`   PORT=8080 node simple_server.js`);
    } else {
        console.error(`\n❌ Server error:`, err.message);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down server gracefully...');
    server.close(() => {
        log('Server stopped');
        console.log('✅ Server stopped successfully. Thank you for using our educational module!');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n\n🛑 Received SIGTERM, shutting down gracefully...');
    server.close(() => {
        log('Server stopped');
        process.exit(0);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('\n❌ Uncaught Exception:', err.message);
    log(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('\n❌ Unhandled Rejection at:', promise, 'reason:', reason);
    log(`Unhandled Rejection: ${reason}`);
});

// Export for testing purposes
module.exports = { server, PORT, HOST };
