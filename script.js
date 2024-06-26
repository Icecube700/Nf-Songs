// script.js

document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("audio");
    const playPauseButton = document.getElementById("play-pause");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const shuffleButton = document.getElementById("shuffle");
    const playlistItems = document.querySelectorAll("#playlist li");
    const progressContainer = document.querySelector(".progress-container");
    const progress = document.getElementById("progress");
    const volumeControl = document.getElementById("volume");
    let currentSongIndex = 0;
    let isShuffling = false;

   
    const songs = [
        { title: "How Could You Leeve Us", src: "music/NF - How Could You Leave Us - Copy.mp3" },
        { title: "3_Am", src: "music/NF_-_3_AM.mp3" },
        { title: "Change", src: "music/NF_-_Change_CeeNaija.com_.mp3" },
        { title: "Clouds", src: "music/NF_-_Clouds_CeeNaija.com_.mp3" },
        { title: "Can You Hold Me", src: "music/NF_-_Can_You_Hold_Me_CeeNaija.com_.mp3" },
        { title: "Dreams", src: "music/NF_-_Dreams_CeeNaija.com_.mp3" },
        { title: "Face It", src: "music/NF_-_Face_it_Naijaremix.mp3" },
        { title: "Happy", src: "music/NF_-_Happy_CeeNaija.com_.mp3" },
        { title: "Hope", src: "music/NF_-_Hope_CeeNaija.com_.mp3" },
        { title: "Hate Myelf", src: "music/NF_-_Hate_Myself_CeeNaija.com_.mp3" },
        { title: "Just Like You", src: "music/NF_-_Just_Like_You_CeeNaija.com_.mp3" },
        { title: "I Got Jesus", src: "music/NF_-_I_Got_Jesus_CeeNaija.com_.mp3" },
        { title: "Drifting", src: "music/08 - DRIFTING.mp3"},
        { title: "Story",  src: "music/04 - STORY.mp3"},
        { title: "Running",  src: "music/NF-RUNNING-(JustNaija.com).mp3"},
        { title: "Pandemonium",  src: "music/NF-PANDEMONIUM-(JustNaija.com).mp3"},
        { title: "Mistake",  src: "music/NF-MISTAKE-(JustNaija.com).mp3"},
        { title: "Mama",  src: "music/NF-MAMA-(JustNaija.com).mp3"},
        { title: "Gone",  src: "music/NF-GONE-Ft-Julia-Michaels-(JustNaija.com).mp3"},
        { title: "Let Em Pray",  src: "music/NF-LET-EM-PRAY-(JustNaija.com).mp3"},
        { title: "Careful",  src: "music/NF-CAREFUL-ft-Cordae-(JustNaija.com).mp3"},
        { title: "Bullet",  src: "music/NF-BULLET-(JustNaija.com).mp3"},
        { title: "Prideful",  src: "music/05 - PRIDEFUL.mp3"},
        { title: "Why",  src: "music/NF_-_Why_CeeNaija.com_.mp3"},
        { title: "Wait",  src: "music/NF_-_Wait_Gospeltelegraph.com.mp3"},
        { title: "Trust", src: "music/09 - TRUST (feat. Tech N9ne).mp3"},
        { title: "10 Feet Down", src: "music/NF_ft_Ruelle_-_10_Feet_Down.mp3"},
        { title: "Trauma", src: "music/NF_-_Trauma_CeeNaija.com_.mp3"},
        { title: "Time", src: "music/NF_-_Time.mp3"},
        { title: "Thinking", src: "music/NF_-_Thinking_CeeNaija.com_.mp3"},
        { title: "Statement", src: "music/NF_-_Statement_CeeNaija.com_.mp3"},
        { title: "Returns", src: "music/NF_-_Returns.mp3"},
        { title: "Remember This", src: "music/NF_-_Remember_This_CeeNaija.com_.mp3"},
        { title: "Paralyzed", src: "music/NF_-_Paralyzed_Gospeltelegraph.com - Copy.mp3"},
        { title: "Outcast", src: "music/NF_-_Outcast.mp3"},
        { title: "Options", src: "music/NF_-_Options.mp3"},
        { title: "Only", src: "music/NF_-_Only_CeeNaija.com_.mp3"},
        { title: "When I Grow Up", src: "music/NF_-_When_I_Grow_Up.mp3"},
        { title: "Thats A Joke", src: "music/02 - THAT'S A JOKE.mp3"},
        { title: "One Hundred",  src: "music/NF_-_One_Hundred_CeeNaija.com_.mp3"},
        { title: "Oh Lord",  src: "music/NF_-_Oh_Lord_CeeNaija.com_.mp3"},
        { title: "No Name",  src: "music/NF_-_No_Name_CeeNaija.com_.mp3"},
        { title: "No Excuses",  src: "music/NF_-_No_Excuses.mp3"},
        { title: "Nate",  src: "music/NF_-_Nate.mp3"},
        { title: "My Stress",  src: "music/NF_-_My_Stress_CeeNaija.com_.mp3"},
        { title: "Motto",  src: "music/NF_-_MOTTO_CeeNaija.com_.mp3"},
        { title: "Miss You",  src: "music/NF_-_Miss_You_CeeNaija.com_.mp3"},
        { title: "Lost",  src: "music/NF_-_LOST_Ft_Hopsin_CeeNaija.com_.mp3"},
        { title: "Like This",  src: "music/NF_-_Like_This.mp3"},
        { title: "Lie",  src: "music/NF_-_Lie.mp3"},
        { title: "Let You Down",  src: "music/NF_-_Let_You_Down.mp3"},
        { title: "Layers", src: "music/07 - LAYERS.mp3"}
    ]
    
    
    function loadSong(index) {
        const song = songs[index];
        audio.src = song.src;
        document.getElementById("song-title").innerText = song.title;
        updatePlayingSongHighlight();
    }

    function updatePlayingSongHighlight() {
        const playlistItems = document.querySelectorAll("#playlist li");
        playlistItems.forEach((item, index) => {
            if (index === currentSongIndex) {
                item.classList.add('playing');
            } else {
                item.classList.remove('playing');
            }
        });
    }
    
    function playPause() {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerText = "Pause";
        } else {
            audio.pause();
            playPauseButton.innerText = "Play";
        }
    }
    
    function playNext() {
        if (isShuffling) {
            currentSongIndex = Math.floor(Math.random() * songs.length);
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }
        loadSong(currentSongIndex);
        audio.play();
    }
    
    function playPrev() {
        if (isShuffling) {
            currentSongIndex = Math.floor(Math.random() * songs.length);
        } else {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        }
        loadSong(currentSongIndex);
        audio.play();
    }
    
    function updateProgress() {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
    
    function setVolume() {
        audio.volume = volumeControl.value;
    }
    
    function setProgress(e) {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    function toggleShuffle() {
        isShuffling = !isShuffling;
        shuffleButton.innerText = isShuffling ? "Shuffle On" : "Shuffle Off";
    }
    
    playPauseButton.addEventListener("click", playPause);
    nextButton.addEventListener("click", playNext);
    prevButton.addEventListener("click", playPrev);
    shuffleButton.addEventListener("click", toggleShuffle);
    audio.addEventListener("timeupdate", updateProgress);
    volumeControl.addEventListener("input", setVolume);
    progressContainer.addEventListener("click", setProgress);
    
    playlistItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audio.play();
        });
    });
    
    loadSong(currentSongIndex);
});
