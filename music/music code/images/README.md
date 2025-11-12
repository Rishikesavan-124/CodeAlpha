# Images Folder

This folder contains album art images for your music player.

## ✅ Sample Images Included

Five sample placeholder images have been automatically downloaded:
- `album1.jpg`
- `album2.jpg`
- `album3.jpg`
- `album4.jpg`
- `album5.jpg`

These images are already configured in your playlist and will display in the music player!

## How to Add Your Own Images

### Option 1: Generate Custom Album Art (Recommended)
1. **Open** `generate-placeholders.html` in your web browser
2. **Enter** album name and artist name for each song
3. **Choose** a color scheme
4. **Click** "Generate Image" and then "Download Image"
5. **Rename** to `album1.jpg`, `album2.jpg`, etc.
6. **Replace** the existing images in this folder

### Option 2: Download New Placeholder Images
1. **Run** `download-images.bat` (double-click it)
2. This will download 5 new random placeholder images
3. Images will be automatically named `album1.jpg` through `album5.jpg`

### Option 3: Add Your Own Images
1. **Add your album art images** to this folder
2. **Name them** as `album1.jpg`, `album2.jpg`, etc. (or use any names you prefer)
3. **Update the playlist** in `script.js` to match your image file names

## Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- SVG (.svg)

## Recommended Image Sizes

- **Minimum**: 300x300 pixels
- **Recommended**: 500x500 pixels or larger
- **Aspect Ratio**: Square (1:1) works best

## Example

If you have an image named `my-album.jpg`, update your playlist like this:

```javascript
{
    title: "My Song",
    artist: "My Artist",
    album: "My Album",
    src: "songs/my-song.mp3",
    albumArt: "images/my-album.jpg",  // Path to your image
    duration: "3:45"
}
```

## Tips

- Use high-quality images for best results
- Square images work best for the circular album art display
- Keep file sizes reasonable (under 500KB recommended)
- If an image fails to load, a default placeholder will be shown

## Image Sources

You can get free album art images from:
- Unsplash (unsplash.com)
- Pexels (pexels.com)
- Pixabay (pixabay.com)
- Or create your own!

Happy listening! 🎵

