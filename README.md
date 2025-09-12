# Video Viewer

A web application to display and preview videos in a folder with an intuitive interface and powerful features.

## 📸 Screenshots

![Main Interface](https://github.com/user-attachments/assets/96f8b834-05e2-4dc6-ba4c-4c2b951e16cd)
![Video Playback](https://github.com/user-attachments/assets/2ae225ef-fc10-432f-944b-bf1dae8e14e5)
![Mobile View](https://github.com/user-attachments/assets/42257926-b84d-43ee-98bc-8ce6c7f0b077)

## 🌟 Features

- 📁 **Folder Organization**: Automatically categorize videos by folders for easy navigation
- 🎥 **Advanced Video Player**: Powered by Plyr with support for playback controls, progress bar, and volume control
- ⌨️ **Keyboard Navigation**: Use arrow keys to switch between videos and spacebar to play/pause
- 🌐 **Internationalization**: Supports multiple languages including English, Chinese (Simplified/Traditional), and Japanese
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔄 **Auto-play Next**: Automatically plays the next video when the current one ends
- 🚀 **High Performance**: Efficient video streaming with range requests support

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. Clone or download the repository

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
npm start
```

4. Open your browser and visit `http://localhost:4000`

## 📁 Project Structure

```
├── public/             # Frontend files
│   ├── app.js          # Main application logic
│   ├── index.html      # HTML template
│   ├── language.js     # Internationalization support
│   ├── lib/            # Third-party libraries
│   └── styles.css      # Styling
├── server.js           # Backend server
├── package.json        # Project dependencies and scripts
└── video/              # Video files (auto-created if not exists)
```

## 🚀 Usage

1. **Add Videos**: Place your MP4 video files in the `video` folder. You can organize them in subfolders for better categorization.

2. **Start the Server**: Run `npm start` to start the application

3. **Browse and Play**: Open the web interface, browse through folders or view all videos, and click on any video to start playback

4. **Keyboard Shortcuts**: 
   - `→` Next video
   - `←` Previous video
   - `Space` Play/Pause

## 🛠️ Development

For development purposes, you can use the following command to start the server with hot reloading:

```bash
npm run dev
```

## 📦 Packaging

To package the application into a standalone executable for Windows:

```bash
npm run package
```

This will create an executable file named `video-viewer.exe` in the project directory.

## 🌐 Supported Languages

- English
- 简体中文 (Simplified Chinese)
- 繁體中文 (Traditional Chinese)
- 日本語 (Japanese)

## 🎯 Technical Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML5, CSS, JavaScript
- **Video Player**: Plyr
- **Build Tool**: pkg (for packaging)

## ⚙️ Configuration

The application runs on port 4000 by default. To change this, modify the `PORT` constant in `server.js`.

Videos are loaded from the `video` folder in the application directory. This path can be customized by changing the `VIDEO_FOLDER` constant in `server.js`.

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
