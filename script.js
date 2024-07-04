// Initialize elements
const audio = document.getElementById("musique");
const track = document.getElementById("track");
const elapsed = document.getElementById("elapsed");
let trackTime = document.getElementById("track-time");
let audioContext;
let analyser;
let source;
let bufferLength;
let dataArray;
const playButton = document.getElementById("play-buttom");
const pauseButton = document.getElementById("pause-buttom");
const stopButton = document.getElementById("stop-buttom");
const skipButton = document.getElementById("skip-buttom");
const skipButton2 = document.getElementById("skip-buttom2");
const volume = document.getElementById("volume");
const volumeValue = document.getElementById("volume-value");
const skipStartButton = document.getElementById("skip-start-buttom");
const skipStartButton2 = document.getElementById("skip-start-buttom2");
const image = document.getElementById("image");
const video = document.getElementById("video");
const check = document.getElementById("check");
const chooseButtonRight = document.getElementById("check.buttom-right");
const chooseButtonLeft = document.getElementById("check.buttom-left");
const cubeFaces = document.querySelectorAll(".box div span");

// Define playlist
const playlist = [
    {
        source: "musique/Legends Never Die (ft. Against The Current)  Worlds 2017 - League of Legends.mp3",
        clips: "Clips_video/Legends Never Die (ft. Against The Current)  Worlds 2017 - League of Legends.mp4",
        temps: 0
    },
    {
        source: "musique/Overlord III - Voracity (Opening)  ENGLISH Ver  AmaLee.mp3",
        clips: "Clips_video/Overlord III - Voracity (Opening)  ENGLISH Ver  AmaLee.mp4",
        temps: 0
    },
    {
        source: "musique/Suzume no Tojimari OST - Main Theme Full[Suzume]by RADWIMPS ft. toaka.mp3",
        clips: "Clips_video/Suzume by Radwimps - Music Video『Suzume no Tojimari』.mp4",
        temps: 0
    },
    {
        source: "musique/Nyan Cat! [Official].mp3",
        clips: "",
        temps: 0
    }
];

// Initialize player
let i = 0;
const taille = playlist.length;

// Utility function to build duration string
function buildDuration(duration) {
    let minutes = Math.floor(duration / 60);
    let secondes = Math.floor(duration % 60);
    secondes = String(secondes).padStart(2, "0");
    return minutes + ":" + secondes;
}

// Set initial track time text
audio.addEventListener("loadedmetadata", function() {
    track.max = audio.duration;
    trackTime.textContent = buildDuration(audio.duration);
});

// Choose between image and video
chooseButtonRight.addEventListener("click", function() {
    check.textContent = "vidéo";
    video.style.display = "initial";
    image.style.display = "none";
    this.style.display = "none";
    chooseButtonLeft.style.display = "initial";
});
chooseButtonLeft.addEventListener("click", function() {
    check.textContent = "Image";
    video.style.display = "none";
    image.style.display = "initial";
    this.style.display = "none";
    chooseButtonRight.style.display = "initial";
});

// Play button
playButton.addEventListener("click", function() {
    audio.play();
    if (video.src) video.play();
    audio.volume = volume.value;
    pauseButton.style.display = "initial";
    stopButton.style.display = "initial";
    this.style.display = "none";
    initializeFrequence();
    initialisation();
});

// Pause button
pauseButton.addEventListener("click", function() {
    audio.pause();
    if (video.src) video.pause();
    playButton.style.display = "initial";
    stopButton.style.display = "initial";
    this.style.display = "none";
});

// Stop button
stopButton.addEventListener("click", function() {
    audio.pause();
    audio.currentTime = 0;
    if (video.src) {
        video.pause();
        video.currentTime = 0;
    }
    playButton.style.display = "initial";
    pauseButton.style.display = "none";
    this.style.display = "none";
});

// Skip button
skipButton.addEventListener("click", function() {
    if (i < taille - 1) {
        i++;
        audio.crossOrigin = "anonymous";
        audio.src = playlist[i].source;
        video.src = playlist[i].clips;
        if (video.src) video.play();
        playButton.style.display = "initial";
        pauseButton.style.display = "none";
        stopButton.style.display = "none";
        skipStartButton.style.display = "initial";
        if (i === taille - 1) this.style.display = "none";
    }
});

// Skip start button
skipStartButton.addEventListener("click", function() {
    if (i > 0) {
        i--;
        audio.crossOrigin = "anonymous";
        audio.src = playlist[i].source;
        video.src = playlist[i].clips;
        if (video.src) video.play();
        playButton.style.display = "initial";
        pauseButton.style.display = "none";
        stopButton.style.display = "none";
        skipButton.style.display = "initial";
        if (i === 0) this.style.display = "none";
    }
});

// Track progress and elapsed time
audio.addEventListener("timeupdate", function() {
    track.value = this.currentTime;
    elapsed.textContent = buildDuration(this.currentTime);
});

// Track seeking
track.addEventListener("input", function() {
    audio.currentTime = this.value;
    if (video.src) video.currentTime = this.value;
    elapsed.textContent = buildDuration(this.value);
});

// Volume control
volume.addEventListener("input", function() {
    audio.volume = this.value;
    volumeValue.textContent = Math.round(this.value * 100) + "%";
});
    
function initializeFrequence(){
    if (!audioContext){
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    }
} 

function getAverageFrequency() {
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
    }
    return sum / bufferLength;
}

function getDecibelLevel() {
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    let count = 0;
    for (let i = 0; i < bufferLength; i++) {
        let value = dataArray[i];
        if (value > 0) { // Only consider positive values
            let db = 20 * Math.log10(value / 255);
            sum += db;
            count++;
        }
    }
    return count > 0 ? sum / count : -Infinity; // Return average decibel or -Infinity if no valid values
}


function initialisation(){
    audioContext.resume().then(() => {
        requestAnimationFrame(updateCubeColor);
    });
}

function updateCubeColor() {
    const averageFrequency = getAverageFrequency();
    const decibel = getDecibelLevel();
    console.log(decibel);
    console.log(averageFrequency);
    const colorIntensity = Math.min(averageFrequency * 1.5, 255);
    const color = `rgb(${255 - colorIntensity}, ${255 - colorIntensity}, 255)`;
    cubeFaces.forEach(face => {
        face.style.background = `linear-gradient(${color}, black)`;
        face.style.borderColor = color;
    });
    requestAnimationFrame(updateCubeColor);
}

function startVisualization() {
    if (!audioContext){
        audioContext.resume().then(() => {
            requestAnimationFrame(updateCubeColor);
        });
    }
}

// Initial setup
audio.crossOrigin = "anonymous";
audio.src = playlist[i].source;
video.src = playlist[i].clips;
