/**
 * Simple HTTP Server for दुःख का अधिकार Interactive Lesson
 * 
 * This server provides local development support for the interactive lesson.
 * It serves static files and provides basic API endpoints for data persistence.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Server configuration
const PORT = 5500;
const HOST = 'localhost';

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain; charset=utf-8'
};

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // API endpoints
    if (pathname.startsWith('/api/')) {
        handleAPI(req, res, pathname, method);
        return;
    }

    // Serve static files
    serveStaticFile(req, res, pathname);
});

// Handle API requests
function handleAPI(req, res, pathname, method) {
    const endpoint = pathname.replace('/api/', '');

    switch (endpoint) {
        case 'progress':
            handleProgressAPI(req, res, method);
            break;
        case 'answers':
            handleAnswersAPI(req, res, method);
            break;
        case 'feedback':
            handleFeedbackAPI(req, res, method);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'API endpoint not found' }));
    }
}

// Handle progress API
function handleProgressAPI(req, res, method) {
    if (method === 'GET') {
        // Get progress data
        const progressData = {
            modulesCompleted: [],
            totalScore: 0,
            timeSpent: 0,
            lastUpdated: new Date().toISOString()
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(progressData));
    } else if (method === 'POST') {
        // Save progress data
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const progressData = JSON.parse(body);
                // In a real application, you would save this to a database
                console.log('Progress saved:', progressData);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Progress saved successfully' }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });
    }
}

// Handle answers API
function handleAnswersAPI(req, res, method) {
    if (method === 'GET') {
        // Get answer data
        const answerData = {
            answers: {},
            lastUpdated: new Date().toISOString()
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(answerData));
    } else if (method === 'POST') {
        // Save answer data
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const answerData = JSON.parse(body);
                // In a real application, you would save this to a database
                console.log('Answers saved:', answerData);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Answers saved successfully' }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });
    }
}

// Handle feedback API
function handleFeedbackAPI(req, res, method) {
    if (method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const feedbackData = JSON.parse(body);
                // In a real application, you would save this to a database
                console.log('Feedback received:', feedbackData);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Feedback received successfully' }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });
    }
}

// Serve static files
function serveStaticFile(req, res, pathname) {
    // Default to index.html for root path
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Construct file path
    const filePath = path.join(__dirname, pathname);
    
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
                    <title>404 - फ़ाइल नहीं मिली</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        h1 { color: #e74c3c; }
                        p { color: #666; }
                        a { color: #3498db; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                    </style>
                </head>
                <body>
                    <h1>404 - फ़ाइल नहीं मिली</h1>
                    <p>आप जिस फ़ाइल को खोज रहे हैं, वह मौजूद नहीं है।</p>
                    <a href="/">मुख्य पृष्ठ पर वापस जाएं</a>
                </body>
                </html>
            `);
            return;
        }

        // Get file extension and MIME type
        const ext = path.extname(filePath).toLowerCase();
        const mimeType = mimeTypes[ext] || 'application/octet-stream';

        // Read and serve file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html lang="hi">
                    <head>
                        <meta charset="UTF-8">
                        <title>500 - सर्वर त्रुटि</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            h1 { color: #e74c3c; }
                            p { color: #666; }
                        </style>
                    </head>
                    <body>
                        <h1>500 - सर्वर त्रुटि</h1>
                        <p>सर्वर में एक त्रुटि हुई है। कृपया बाद में पुनः प्रयास करें।</p>
                    </body>
                    </html>
                `);
                return;
            }

            // Set appropriate headers
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        });
    });
}

// Start server
server.listen(PORT, HOST, () => {
    console.log(`🚀 सर्वर चल रहा है: http://${HOST}:${PORT}`);
    console.log(`📚 दुःख का अधिकार इंटरैक्टिव पाठ`);
    console.log(`🌐 ब्राउज़र में खोलें: http://localhost:${PORT}`);
    console.log(`⏹️  सर्वर बंद करने के लिए Ctrl+C दबाएं`);
});

// Handle server shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 सर्वर बंद हो रहा है...');
    server.close(() => {
        console.log('✅ सर्वर सफलतापूर्वक बंद हो गया।');
        process.exit(0);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ अनपेक्षित त्रुटि:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ अनपेक्षित प्रॉमिस रिजेक्शन:', reason);
    process.exit(1);
});
