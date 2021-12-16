const song = document.getElementById('song');
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.play-forward');
const backBtn = document.querySelector('.play-back');
const durationTime = document.querySelector('.duration');
const remaintionTime = document.querySelector('.remaintion');
const rangeBar = document.querySelector('.range');
let isPlaying = true;
let indexSong = 0;
const musics = ["TinyLove.mp3","EmThích.mp3","GreenLove.mp3", "ĐếVương.mp3"]
displayTimer();
let timer;
song.setAttribute("src", `./music/${musics[indexSong]}`);

nextBtn.addEventListener('click', function() {
    changeSong(1);
})

backBtn.addEventListener('click', function() {
    changeSong(-1);
})
function changeSong (dir) {
    if (dir === 1) {
        //nextSong
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }

        isPlaying = true;
    } else if (dir === -1) {
        //backSong
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    song.setAttribute("src", `./music/${musics[indexSong]}`);
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











// songs = [
//     {
//         song: './music/ĐếVương.mp3',
//         name: 'Đế Vương',
//         name_author: 'Đình Dũng - Dunghoangpham Cover'
//     },
//     {
//         song: './music/EmThích.mp3',
//         name: 'Em Thích',
//         name_author: 'Sean ft. Lửa'
//     },
//     {
//         song: './music/Green Love.mp3',
//         name: 'Green Love',
//         name_author: 'CASHMEL ft. QNT'
//     },
//     {
//         song: '../music/Tiny Love.mp3',
//         name: 'Tiny Love',
//         name_author: 'Thinh Suy'
//     }
// ];


















