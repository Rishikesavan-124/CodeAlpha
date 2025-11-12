// Gallery images data with categories
const galleryImages = [
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
        title: 'Mountain Landscape',
        category: 'nature'
    },
    {
        src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=800&fit=crop',
        title: 'City Skyline',
        category: 'city'
    },
    {
        src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=800&fit=crop',
        title: 'Wild Lion',
        category: 'animals'
    },
    {
        src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=800&fit=crop',
        title: 'Abstract Art',
        category: 'abstract'
    },
    {
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=800&fit=crop',
        title: 'Forest Path',
        category: 'nature'
    },
    {
        src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=800&fit=crop',
        title: 'Urban Architecture',
        category: 'city'
    },
    {
        src: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&h=800&fit=crop',
        title: 'Ocean Wave',
        category: 'nature'
    },
    {
        src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=800&fit=crop',
        title: 'Colorful Parrot',
        category: 'animals'
    },
    {
        src: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=800&fit=crop',
        title: 'Abstract Colors',
        category: 'abstract'
    },
    {
        src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=800&fit=crop',
        title: 'Sunset Fields',
        category: 'nature'
    },
    {
        src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=800&fit=crop',
        title: 'Modern City',
        category: 'city'
    },
    {
        src: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&h=800&fit=crop',
        title: 'Elephant Family',
        category: 'animals'
    },
    {
        src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=800&fit=crop',
        title: 'Geometric Abstract',
        category: 'abstract'
    },
    {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=800&fit=crop',
        title: 'Lush Forest',
        category: 'nature'
    },
    {
        src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=800&fit=crop',
        title: 'Mountain Road',
        category: 'city'
    },
    {
        src: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=800&fit=crop',
        title: 'Tiger Portrait',
        category: 'animals'
    },
    {
        src: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=800&fit=crop',
        title: 'Vibrant Abstract',
        category: 'abstract'
    },
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
        title: 'Snow Peaks',
        category: 'nature'
    }
];

// State management
let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [];

// Initialize gallery
function initGallery() {
    renderGallery();
    setupEventListeners();
}

// Render gallery items
function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    // Filter images based on current filter
    filteredImages = currentFilter === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === currentFilter);

    // Create gallery items
    filteredImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        galleryItem.dataset.category = image.category;

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title;
        img.loading = 'lazy';

        const title = document.createElement('div');
        title.className = 'gallery-item-title';
        title.textContent = image.title;

        galleryItem.appendChild(img);
        galleryItem.appendChild(title);
        gallery.appendChild(galleryItem);

        // Add click event to open lightbox
        galleryItem.addEventListener('click', () => {
            openLightbox(index);
        });

        // Add loading state
        img.addEventListener('load', () => {
            galleryItem.classList.remove('loading');
        });

        galleryItem.classList.add('loading');
    });
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Update current filter
            currentFilter = btn.dataset.filter;
            // Re-render gallery
            renderGallery();
        });
    });

    // Lightbox controls
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCounter = document.getElementById('lightbox-counter');

    const image = filteredImages[index];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxCounter.textContent = `${index + 1} / ${filteredImages.length}`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Show previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxImage();
}

// Show next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightboxImage();
}

// Update lightbox image
function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCounter = document.getElementById('lightbox-counter');

    const image = filteredImages[currentImageIndex];
    
    // Fade out
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.title;
        lightboxTitle.textContent = image.title;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${filteredImages.length}`;
        
        // Fade in
        lightboxImage.style.opacity = '1';
    }, 150);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initGallery);

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

