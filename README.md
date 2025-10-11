# Video Viewer

A web application to display and preview videos in a folder with an intuitive interface and powerful features.

[![zread](https://img.shields.io/badge/Ask_Zread-_.svg?style=for-the-badge&color=00b0aa&labelColor=000000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuOTYxNTYgMS42MDAxSDIuMjQxNTZDMS44ODgxIDEuNjAwMSAxLjYwMTU2IDEuODg2NjQgMS42MDE1NiAyLjI0MDFWNC45NjAxQzEuNjAxNTYgNS4zMTM1NiAxLjg4ODEgNS42MDAxIDIuMjQxNTYgNS42MDAxSDQuOTYxNTZDNS4zMTUwMiA1LjYwMDEgNS42MDE1NiA1LjMxMzU2IDUuNjAxNTYgNC45NjAxVjIuMjQwMUM1LjYwMTU2IDEuODg2NjQgNS4zMTUwMiAxLjYwMDEgNC45NjE1NiAxLjYwMDFaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00Ljk2MTU2IDEwLjM5OTlIMi4yNDE1NkMxLjg4ODEgMTAuMzk5OSAxLjYwMTU2IDEwLjY4NjQgMS42MDE1NiAxMS4wMzk5VjEzLjc1OTlDMS42MDE1NiAxNC4xMTM0IDEuODg4MSAxNC4zOTk5IDIuMjQxNTYgMTQuMzk5OUg0Ljk2MTU2QzUuMzE1MDIgMTQuMzk5OSA1LjYwMTU2IDE0LjExMzQgNS42MDE1NiAxMy43NTk5VjExLjAzOTlDNS42MDE1NiAxMC42ODY0IDUuMzE1MDIgMTAuMzk5OSA0Ljk2MTU2IDEwLjM5OTlaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik0xMy43NTg0IDEuNjAwMUgxMS4wMzg0QzEwLjY4NSAxLjYwMDEgMTAuMzk4NCAxLjg4NjY0IDEwLjM5ODQgMi4yNDAxVjQuOTYwMUMxMC4zOTg0IDUuMzEzNTYgMTAuNjg1IDUuNjAwMSAxMS4wMzg0IDUuNjAwMUgxMy43NTg0QzE0LjExMTkgNS42MDAxIDE0LjM5ODQgNS4zMTM1NiAxNC4zOTg0IDQuOTYwMVYyLjI0MDFDMTQuMzk4NCAxLjg4NjY0IDE0LjExMTkgMS42MDAxIDEzLjc1ODQgMS42MDAxWiIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNNCAxMkwxMiA0TDQgMTJaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00IDEyTDEyIDQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K&logoColor=ffffff)](https://zread.ai/chronie-shizutoki/video-viewer)

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
