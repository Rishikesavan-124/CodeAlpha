// Playlist data - Replace with your own songs
// Add your images to the 'images' folder and update the paths below
// You can use the generate-placeholders.html tool to create custom album art images

const playlist = [
    {
        title: "Sunset Dreams",
        artist: "Ambient Vibes",
        album: "Chill Collection",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        albumArt: "images/album1.jpg", // Try local first, falls back to placeholder
        duration: "3:45"
    },
    {
        title: "City Lights",
        artist: "Urban Beats",
        album: "Night Life",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        albumArt: "images/album2.jpg",
        duration: "4:12"
    },
    {
        title: "Ocean Waves",
        artist: "Nature Sounds",
        album: "Peaceful Moments",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        albumArt: "images/album3.jpg",
        duration: "3:28"
    },
    {
        title: "Electric Pulse",
        artist: "Digital Dreams",
        album: "Energy Boost",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        albumArt: "images/album4.jpg",
        duration: "5:03"
    },
    {
        title: "Morning Coffee",
        artist: "Acoustic Sessions",
        album: "Relaxed Tunes",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        albumArt: "images/album5.jpg",
        duration: "4:37"
    }
];

// Default album art fallback
const defaultAlbumArt = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23667eea' width='300' height='300'/%3E%3Ctext fill='%23ffffff' font-family='Arial' font-size='24' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EMusic%3C/text%3E%3C/svg%3E";

// Player state
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 0; // 0: off, 1: all, 2: one
let volume = 1;
let autoplay = true;

// DOM elements
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = document.getElementById('play-pause-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const progressBar = document.getElementById('progress-bar');
const progressFilled = document.getElementById('progress-filled');
const progressHandle = document.getElementById('progress-handle');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBar = document.getElementById('volume-bar');
const volumeFilled = document.getElementById('volume-filled');
const volumeHandle = document.getElementById('volume-handle');
const volumeValue = document.getElementById('volume-value');
const volumeIcon = document.getElementById('volume-icon');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const albumName = document.getElementById('album-name');
const albumArt = document.getElementById('album-art');
const albumArtContainer = document.querySelector('.album-art');
const playlistContainer = document.getElementById('playlist');
const autoplayCheckbox = document.getElementById('autoplay');

// Initialize player
function init() {
    loadSong(currentSongIndex);
    renderPlaylist();
    setupEventListeners();
    updateVolumeDisplay();
}

// Load song
function loadSong(index) {
    if (index < 0 || index >= playlist.length) return;

    currentSongIndex = index;
    const song = playlist[index];

    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumName.textContent = song.album;
    
    // Load album art with error handling
    albumArt.src = song.albumArt || defaultAlbumArt;
    albumArt.alt = `${song.title} - ${song.artist}`;
    
    // Handle image loading errors
    albumArt.onerror = function() {
        this.src = defaultAlbumArt;
    };

    // Update active playlist item
    updatePlaylistActive();

    // Load metadata
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    }, { once: true });

    // If autoplay is enabled and player was playing, play the new song
    if (autoplay && isPlaying) {
        playSong();
    }
}

// Play song
function playSong() {
    audioPlayer.play();
    isPlaying = true;
    playPauseIcon.className = 'fas fa-pause';
    albumArtContainer.classList.add('playing');
}

// Pause song
function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseIcon.className = 'fas fa-play';
    albumArtContainer.classList.remove('playing');
}

// Toggle play/pause
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Previous song
function playPrevious() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * playlist.length);
    } else {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// Next song
function playNext() {
    if (repeatMode === 2) {
        // Repeat one song
        audioPlayer.currentTime = 0;
        if (isPlaying) {
            playSong();
        }
        return;
    }

    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * playlist.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
    }
    loadSong(currentSongIndex);
    
    if (autoplay || isPlaying) {
        playSong();
    }
}

// Toggle shuffle
function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
}

// Toggle repeat
function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    repeatBtn.classList.toggle('active', repeatMode > 0);
    
    // Update icon based on repeat mode
    if (repeatMode === 1) {
        repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
        repeatBtn.title = 'Repeat All';
    } else if (repeatMode === 2) {
        repeatBtn.innerHTML = '<i class="fas fa-redo" style="color: #f5576c;"></i>';
        repeatBtn.title = 'Repeat One';
    } else {
        repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
        repeatBtn.title = 'Repeat Off';
    }
}

// Update progress bar
function updateProgress() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFilled.style.width = progress + '%';
    progressHandle.style.left = progress + '%';
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
}

// Seek to position
function seekTo(event) {
    const progressBarRect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - progressBarRect.left;
    const percentage = clickX / progressBarRect.width;
    const seekTime = percentage * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
}

// Update volume
function setVolume(event) {
    const volumeBarRect = volumeBar.getBoundingClientRect();
    const clickX = event.clientX - volumeBarRect.left;
    const percentage = Math.max(0, Math.min(1, clickX / volumeBarRect.width));
    volume = percentage;
    audioPlayer.volume = volume;
    updateVolumeDisplay();
}

// Update volume display
function updateVolumeDisplay() {
    volumeFilled.style.width = (volume * 100) + '%';
    volumeHandle.style.right = ((1 - volume) * 100) + '%';
    volumeValue.textContent = Math.round(volume * 100) + '%';

    // Update volume icon
    if (volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

// Format time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Render playlist
function renderPlaylist() {
    playlistContainer.innerHTML = '';

    if (playlist.length === 0) {
        playlistContainer.innerHTML = '<div class="playlist-empty">No songs in playlist</div>';
        return;
    }

    playlist.forEach((song, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        if (index === currentSongIndex) {
            playlistItem.classList.add('active');
        }

        playlistItem.innerHTML = `
            <div class="playlist-item-thumbnail">
                <img src="${song.albumArt || defaultAlbumArt}" alt="${song.title}" onerror="this.src='${defaultAlbumArt}'">
            </div>
            <div class="playlist-item-number">${index + 1}</div>
            <div class="playlist-item-info">
                <div class="playlist-item-title">${song.title}</div>
                <div class="playlist-item-artist">${song.artist}</div>
            </div>
            <div class="playlist-item-duration">${song.duration}</div>
        `;

        playlistItem.addEventListener('click', () => {
            loadSong(index);
            if (isPlaying) {
                playSong();
            } else {
                playSong();
            }
        });

        playlistContainer.appendChild(playlistItem);
    });
}

// Update active playlist item
function updatePlaylistActive() {
    const items = playlistContainer.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        item.classList.toggle('active', index === currentSongIndex);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Play/Pause button
    playPauseBtn.addEventListener('click', togglePlayPause);

    // Previous/Next buttons
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);

    // Shuffle and Repeat
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);

    // Progress bar
    progressBar.addEventListener('click', seekTo);
    let isDragging = false;

    progressBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        seekTo(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            seekTo(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Volume bar
    volumeBar.addEventListener('click', setVolume);
    let isVolumeDragging = false;

    volumeBar.addEventListener('mousedown', (e) => {
        isVolumeDragging = true;
        setVolume(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isVolumeDragging) {
            setVolume(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isVolumeDragging = false;
    });

    // Audio player events
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
        if (repeatMode === 2) {
            // Repeat one
            audioPlayer.currentTime = 0;
            playSong();
        } else if (repeatMode === 1 || autoplay) {
            // Repeat all or autoplay
            playNext();
        } else {
            // Stop
            pauseSong();
        }
    });

    audioPlayer.addEventListener('loadeddata', () => {
        durationEl.textContent = formatTime(audioPlayer.duration);
    });

    // Autoplay checkbox
    autoplayCheckbox.addEventListener('change', (e) => {
        autoplay = e.target.checked;
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;

        switch (e.key) {
            case ' ':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
                break;
            case 'ArrowRight':
                e.preventDefault();
                audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
                break;
            case 'ArrowUp':
                e.preventDefault();
                volume = Math.min(1, volume + 0.1);
                audioPlayer.volume = volume;
                updateVolumeDisplay();
                break;
            case 'ArrowDown':
                e.preventDefault();
                volume = Math.max(0, volume - 0.1);
                audioPlayer.volume = volume;
                updateVolumeDisplay();
                break;
            case 'n':
                e.preventDefault();
                playNext();
                break;
            case 'p':
                e.preventDefault();
                playPrevious();
                break;
            case 's':
                e.preventDefault();
                toggleShuffle();
                break;
            case 'r':
                e.preventDefault();
                toggleRepeat();
                break;
        }
    });
}

// Initialize on page load
init();

