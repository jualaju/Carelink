document.addEventListener('DOMContentLoaded', () => {
    const songs = [
        {
            title: "Dil To Pagal Hai",
            artist: "Lata Mangeshkar, Udit Narayan",
            src: "music/dil-to-pagal-hai.mp3",
            cover: "covers/dil-to-pagal-hai.jpg",
            category: "bollywood"
        },
        {
            title: "Taal Se Taal",
            artist: "A.R. Rahman",
            src: "music/taal-se-taal.mp3",
            cover: "covers/taal.jpg",
            category: "bollywood"
        },
        // Add more songs here
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    const audio = new Audio();

    // Initialize player
    function initializePlayer() {
        const playlist = document.getElementById('playlist');
        songs.forEach((song, index) => {
            const songItem = createSongItem(song, index);
            playlist.appendChild(songItem);
        });

        updatePlayerInfo();
        setupEventListeners();
    }

    function createSongItem(song, index) {
        const div = document.createElement('div');
        div.className = 'song-item';
        div.innerHTML = `
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-duration">3:45</div>
        `;
        div.addEventListener('click', () => playSong(index));
        return div;
    }

    function updatePlayerInfo() {
        const song = songs[currentSongIndex];
        document.getElementById('trackName').textContent = song.title;
        document.getElementById('artistName').textContent = song.artist;
        document.getElementById('albumArt').src = song.cover;
    }

    function playSong(index) {
        currentSongIndex = index;
        audio.src = songs[index].src;
        audio.play();
        isPlaying = true;
        updatePlayerInfo();
        updatePlayButton();
        highlightCurrentSong();
    }

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
        updatePlayButton();
    }

    function updatePlayButton() {
        const playBtn = document.getElementById('playBtn');
        playBtn.innerHTML = isPlaying ? 
            '<i class="fas fa-pause"></i>' : 
            '<i class="fas fa-play"></i>';
    }

    function highlightCurrentSong() {
        const songItems = document.querySelectorAll('.song-item');
        songItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSongIndex);
        });
    }

    function setupEventListeners() {
        document.getElementById('playBtn').addEventListener('click', togglePlay);
        document.getElementById('prevBtn').addEventListener('click', playPrevious);
        document.getElementById('nextBtn').addEventListener('click', playNext);
        document.getElementById('volumeSlider').addEventListener('input', updateVolume);

        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => filterSongs(btn.dataset.category));
        });

        // Audio events
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', playNext);
    }

    function playPrevious() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    }

    function playNext() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    }

    function updateVolume(e) {
        audio.volume = e.target.value / 100;
    }

    function updateProgress() {
        const progress = document.getElementById('progress');
        const currentTime = document.getElementById('currentTime');
        const duration = document.getElementById('duration');

        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + '%';

        currentTime.textContent = formatTime(audio.currentTime);
        duration.textContent = formatTime(audio.duration);
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function filterSongs(category) {
        const playlist = document.getElementById('playlist');
        playlist.innerHTML = '';

        const filteredSongs = category === 'all' ? 
            songs : 
            songs.filter(song => song.category === category);

        filteredSongs.forEach((song, index) => {
            const songItem = createSongItem(song, songs.indexOf(song));
            playlist.appendChild(songItem);
        });

        // Update category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
    }

    // Initialize the player
    initializePlayer();
}); 