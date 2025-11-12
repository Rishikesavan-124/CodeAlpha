# Image Gallery

A beautiful, responsive image gallery with lightbox view, category filters, and smooth animations.

## Features

- ✨ **Beautiful UI** - Modern gradient design with smooth animations
- 🖼️ **Lightbox View** - Click any image to view in fullscreen lightbox
- 🔍 **Category Filters** - Filter images by category (All, Nature, City, Animals, Abstract)
- ⌨️ **Keyboard Navigation** - Use arrow keys to navigate, ESC to close
- 📱 **Responsive Design** - Works perfectly on all screen sizes
- 🎨 **Hover Effects** - Smooth transitions and hover animations
- 🔄 **Navigation Buttons** - Previous/Next buttons for easy browsing

## How to Use

1. Open `index.html` in your web browser
2. Click on any image to open it in the lightbox view
3. Use the filter buttons to filter images by category
4. Navigate through images using:
   - Previous/Next buttons
   - Arrow keys (Left/Right)
   - Click outside the image to close

## Adding Your Own Images

To add your own images:

1. Replace the image URLs in `script.js` in the `galleryImages` array
2. Update the `src` property with your image path
3. Update the `title` and `category` as needed

Example:
```javascript
{
    src: 'images/your-image.jpg',
    title: 'Your Image Title',
    category: 'nature' // or 'city', 'animals', 'abstract'
}
```

## File Structure

```
image gallary/
├── index.html      # Main HTML file
├── styles.css      # All styling and animations
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

You can customize:
- Colors in `styles.css` (modify the gradient and button colors)
- Image categories in `script.js`
- Grid layout in `styles.css` (modify `.gallery` grid-template-columns)
- Animation speeds (modify transition durations)

Enjoy your image gallery! 🎉

