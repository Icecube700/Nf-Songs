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
    const repeatButton = document.getElementById("repeat");
    let currentSongIndex = 0;
    let isShuffling = false;
    let isRepeating = false;
    

   
    const songs = [
        { title: "How Could You Leave Us", src: "NF - How Could You Leave Us - Copy.mp3" },
        { title: "3_Am", src: "NF_-_3_AM.mp3" },
        { title: "Change", src: "NF_-_Change_CeeNaija.com_.mp3" },
        
        { title: "Clouds", src: "NF_-_Clouds_CeeNaija.com_.mp3" },
        { title: "Can You Hold Me", src: "NF_-_Can_You_Hold_Me_CeeNaija.com_.mp3" },
        { title: "Dreams", src: "NF_-_Dreams_CeeNaija.com_.mp3" },
        { title: "Face It", src: "NF_-_Face_it_Naijaremix.mp3" },
        { title: "Happy", src: "NF_-_Happy_CeeNaija.com_.mp3" },
        { title: "Hope", src: "NF_-_Hope_CeeNaija.com_.mp3" },
        { title: "Hate Myelf", src: "NF_-_Hate_Myself_CeeNaija.com_.mp3" },
        { title: "Just Like You", src: "NF_-_Just_Like_You_CeeNaija.com_.mp3" },
        { title: "I Got Jesus", src: "NF_-_I_Got_Jesus_CeeNaija.com_.mp3" },
        { title: "Drifting", src: "08 - DRIFTING.mp3"},
        { title: "Story",  src: "04 - STORY.mp3"},
        { title: "Running",  src: "NF-RUNNING-(JustNaija.com).mp3"},
        { title: "Pandemonium",  src: "NF-PANDEMONIUM-(JustNaija.com).mp3"},
        { title: "Mistake",  src: "NF-MISTAKE-(JustNaija.com).mp3"},
        { title: "Mama",  src: "NF-MAMA-(JustNaija.com).mp3"},
        { title: "Gone",  src: "NF-GONE-Ft-Julia-Michaels-(JustNaija.com).mp3"},
        { title: "Let Em Pray",  src: "NF-LET-EM-PRAY-(JustNaija.com).mp3"},
        { title: "Careful",  src: "NF-CAREFUL-ft-Cordae-(JustNaija.com).mp3"},
        { title: "Bullet",  src: "NF-BULLET-(JustNaija.com).mp3"},
        { title: "Prideful",  src: "05 - PRIDEFUL.mp3"},
        { title: "Why",  src: "NF_-_Why_CeeNaija.com_.mp3"},
        { title: "Wait",  src: "NF_-_Wait_Gospeltelegraph.com.mp3"},
        { title: "Trust", src: "09 - TRUST (feat. Tech N9ne).mp3"},
        { title: "10 Feet Down", src: "NF_ft_Ruelle_-_10_Feet_Down.mp3"},
        { title: "Trauma", src: "NF_-_Trauma_CeeNaija.com_.mp3"},
        { title: "Time", src: "NF_-_Time.mp3"},
        { title: "Thinking", src: "NF_-_Thinking_CeeNaija.com_.mp3"},
        { title: "Statement", src: "NF_-_Statement_CeeNaija.com_.mp3"},
        { title: "Returns", src: "NF_-_Returns.mp3"},
        { title: "Remember This", src: "NF_-_Remember_This_CeeNaija.com_.mp3"},
        { title: "Paralyzed", src: "NF_-_Paralyzed_Gospeltelegraph.com - Copy.mp3"},
        { title: "Outcast", src: "NF_-_Outcast.mp3"},
        { title: "Options", src: "NF_-_Options.mp3"},
        { title: "Only", src: "NF_-_Only_CeeNaija.com_.mp3"},
        { title: "When I Grow Up", src: "NF_-_When_I_Grow_Up.mp3"},
        { title: "Thats A Joke", src: "02 - THAT'S A JOKE.mp3"},
        { title: "One Hundred",  src: "NF_-_One_Hundred_CeeNaija.com_.mp3"},
        { title: "Oh Lord",  src: "NF_-_Oh_Lord_CeeNaija.com_.mp3"},
        { title: "No Name",  src: "NF_-_No_Name_CeeNaija.com_.mp3"},
        { title: "No Excuses",  src: "NF_-_No_Excuses.mp3"},
        { title: "Nate",  src: "NF_-_Nate.mp3"},
        { title: "My Stress",  src: "NF_-_My_Stress_CeeNaija.com_.mp3"},
        { title: "Motto",  src: "NF_-_MOTTO_CeeNaija.com_.mp3"},
        { title: "Miss You",  src: "NF_-_Miss_You_CeeNaija.com_.mp3"},
        { title: "Lost",  src: "NF_-_LOST_Ft_Hopsin_CeeNaija.com_.mp3"},
        { title: "Like This",  src: "NF_-_Like_This.mp3"},
        { title: "Lie",  src: "NF_-_Lie.mp3"},
        { title: "Let You Down",  src: "NF_-_Let_You_Down.mp3"},
        { title: "Layers", src: "07 - LAYERS.mp3"}
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
 
    function toggleRepeat() {
        isRepeating = !isRepeating;
        repeatButton.innerText = isRepeating ? "Repeat On" : "Repeat Off";
    }

    function handleSongEnd() {
        if (isRepeating) {
            audio.currentTime = 0;
            audio.play();
        } else {
            playNext();
        }
    }


    
    playPauseButton.addEventListener("click", playPause);
    nextButton.addEventListener("click", playNext);
    prevButton.addEventListener("click", playPrev);
    shuffleButton.addEventListener("click", toggleShuffle);
    audio.addEventListener("timeupdate", updateProgress);
    volumeControl.addEventListener("input", setVolume);
    repeatButton.addEventListener("click", toggleRepeat);
    progressContainer.addEventListener("click", setProgress);
    audio.addEventListener("ended", handleSongEnd);
    
    playlistItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audio.play();
        });
    });
    
    loadSong(currentSongIndex);
});
