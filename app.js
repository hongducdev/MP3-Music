const song = document.getElementById('song');
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.play-forward');
const backBtn = document.querySelector('.play-back');
const durationTime = document.querySelector('.duration');
const remaintionTime = document.querySelector('.remaintion');
const rangeBar = document.querySelector('.range');
const musicName = document.querySelector('.music-name');
const musicImage = document.querySelector('.music-thumb img');
const musicAuthor = document.querySelector('.music-name-author');
const playRepeat = document.querySelector('.repeat')
const shuffleBtn = document.querySelector('.shuffle');

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
let isShuffle = false;
// const musics = ["TinyLove.mp3","EmThích.mp3","GreenLove.mp3", "ĐếVương.mp3"]

const musics = [
    {
        id: "1",
        title: "Tiny Love",
        author: "Thinh Suy",
        file: "TinyLove.mp3",
        image: "https://mp3lofi.com/wp-content/uploads/2021/12/Tiny-Love-Thinh-Suy.jpg"
    },
    {
        id: "2",
        title: "Em Thích",
        author: "Sean ft. Lửa",
        file: "EmThích.mp3",
        image: "https://mp3lofi.com/wp-content/uploads/2021/12/Tiny-Love-Thinh-Suy.jpg"
    },
    {
        id: "3",
        title: "Green Love",
        author: "TCASHMEL ft. QNT",
        file: "GreenLove.mp3",
        image: "https://mp3lofi.com/wp-content/uploads/2021/12/Tiny-Love-Thinh-Suy.jpg"
    },
    {
        id: "4",
        title: "Đế Vương",
        author: "Dunghoangpham Cover",
        file: "ĐếVương.mp3",
        image: "https://mp3lofi.com/wp-content/uploads/2021/12/Tiny-Love-Thinh-Suy.jpg"
    },
    {
        id: "5",
        title: "Độ Tộc 2",
        author: "Do Mixi, Phao, Phuc Du, Masew",
        file: "dotoc2.mp3",
        image: "https://mp3lofi.com/wp-content/uploads/2021/12/Tiny-Love-Thinh-Suy.jpg"
    },
]
displayTimer();
let timer;
song.setAttribute("src", `./music/${musics[indexSong].file}`);

playRepeat.addEventListener('click', function() {
    if (isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute('style');
    } else {
        isRepeat = true;
        playRepeat.style.color = '#20e3b2';
    }
});

shuffleBtn.addEventListener('click', function() {
    if (isShuffle) {
        isShuffle = false;
        shuffleBtn.removeAttribute('style');
    } else {
        isShuffle = true;
        shuffleBtn.style.color = '#20e3b2';
    }
})

nextBtn.addEventListener('click', function() {
    changeSong(1);
})

backBtn.addEventListener('click', function() {
    changeSong(-1);
})

song.addEventListener("ended", handleEndSong);
function handleEndSong () {
    if (isRepeat) {
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }
}

function changeSong(n) {
    if (isShuffle) {
        indexSong = Math.floor(Math.random() * musics.length);
    } else {
        indexSong += n;
    }
    if (indexSong < 0) {
        indexSong = musics.length - 1;
    } else if (indexSong > musics.length - 1) {
        indexSong = 0;
    }
    init(indexSong);
    playPause();
}

playBtn.addEventListener('click', playPause);
function playPause() {
    if (isPlaying) {
        song.play();
        playBtn.innerHTML = `<ion-icon name="pause"></ion-icon>`;
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    } else {
        song.pause();
        playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
        isPlaying = true;
        clearInterval(timer);
    }
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    durationTime.textContent = formatTimer(currentTime);
    if (!duration) {
        remaintionTime.textContent = "0:00";
    } else {
        remaintionTime.textContent = formatTimer(duration);
    }
}

function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    if (seconds < 10) {
        return `${minutes}:0${seconds}`;
    }else {
        return `${minutes}:${seconds}`
    }
}

rangeBar.addEventListener('change', handleChangerBar);
function handleChangerBar() {
    song.currentTime = rangeBar.value;
}

function init(indexSong) {
    displayTimer();
    song.setAttribute("src", `./music/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
    musicAuthor.textContent = musics[indexSong].author;
}
init(indexSong);


















