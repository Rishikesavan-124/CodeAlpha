# How to Get Images for Your Music Player

## Option 1: Generate Custom Album Art (Recommended)

1. **Open** `generate-placeholders.html` in your web browser
2. **Enter** album name and artist name
3. **Choose** a color scheme
4. **Click** "Generate Image"
5. **Click** "Download Image" to save
6. **Rename** the downloaded image to `album1.jpg`, `album2.jpg`, etc.
7. **Move** the images to the `images` folder

## Option 2: Download Placeholder Images

### Using PowerShell (Windows):
1. **Right-click** on `download-images.bat`
2. **Select** "Run as administrator" (if needed)
3. The script will download 5 sample images automatically

### Using PowerShell manually:
```powershell
cd music\images
powershell -ExecutionPolicy Bypass -File download-images.ps1
```

## Option 3: Add Your Own Images

1. **Find** album art images online (Unsplash, Pexels, Pixabay)
2. **Download** the images
3. **Rename** them to `album1.jpg`, `album2.jpg`, etc.
4. **Place** them in the `images` folder
5. **Update** the playlist in `script.js` if using different names

## Option 4: Use Online Image URLs

You can also use online image URLs directly in `script.js`:

```javascript
{
    title: "My Song",
    artist: "My Artist",
    album: "My Album",
    src: "songs/my-song.mp3",
    albumArt: "https://example.com/album-art.jpg", // Online URL
    duration: "3:45"
}
```

## Image Requirements

- **Format**: JPG, PNG, GIF, WebP
- **Size**: 300x300 pixels or larger (square recommended)
- **File Size**: Under 500KB recommended
- **Naming**: Use simple names like `album1.jpg`, `album2.jpg`

## Quick Start

The easiest way is to use the **Image Generator**:
1. Open `generate-placeholders.html`
2. Generate images for each song
3. Download and rename them
4. Done! Your images will appear in the player

Enjoy your music player! 🎵

