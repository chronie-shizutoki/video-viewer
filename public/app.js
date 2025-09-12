// Create a simple path handling utility object to replace Node.js's path module
define('path', function() {
    return {
        // Path separator, use '/' in browser environment
        sep: '/'
    };
});

// Simple module definition function
function define(name, factory) {
    window[name] = factory();
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize internationalization
    i18n.init();

    const videoPlayer = document.getElementById('videoPlayer');
    const currentVideoTitle = document.getElementById('currentVideoTitle');
    const videosContainer = document.getElementById('videosContainer');
    
    let videoList = [];
    let categorizedVideos = {}; //categorized videos by folder
    let currentVideoIndex = -1;
    let currentFolder = null; // Current selected folder
    // Create Plyr instance
    let player = null;
    
    // Get video list from server
    function fetchVideos() {
        fetch('/api/videos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response error');
                }
                return response.json();
            })
            .then(videos => {
                videoList = videos;
                // Categorize videos by folder
                categorizeVideos();
                // Render folder list
                renderFolderList();
                
                // If there are videos, automatically select the first one
                if (videoList.length > 0) {
                    selectVideo(0);
                } else {
                    videosContainer.innerHTML = `<p>${i18n.t('noVideosFound')}</p>`;
                }
            })
            .catch(error => {
                console.error(i18n.t('fetchVideosFailed'), error);
                videosContainer.innerHTML = `<p>${i18n.t('fetchVideosFailed')}${error.message}</p>`;
            });
    }
    
    // Categorize videos by folder
    function categorizeVideos() {
        categorizedVideos = {};
        
        videoList.forEach((video, index) => {
            // Parse the path to get folder information
            // Handle both Windows and Unix path separators uniformly
            const normalizedPath = video.id.replace(/\\/g, path.sep);
            const pathParts = normalizedPath.split(path.sep);
            let folder = i18n.t('rootDirectory');
            
            if (pathParts.length > 1) {
                // If there are subfolders, use the top-level folder as the category
                folder = pathParts[0];
            }
            
            // Add the video to the corresponding folder category
            if (!categorizedVideos[folder]) {
                categorizedVideos[folder] = [];
            }
            categorizedVideos[folder].push({
                ...video,
                globalIndex: index // Save the global index
            });
        });
    }
    
    // Render the folder list
    function renderFolderList() {
        videosContainer.innerHTML = '';
        
        // Create the folder header
        const folderHeader = document.createElement('h3');
        folderHeader.textContent = i18n.t('folderList');
        folderHeader.style.marginBottom = '15px';
        folderHeader.style.fontSize = '1.2rem';
        videosContainer.appendChild(folderHeader);
        
        // Render each folder
        Object.keys(categorizedVideos).forEach(folder => {
            const folderItem = document.createElement('div');
            folderItem.className = 'folder-item';
            folderItem.innerHTML = `
                <span style="margin-right: 8px;">📁</span>
                ${folder} (${categorizedVideos[folder].length}${i18n.t('videos')})
            `;
            
            folderItem.addEventListener('click', () => {
                renderVideosInFolder(folder);
                currentFolder = folder;
            });
            
            videosContainer.appendChild(folderItem);
        });
        
        // Add the option to display all videos
        const allVideosItem = document.createElement('div');
        allVideosItem.className = 'folder-item all-videos';
        allVideosItem.innerHTML = `
            <span style="margin-right: 8px;">📋</span>
            ${i18n.t('allVideos')} (${videoList.length}${i18n.t('videos')})
        `;
        
        allVideosItem.addEventListener('click', () => {
            renderAllVideos();
            currentFolder = null;
        });
        
        videosContainer.appendChild(allVideosItem);
        
        allVideosItem.addEventListener('click', () => {
            renderAllVideos();
            currentFolder = null;
        });
        
        videosContainer.appendChild(allVideosItem);
    }
    
    // Render videos in a specific folder
    function renderVideosInFolder(folder) {
        videosContainer.innerHTML = '';
        
        // Back button
        const backButton = document.createElement('div');
        backButton.className = 'back-button';
        backButton.innerHTML = i18n.t('back');
        
        backButton.addEventListener('click', renderFolderList);
        videosContainer.appendChild(backButton);
        
        // Folder title
        const folderTitle = document.createElement('h3');
        folderTitle.textContent = `${folder}${i18n.t('videosInFolder')}`;
        folderTitle.style.marginBottom = '15px';
        folderTitle.style.fontSize = '1.2rem';
        videosContainer.appendChild(folderTitle);
        
        // Render video list
        const videosInFolder = categorizedVideos[folder];
        videosInFolder.forEach((video, index) => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            if (video.globalIndex === currentVideoIndex) {
                videoItem.classList.add('selected');
            }
            
            const title = getVideoTitle(video.name);
            const number = getVideoNumber(index + 1); // Use index as the number
            
            videoItem.innerHTML = `
                <span class="video-number">P${number}</span>
                <span class="video-title">${title}</span>
            `;
            
            videoItem.addEventListener('click', () => {
                selectVideo(video.globalIndex);
            });
            
            videosContainer.appendChild(videoItem);
        });
    }
    
    // Render all videos
    function renderAllVideos() {
        videosContainer.innerHTML = '';
        
        // Back button
        const backButton = document.createElement('div');
        backButton.className = 'back-button';
        backButton.innerHTML = i18n.t('back');
        
        backButton.addEventListener('click', renderFolderList);
        videosContainer.appendChild(backButton);
        
        // Title
        const title = document.createElement('h3');
        title.textContent = i18n.t('allVideos');
        title.style.marginBottom = '15px';
        title.style.fontSize = '1.2rem';
        videosContainer.appendChild(title);
        
        // Render video list
        videoList.forEach((video, index) => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            if (index === currentVideoIndex) {
                videoItem.classList.add('selected');
            }
            
            const videoTitle = getVideoTitle(video.name);
            const number = getVideoNumber(index + 1); // Use index as the number
            
            // Display file path information
            let pathInfo = '';
            // Handle both Windows and Unix path separators uniformly
            const normalizedPath = video.id.replace(/\\/g, path.sep);
            if (normalizedPath.includes(path.sep)) {
                const pathParts = normalizedPath.split(path.sep);
                pathInfo = `<span style="font-size: 0.8rem; color: #666; margin-left: 10px;">(${pathParts[0]})</span>`;
            }
            
            videoItem.innerHTML = `
                <span class="video-number">P${number}</span>
                <span class="video-title">${videoTitle}${pathInfo}</span>
            `;
            
            videoItem.addEventListener('click', () => {
                selectVideo(index);
            });
            
            videosContainer.appendChild(videoItem);
        });
    }
    
    // Select and play a video
    function selectVideo(index) {
        if (index < 0 || index >= videoList.length) {
            return;
        }
        
        // Update the current video index
        currentVideoIndex = index;
        
        // Get current video information
        const video = videoList[index];
        
        // Use a more user-friendly title format instead of displaying the full file name directly
        const friendlyTitle = getVideoTitle(video.name);
        // Display folder path information
        let pathInfo = '';
        // Handle both Windows and Unix path separators uniformly
        const normalizedPath = video.id.replace(/\\/g, path.sep);
        if (normalizedPath.includes(path.sep)) {
            const pathParts = normalizedPath.split(path.sep);
            pathInfo = ` (${pathParts[0]})`;
        }
        
        // Find the index of the current video in its folder
        let folderIndex = 0;
        Object.keys(categorizedVideos).forEach(folder => {
            const folderVideos = categorizedVideos[folder];
            const videoInFolder = folderVideos.find(v => v.globalIndex === index);
            if (videoInFolder) {
                folderIndex = folderVideos.indexOf(videoInFolder) + 1;
            }
        });
        
        currentVideoTitle.textContent = `P${getVideoNumber(folderIndex)} - ${friendlyTitle}${pathInfo}`;
        
        // Re-render the list to update the selected state
        if (currentFolder) {
            renderVideosInFolder(currentFolder);
        } else {
            renderAllVideos();
        }
        
        // First, ensure the videoPlayer element exists and is valid
        if (!videoPlayer) {
            console.error(i18n.t('noVideoPlayer'));
            return;
        }
        
        // Update the video source directly to avoid frequent destruction and reconstruction of the Plyr instance
        const videoSource = videoPlayer.querySelector('source');
        if (videoSource) {
            // Remove the old source element
            videoPlayer.removeChild(videoSource);
        }
        
        // Create a new source element and set the correct video path
        const newSource = document.createElement('source');
        newSource.src = `/videos/${video.path}`;
        newSource.type = 'video/mp4';
        videoPlayer.appendChild(newSource);
        
        // Check if the Plyr instance exists
        if (player) {
            // Use Plyr's method to update the source
            player.source = {
                type: 'video',
                sources: [{
                    src: `/videos/${video.path}`,
                    type: 'video/mp4'
                }]
            };
        } else {
            // If the Plyr instance does not exist, create a new one
            player = new Plyr('#videoPlayer');
        }
        
        // Scroll to the video player
        videoPlayer.scrollIntoView({ behavior: 'smooth' });
        
        // Load and try to play the video
        try {
            videoPlayer.load();
            player.play().catch(error => {
                console.log(i18n.t('autoplayBlocked'), error);
                // Ensure the video is ready even if autoplay is blocked
                videoPlayer.poster = '';
            });
        } catch (e) {
            console.error(i18n.t('errorPlayingVideo'), e);
        }
    }
    
    // Extract the video title from the file name
    function getVideoTitle(filename) {
        // Try to extract the number after 'P' and the title part
        const match = filename.match(/P(\d+)\s*-\s*(.+?)\s*\.mp4/i);
        if (match && match[2]) {
            return match[2].trim();
        }
        return filename.replace('.mp4', '');
    }
    
    // Format the video number to ensure it has at least 2 digits
    function getVideoNumber(number) {
        // If the input is a number, format it
        if (typeof number === 'number') {
            return number.toString().padStart(2, '0');
        }
        
        // If the input is a string, try to extract the number from it
        if (typeof number === 'string') {
            const match = number.match(/P(\d+)/i);
            if (match) {
                return match[1].padStart(2, '0');
            }
            
            // Try to parse the number directly
            const num = parseInt(number, 10);
            if (!isNaN(num)) {
                return num.toString().padStart(2, '0');
            }
        }
        
        // If none of the above works, return the default value
        return '01';
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (videoList.length === 0) return;
        
        switch (event.key) {
            case 'ArrowRight':
                // Next video
                if (currentVideoIndex < videoList.length - 1) {
                    selectVideo(currentVideoIndex + 1);
                }
                break;
            case 'ArrowLeft':
                // Previous video
                if (currentVideoIndex > 0) {
                    selectVideo(currentVideoIndex - 1);
                }
                break;
            case ' ':
                // Play/Pause
                event.preventDefault(); // Prevent page scrolling
                if (player) {
                    if (player.paused) {
                        player.play();
                    } else {
                        player.pause();
                    }
                }
                break;
        }
    });
    
    // Automatically play the next video when the current one ends
    document.addEventListener('ended', (e) => {
        if (e.target.id === 'videoPlayer' && currentVideoIndex < videoList.length - 1) {
            selectVideo(currentVideoIndex + 1);
        }
    }, true);
    
    // Clean up the Plyr instance when the page is unloaded to avoid memory leaks
    window.addEventListener('beforeunload', () => {
        if (player) {
            player.destroy();
            player = null;
        }
    });
    
    // Initialize
    fetchVideos();
});