const fs = require('fs');
const path = require('path');
const express = require('express');

// 获取应用运行的实际目录（兼容pkg打包）
const appDir = process.pkg ? path.dirname(process.execPath) : __dirname;

const app = express();
const PORT = 4000;
const VIDEO_FOLDER = path.join(appDir, 'video');

// Ensure the video folder exists
if (!fs.existsSync(VIDEO_FOLDER)) {
    try {
        fs.mkdirSync(VIDEO_FOLDER);
        console.log(`Created video folder: ${VIDEO_FOLDER}`);
    } catch (error) {
        console.error('Failed to create video folder:', error);
    }
}

// Static file service
app.use(express.static(path.join(appDir, 'public')));

// Recursively get all video files
function getAllVideoFiles(directory) {
    let results = [];
    
    function traverse(dir, relativePath = '') {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stats = fs.statSync(fullPath);
            
            if (stats.isDirectory()) {
                // Recursively traverse subdirectories
                traverse(fullPath, path.join(relativePath, file));
            } else if (path.extname(file).toLowerCase() === '.mp4') {
                // Is a video file, add to results list 
                const relativeFilePath = path.join(relativePath, file);
                results.push({
                    id: relativeFilePath,
                    name: file,
                    path: encodeURIComponent(relativeFilePath)
                });
            }
        });
    }
    
    traverse(directory);
    return results;
}

// Get video file list
app.get('/api/videos', (req, res) => {
    try {
        const videoFiles = getAllVideoFiles(VIDEO_FOLDER)
            .sort((a, b) => {
                // Try to sort by number in filename
                const numA = parseInt(a.name.match(/P(\d+)/)?.[1] || 0);
                const numB = parseInt(b.name.match(/P(\d+)/)?.[1] || 0);
                return numA - numB;
            });
        
        res.json(videoFiles);
    } catch (error) {
        console.error('Error reading video folder:', error);
        res.status(500).json({ error: 'Failed to read video files' });
    }
});

// Provide video file stream
app.get('/videos/:fileName*', (req, res) => {
    // Parse request parameters, get complete relative path
    let relativePath = decodeURIComponent(req.params.fileName);
    if (req.params[0]) {
        relativePath += decodeURIComponent(req.params[0]);
    }
    
    const filePath = path.join(VIDEO_FOLDER, relativePath);
    
    if (!fs.existsSync(filePath)) {
        console.error('Video not found:', filePath);
        return res.status(404).send('Video not found');
    }
    
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;
    
    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
    }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});