// Internationalization module
// Create a simple module definition function
function define(name, factory) {
    window[name] = factory();
}

define('i18n', function() {
    // Supported languages
    const SUPPORTED_LANGUAGES = {
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
        'en': 'English',
        'ja': '日本語'
    };

    // Default language
    let currentLanguage = 'zh-CN';

    // Translations
    const translations = {
        'zh-CN': {
            'pageTitle': '视频播放器',
            'videoPlayer': '视频播放器',
            'videoList': '视频列表',
            'noSupportHtml5': '您的浏览器不支持HTML5视频播放，请尝试更换浏览器。',
            'selectVideoToPlay': '请选择一个视频开始播放',
            'loading': '加载中...',
            'noVideosFound': '未找到视频文件',
            'fetchVideosFailed': '获取视频列表失败: ',
            'rootDirectory': '根目录',
            'folderList': '文件夹列表',
            'allVideos': '所有视频',
            'videos': '个视频',
            'back': '← 返回',
            'videosInFolder': ' 文件夹中的视频',
            'noVideoPlayer': '未找到视频播放器元素',
            'autoplayBlocked': '自动播放被阻止: 可能是浏览器设置限制',
            'errorPlayingVideo': '播放视频时出错: ',
            'nextVideo': '下一个视频',
            'previousVideo': '上一个视频',
            'playPause': '播放/暂停'
        },
        'zh-TW': {
            'pageTitle': '影片播放器',
            'videoPlayer': '影片播放器',
            'videoList': '影片列表',
            'noSupportHtml5': '您的瀏覽器不支援HTML5影片播放，請嘗試更換瀏覽器。',
            'selectVideoToPlay': '請選擇一個影片開始播放',
            'loading': '載入中...',
            'noVideosFound': '未找到影片檔案',
            'fetchVideosFailed': '獲取影片列表失敗: ',
            'rootDirectory': '根目錄',
            'folderList': '資料夾列表',
            'allVideos': '所有影片',
            'videos': '個影片',
            'back': '← 返回',
            'videosInFolder': ' 資料夾中的影片',
            'noVideoPlayer': '未找到影片播放器元素',
            'autoplayBlocked': '自動播放被阻止: 可能是瀏覽器設定限制',
            'errorPlayingVideo': '播放影片時出錯: ',
            'nextVideo': '下一個影片',
            'previousVideo': '上一個影片',
            'playPause': '播放/暫停'
        },
        'en': {
            'pageTitle': 'Video Player',
            'videoPlayer': 'Video Player',
            'videoList': 'Video List',
            'noSupportHtml5': 'Your browser does not support HTML5 video playback. Please try switching browsers.',
            'selectVideoToPlay': 'Please select a video to start playback',
            'loading': 'Loading...',
            'noVideosFound': 'No video files found',
            'fetchVideosFailed': 'Failed to fetch video list: ',
            'rootDirectory': 'Root Directory',
            'folderList': 'Folder List',
            'allVideos': 'All Videos',
            'videos': 'videos',
            'back': '← Back',
            'videosInFolder': ' Videos in folder',
            'noVideoPlayer': 'Video player element not found',
            'autoplayBlocked': 'Autoplay blocked: May be restricted by browser settings',
            'errorPlayingVideo': 'Error playing video: ',
            'nextVideo': 'Next video',
            'previousVideo': 'Previous video',
            'playPause': 'Play/Pause'
        },
        'ja': {
            'pageTitle': '動画プレイヤー',
            'videoPlayer': '動画プレイヤー',
            'videoList': '動画リスト',
            'noSupportHtml5': 'お使いのブラウザはHTML5動画再生をサポートしていません。ブラウザの変更を試してください。',
            'selectVideoToPlay': '再生する動画を選択してください',
            'loading': '読み込み中...',
            'noVideosFound': '動画ファイルが見つかりませんでした',
            'fetchVideosFailed': '動画リストの取得に失敗しました: ',
            'rootDirectory': 'ルートディレクトリ',
            'folderList': 'フォルダーリスト',
            'allVideos': 'すべての動画',
            'videos': '本の動画',
            'back': '← 戻る',
            'videosInFolder': ' フォルダー内の動画',
            'noVideoPlayer': '動画プレイヤー要素が見つかりませんでした',
            'autoplayBlocked': '自動再生がブロックされました: ブラウザの設定による制限の可能性があります',
            'errorPlayingVideo': '動画再生エラー: ',
            'nextVideo': '次の動画',
            'previousVideo': '前の動画',
            'playPause': '再生/一時停止'
        }
    };

    // Get translation for a key
    function t(key) {
        if (!translations[currentLanguage] || !translations[currentLanguage][key]) {
            // Fallback to English if translation not found
            return translations['en'][key] || key;
        }
        return translations[currentLanguage][key];
    }

    // Change current language
    function changeLanguage(langCode) {
        if (SUPPORTED_LANGUAGES[langCode]) {
            currentLanguage = langCode;
            document.documentElement.lang = langCode;
            updateUI();
            // Save language preference to localStorage
            localStorage.setItem('preferredLanguage', langCode);
            return true;
        }
        return false;
    }

    // Update UI with current language
    function updateUI() {
        // Update page title
        document.title = t('pageTitle');
        
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (key) {
                element.textContent = t(key);
            }
        });
        
        // Update language selector UI
        const selectedLanguageDisplay = document.querySelector('.selected-language');
        const languageOptions = document.querySelectorAll('.language-option');
        
        if (selectedLanguageDisplay && SUPPORTED_LANGUAGES[currentLanguage]) {
            // Update the displayed language name
            const arrow = selectedLanguageDisplay.querySelector('.language-dropdown-arrow');
            selectedLanguageDisplay.textContent = SUPPORTED_LANGUAGES[currentLanguage];
            if (arrow) {
                selectedLanguageDisplay.appendChild(arrow);
            }
        }
        
        // Update the selected state in the dropdown menu
        if (languageOptions.length > 0) {
            languageOptions.forEach(option => {
                option.classList.remove('selected');
                if (option.getAttribute('data-lang') === currentLanguage) {
                    option.classList.add('selected');
                }
            });
        }
    }

    // Initialize i18n
    function init() {
        // Try to get language from localStorage
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && SUPPORTED_LANGUAGES[savedLang]) {
            currentLanguage = savedLang;
        } else {
            // Fallback to browser language
            const browserLang = navigator.language || navigator.userLanguage;
            const langMatch = Object.keys(SUPPORTED_LANGUAGES).find(lang => 
                browserLang.startsWith(lang)
            );
            if (langMatch) {
                currentLanguage = langMatch;
            }
        }
        
        document.documentElement.lang = currentLanguage;
        
        // Create language selector
        createLanguageSelector();
        
        // Update UI
        updateUI();
    }

    // Create custom language selector
    function createLanguageSelector() {
        // Create language selector container
        const selectorContainer = document.createElement('div');
        selectorContainer.className = 'language-selector-container';
        
        // Create selected language display
        const selectedLanguage = document.createElement('div');
        selectedLanguage.className = 'selected-language';
        selectedLanguage.textContent = SUPPORTED_LANGUAGES[currentLanguage];
        
        // Create dropdown arrow
        const arrow = document.createElement('span');
        arrow.className = 'language-dropdown-arrow';
        arrow.textContent = '▼';
        selectedLanguage.appendChild(arrow);
        
        // Create dropdown menu
        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'language-dropdown-menu';
        dropdownMenu.style.display = 'none';
        
        // Add language options to dropdown menu
        Object.entries(SUPPORTED_LANGUAGES).forEach(([code, name]) => {
            const option = document.createElement('div');
            option.className = 'language-option';
            option.textContent = name;
            option.setAttribute('data-lang', code);
            
            if (code === currentLanguage) {
                option.classList.add('selected');
            }
            
            option.addEventListener('click', () => {
                changeLanguage(code);
                dropdownMenu.style.display = 'none';
                selectedLanguage.textContent = name;
                selectedLanguage.appendChild(arrow);
            });
            
            dropdownMenu.appendChild(option);
        });
        
        // Toggle dropdown menu when clicking on selected language
        selectedLanguage.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdownMenu.style.display = 'none';
        });
        
        // Add elements to container
        selectorContainer.appendChild(selectedLanguage);
        selectorContainer.appendChild(dropdownMenu);
        
        // Create footer element for language selector
        const footer = document.createElement('footer');
        footer.className = 'language-footer';
        footer.appendChild(selectorContainer);
        
        // Add to the end of body
        document.body.appendChild(footer);
    }

    // Get current language code
    function getCurrentLanguage() {
        return currentLanguage;
    }

    // Get supported languages
    function getSupportedLanguages() {
        return SUPPORTED_LANGUAGES;
    }

    return {
        t,
        changeLanguage,
        init,
        getCurrentLanguage,
        getSupportedLanguages
    };
});