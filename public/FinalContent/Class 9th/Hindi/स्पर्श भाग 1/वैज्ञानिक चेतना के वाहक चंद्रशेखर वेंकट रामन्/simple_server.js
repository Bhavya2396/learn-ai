const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const hostname = '127.0.0.1';
const port = 3000;

// MIME types for different file extensions
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
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = `.${parsedUrl.pathname}`;
    
    // Default to index.html for root requests
    if (pathname === './') {
        pathname = './index.html';
    }
    
    const ext = path.parse(pathname).ext;
    const mimeType = mimeTypes[ext] || 'text/plain';
    
    fs.readFile(pathname, (err, data) => {
        if (err) {
            console.error(`Error reading file ${pathname}:`, err.message);
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end('404 - फ़ाइल नहीं मिली');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', `${mimeType}; charset=utf-8`);
            res.end(data);
        }
    });
});

server.listen(port, hostname, () => {
    console.log('='.repeat(60));
    console.log('🔬 सीवी रामन् इंटरैक्टिव मॉड्यूल सर्वर चालू!');
    console.log('='.repeat(60));
    console.log(`🌐 सर्वर चल रहा है: http://${hostname}:${port}/`);
    console.log(`📚 मॉड्यूल: वैज्ञानिक चेतना के वाहक चंद्रशेखर वेंकट रामन्`);
    console.log(`⏰ समय: ${new Date().toLocaleString('hi-IN')}`);
    console.log('='.repeat(60));
    console.log('सर्वर बंद करने के लिए Ctrl+C दबाएं');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 सर्वर बंद हो रहा है...');
    server.close(() => {
        console.log('✅ सर्वर सफलतापूर्वक बंद हो गया।');
        process.exit(0);
    });
});
