# Music Player

A beautiful, feature-rich music player built with HTML, CSS, and JavaScript.

## Features

🎵 **Core Functionality**
- Play/Pause control
- Previous/Next song navigation
- Progress bar with seek functionality
- Volume control with visual feedback
- Song information display (title, artist, album)
- Album art display with rotation animation

📋 **Playlist Features**
- Full playlist display
- Click any song to play
- Active song highlighting
- Song numbering and duration display

🎨 **Additional Features**
- Shuffle mode
- Repeat modes (Off, All, One)
- Autoplay functionality
- Keyboard shortcuts
- Responsive design for all screen sizes
- Beautiful UI with smooth animations

## How to Use

### Basic Controls
1. **Play/Pause**: Click the play/pause button or press Spacebar
2. **Previous/Next**: Click the previous/next buttons or press P/N keys
3. **Seek**: Click on the progress bar to jump to a position
4. **Volume**: Click on the volume bar to adjust volume
5. **Select Song**: Click any song in the playlist to play it

### Advanced Features
- **Shuffle**: Click the shuffle button (or press S) to randomize song order
- **Repeat**: Click the repeat button (or press R) to cycle through repeat modes:
  - Off: Play once and stop
  - All: Repeat entire playlist
  - One: Repeat current song
- **Autoplay**: Toggle autoplay to automatically play next song when current ends

### Keyboard Shortcuts
- **Spacebar**: Play/Pause
- **Arrow Left**: Rewind 10 seconds
- **Arrow Right**: Forward 10 seconds
- **Arrow Up**: Increase volume
- **Arrow Down**: Decrease volume
- **N**: Next song
- **P**: Previous song
- **S**: Toggle shuffle
- **R**: Toggle repeat

## Adding Your Own Music and Images

### ✅ Images Already Included!

Sample album art images are already included in the `images` folder:
- `album1.jpg` through `album5.jpg` are ready to use!
- These images are already configured in the playlist
- Just open `index.html` and you'll see them in the player

### Adding Your Own Images

**Option 1: Generate Custom Album Art**
1. Open `images/generate-placeholders.html` in your browser
2. Enter album and artist names
3. Choose colors and generate
4. Download and replace existing images

**Option 2: Download New Images**
1. Run `images/download-images.bat` to get new placeholder images
2. Images will be automatically downloaded

**Option 3: Add Your Own**
1. Add your album art images to the `images` folder
2. Name them (e.g., `album1.jpg`, `my-song-cover.png`)
3. Update the playlist in `script.js` if using different names

### Adding Songs

To add your own songs, edit the `playlist` array in `script.js`:

```javascript
const playlist = [
    {
        title: "Your Song Title",
        artist: "Artist Name",
        album: "Album Name",
        src: "songs/your-song.mp3",  // Local file path or URL
        albumArt: "images/album-art.jpg",  // Path to image in images folder
        duration: "3:45"  // Song duration (optional, will be auto-detected)
    },
    // Add more songs...
];
```

### Image Requirements

- **Location**: Place images in the `images/` folder
- **Formats**: JPG, PNG, GIF, WebP, SVG
- **Size**: Recommended 300x300 pixels or larger
- **Aspect Ratio**: Square (1:1) works best for the circular display
- **Fallback**: If an image fails to load, a default placeholder will be shown automatically

### Supported Audio Formats
- MP3
- WAV
- OGG
- M4A (depending on browser)

### Notes
- For local files, use relative paths (e.g., `"songs/song1.mp3"`)
- For online files, use full URLs (e.g., `"https://example.com/song.mp3"`)
- Album art can be local images or URLs
- Duration will be automatically detected if not provided

## File Structure

```
music/
├── index.html      # Main HTML file
├── styles.css      # All styling and animations
├── script.js       # Player logic and functionality
└── README.md       # This file
```

## Browser Support

- Chrome (latest) ✅
- Firefox (latest) ✅
- Safari (latest) ✅
- Edge (latest) ✅
- Mobile browsers ✅

## Features in Detail

### Progress Bar
- Click anywhere to seek
- Visual progress indicator
- Current time and total duration display
- Smooth animation during playback

### Volume Control
- Click to set volume
- Visual volume indicator
- Volume icon changes based on level (mute, low, high)
- Percentage display

### Playlist
- Scrollable playlist
- Active song highlighting
- Click to play any song
- Song information display

### Animations
- Album art rotates during playback
- Smooth transitions on all interactions
- Button hover effects
- Progress bar animations

## Customization

You can customize:
- Colors in `styles.css` (modify gradient colors)
- Playlist in `script.js` (add/remove songs)
- Button sizes and layouts
- Animation speeds

## Troubleshooting

### Songs not playing?
- Check if audio file paths are correct
- Ensure audio format is supported by browser
- Check browser console for errors

### Album art not showing?
- Verify image paths are correct (should be `images/your-image.jpg`)
- Ensure images are in the `images/` folder
- Check if image format is supported (JPG, PNG, etc.)
- A default placeholder will show if images can't be loaded
- Check browser console for any error messages

### Keyboard shortcuts not working?
- Make sure you're not focused on an input field
- Check if another application is using the same shortcuts

Enjoy your music! 🎵✨

