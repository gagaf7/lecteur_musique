// on récupère tous les élémenat nécessaires
const audio = document.querySelector("audio");
const track = document.getElementById("track");
const elapsed = document.querySelector("#elapsed");
let trackTime = document.querySelector("#track-time");
const playButtom = document.querySelector("#play-buttom");
const pauseButtom = document.querySelector("#pause-buttom");
const stopButtom = document.querySelector("#stop-buttom");
const skipButtom = document.querySelector("#skip-buttom");
const skipButtom2 = document.querySelector("#skip-buttom2");
const volume = document.querySelector("#volume");
const volumeValue = document.querySelector("#volume-value");
const musique = document.querySelector("#musique");
const skipStartButtom = document.querySelector("#skip-start-buttom");
const skipStartButtom2 = document.querySelector("#skip-start-buttom2");
const Image = document.querySelector("#image");
const video = document.querySelector("#video");
const check = document.querySelector("#check");
const chooseBoutonRight = document.getElementById("check.buttom-right");
const chooseBoutonLeft = document.getElementById("check.buttom-left");


//on récupère la durer du mp3
let duration = audio.duration;



  const musique1 ={
      source: "musique/Legends Never Die (ft. Against The Current)  Worlds 2017 - League of Legends.mp3",
      clips : "Clips_video/Legends Never Die (ft. Against The Current)  Worlds 2017 - League of Legends.mp4",
      temps : musique.duration,
    };
    const musique2 ={
        source: "musique/Overlord III - Voracity (Opening)  ENGLISH Ver  AmaLee.mp3",
        clips : "Clips_video/Overlord III - Voracity (Opening)  ENGLISH Ver  AmaLee.mp4",
        temps : musique.duration,
    };
    const musique3 ={
        source:"musique/Suzume no Tojimari OST - Main Theme Full[Suzume]by RADWIMPS ft. toaka.mp3"  ,
        clips:"Clips_video/Suzume by Radwimps - Music Video『Suzume no Tojimari』.mp4",
    };
    const musique4 ={
        source:"musique/Nyan Cat! [Official].mp3" ,
        clips:"",
    };


//intialisation de la boucle 
let i = 0
const playlist =[musique1,musique2, musique3, musique4];

//initialisation de la fin de la boucle
const taille = playlist.length;
//permet de modifier le texte pour le temps de la musique
trackTime.textContent = buildDuration(duration);

video.style.display ="none";

//permet de choisir entre l'image ou la vidéo
chooseBoutonRight.addEventListener("click", function(){
    check.textContent = "vidéo";
    video.style.display = "initial";
    Image.style.display ="none";
    this.style.display = "none";
    chooseBoutonLeft.style.display = "initial";
});
chooseBoutonLeft.addEventListener("click", function(){
    check.textContent = "Image";
    video.style.display = "none";
    Image.style.display ="initial";
    this.style.display = "none";
    chooseBoutonRight.style.display = "initial";
});


// on gére un bouton play
playButtom.addEventListener("click" , function(){
    audio.play();
    video.play();
    audio.volume = volume.value;
   pauseButtom.style.display = "initial";
   stopButtom.style.display = "initial";
   this.style.display = "none";
});
// on gère le bouton pause
pauseButtom.addEventListener("click", function(){
    audio.pause();
    video.pause();
    playButtom.style.display = "initial";
    stopButtom.style.display = "initial";
    this.style.display = "none";
});
//on gère le bouton stop
stopButtom.addEventListener("click", function(){
    audio.pause();
    audio.currentTime = 0;
    video.pause();
    video.currentTime = 0;
    playButtom.style.display = "initial";
    pauseButtom.style.display = "none";
    this.style.display = "none";
});

//permet de gérer le passage de musique vers l'avant
skipButtom.addEventListener("click", function(){
    audio.pause();
    audio.currentTime = 0;
    playButtom.style.display = "initial";
    pauseButtom.style.display = "none";
    stopButtom.style.display ="none";
    skipStartButtom.style.display ="initial";
    i = i + 1 ;  //permet de gérer l'indexation des musiques pour aller sur une musiques en avant
    if (i >= taille - 1){    //permet d'arêter la boucle en cachant le bouton d'avancer
        i = taille - 1;
        this.style.display = "none";
    };
    //modifie la source de la musique pour changer de musique
    audio.src= playlist[i].source;
    video.src = playlist[i].clips;
});

//permet de gérer le passage de musique vers l'arrière
skipStartButtom.addEventListener("click", function(){
    audio.pause();
    audio.currentTime = 0;
    playButtom.style.display = "initial";
    pauseButtom.style.display = "none";
    stopButtom.style.display ="none";
    skipButtom.style.display = "initial";
    i = i -1;   //permet de gérer l'indexation des musiques pour aller sur une musiques en arrière
    if (i <= 0){    //permet de ne pas passer en index négatif pour avoir les musiques
        i = 0;
        this.style.display="none";
    };
    //modifie la source de la musiques + la vidéo
    audio.src= playlist[i].source;
    video.src = playlist[i].clips;
});

audio.addEventListener("timeupdate", function(){
    track.value = this.currentTime;
    elapsed.textContent = buildDuration(this.currentTime);
});

track.addEventListener("input", function(){
    elapsed.textContent = buildDuration(this.value);
    audio.currentTime = this.value;
    video.currentTime = this.value;
});


volume.addEventListener("input",function(){
    audio.volume=this.value;
    volumeValue.textContent = Math.round(this.value*100) + "%";
});

function buildDuration(duration){
    let minutes = Math.floor(duration / 60);    
    let reste = duration % 60;
    let secondes = Math.floor(reste);
    secondes = String(secondes).padStart(2, "0");
    return minutes + ":" + secondes;
};
