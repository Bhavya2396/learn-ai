const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'font/eot'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    
    let parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Default to index.html for root path
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Construct file path
    let filePath = path.join(__dirname, pathname);
    
    // Get file extension
    let ext = path.parse(filePath).ext;
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(`
                <html>
                    <head>
                        <title>404 - पृष्ठ नहीं मिला</title>
                        <meta charset="utf-8">
                        <style>
                            body { 
                                font-family: 'Noto Sans Devanagari', Arial, sans-serif; 
                                text-align: center; 
                                padding: 50px; 
                                background: linear-gradient(135deg, #4a5d23, #6b7c32);
                                color: white;
                                margin: 0;
                            }
                            .container {
                                background: rgba(255,255,255,0.1);
                                padding: 40px;
                                border-radius: 20px;
                                margin: 50px auto;
                                max-width: 500px;
                                backdrop-filter: blur(10px);
                            }
                            h1 { font-size: 3rem; margin-bottom: 20px; }
                            p { font-size: 1.2rem; line-height: 1.6; }
                            a { 
                                color: #f7c52d; 
                                text-decoration: none; 
                                font-weight: bold;
                            }
                            a:hover { text-decoration: underline; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>404</h1>
                            <p>माफ करें, आपका मांगा गया पृष्ठ नहीं मिला।</p>
                            <p><a href="/">मुख्य पृष्ठ पर वापस जाएं</a></p>
                        </div>
                    </body>
                </html>
            `);
            return;
        }
        
        // Read and serve file
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end('सर्वर त्रुटि');
                return;
            }
            
            // Set appropriate content type
            let contentType = mimeTypes[ext] || 'application/octet-stream';
            if (contentType.startsWith('text/') || contentType.includes('json') || contentType.includes('javascript')) {
                contentType += '; charset=utf-8';
            }
            
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            
            // Add cache headers for static assets
            if (ext === '.css' || ext === '.js' || ext.includes('woff') || ext.includes('ttf')) {
                res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
            }
            
            res.end(content);
        });
    });
});

server.listen(PORT, () => {
    console.log(`🚀 शुक्रतारे के समान - सर्वर चालू है!`);
    console.log(`📖 ब्राउज़र में खोलें: http://localhost:${PORT}`);
    console.log(`🔥 रोकने के लिए Ctrl+C दबाएं`);
    console.log('==========================================');
});
