const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio')
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2; 

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song;
    cover.src = `images/${song}.jpg`; 
    audio.src = `music/${song}.mp3`;   
}

function playSong() {
    musicContainer.classList.add('play'); 
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play'); 
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
}

function prevSong() {
    songIndex--; 

    if(songIndex<0 ) {
        songIndex = songs.length -1;
    }
    
    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++; 
    if(songIndex >= songs.length){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement; 
    let progressPrecent = (currentTime / duration) * 100; 
    progress.style.width = `${progressPrecent}%`
}

function setProgress(e) {
    const width = this.clientWidth; 
    const clickX = e.offsetX;
    const duration = audio.duration; 

    audio.currentTime = (clickX / width )* duration
}

playBtn.addEventListener('click', ()=> {
    const isPlay = musicContainer.classList.contains('play'); 

    if(isPlay) {
        pauseSong()
    } else {
        playSong()
    }
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress);
