const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain'
};

// Function to get MIME type based on file extension
function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || 'application/octet-stream';
}

// Function to serve static files
function serveStaticFile(res, filePath) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 - File Not Found</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            h1 { color: #e74c3c; }
                        </style>
                    </head>
                    <body>
                        <h1>404 - File Not Found</h1>
                        <p>The requested file could not be found.</p>
                        <a href="/">Go back to home</a>
                    </body>
                    </html>
                `);
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>500 - Server Error</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            h1 { color: #e74c3c; }
                        </style>
                    </head>
                    <body>
                        <h1>500 - Server Error</h1>
                        <p>An internal server error occurred.</p>
                        <a href="/">Go back to home</a>
                    </body>
                    </html>
                `);
            }
            return;
        }

        // Set appropriate headers
        const mimeType = getMimeType(filePath);
        res.writeHead(200, { 
            'Content-Type': mimeType,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        res.end(data);
    });
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // Parse URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    let filePath = url.pathname;

    // Default to index.html for root path
    if (filePath === '/') {
        filePath = '/index.html';
    }

    // Remove leading slash and resolve file path
    filePath = filePath.substring(1);
    const fullPath = path.join(__dirname, filePath);

    // Security check: prevent directory traversal
    if (!fullPath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>403 - Forbidden</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                    h1 { color: #e74c3c; }
                </style>
            </head>
            <body>
                <h1>403 - Forbidden</h1>
                <p>Access denied.</p>
                <a href="/">Go back to home</a>
            </body>
            </html>
        `);
        return;
    }

    // Check if file exists
    fs.stat(fullPath, (err, stats) => {
        if (err) {
            // File doesn't exist
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - File Not Found</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        h1 { color: #e74c3c; }
                    </style>
                </head>
                <body>
                    <h1>404 - File Not Found</h1>
                    <p>The requested file could not be found.</p>
                    <a href="/">Go back to home</a>
                </body>
                </html>
            `);
            return;
        }

        if (stats.isDirectory()) {
            // If it's a directory, try to serve index.html from it
            const indexPath = path.join(fullPath, 'index.html');
            serveStaticFile(res, indexPath);
        } else {
            // Serve the file
            serveStaticFile(res, fullPath);
        }
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 Identity Theft and Detectives - Interactive English Lesson`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`\n✨ Features:`);
    console.log(`   • Interactive reading comprehension`);
    console.log(`   • Audio narration with text-to-speech`);
    console.log(`   • Vocabulary and grammar exercises`);
    console.log(`   • Listening, speaking, and writing activities`);
    console.log(`   • Progress tracking and achievements`);
    console.log(`\n🎯 Open your browser and navigate to: http://localhost:${PORT}`);
    console.log(`\n💡 Press Ctrl+C to stop the server`);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please try a different port or stop the process using this port.`);
        console.log(`💡 You can change the PORT variable in this file to use a different port.`);
    } else {
        console.error('❌ Server error:', err);
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});
