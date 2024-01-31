// Obtém referências aos elementos do DOM
const buttonPlayPause = document.getElementById("play-pause");
const buttonNext = document.getElementById("next");
const buttonComeBack = document.getElementById("come-back");
const audioChapter = document.getElementById("audio-chapter");
const titleChapter = document.getElementById("chapter");

// Define o número total de capítulos
const numberOfChapters = 10;
let itsPlaying = false;
let currentChapter = 1;

// Função para reproduzir o áudio
const playTrack = () => {
    audioChapter
        .play()
        .then(() => {
            itsPlaying = true;
            updatePlayPauseIcon();
        })
        .catch((error) => {
            console.error("Erro ao reproduzir áudio:", error);
            // Lide com o erro, se necessário
        });
};

// Função para pausar o áudio
const pauseTrack = () => {
    audioChapter.pause();
    itsPlaying = false;
    updatePlayPauseIcon();
};

// Função para alternar entre reprodução e pausa
const playOrPause = () => {
    itsPlaying ? pauseTrack() : playTrack();
};

// Função para mudar de capítulo (próximo ou anterior)
const changeChapter = (direction) => {
    currentChapter =
        direction === "next"
            ? (currentChapter % numberOfChapters) + 1
            : ((currentChapter - 2 + numberOfChapters) % numberOfChapters) + 1;
    audioChapter.src = `assets/${currentChapter}.mp3`;
    playTrack();
    changeTrackname();
};

// Função para avançar para o próximo capítulo
const nextTrack = () => {
    changeChapter("next");
};

// Função para retroceder para o capítulo anterior
const backTrack = () => {
    changeChapter("come-back");
};

// Função para atualizar o ícone de reprodução/pausa
const updatePlayPauseIcon = () => {
    const iconClass = itsPlaying
        ? "bi-pause-circle-fill"
        : "bi-play-circle-fill";
    buttonPlayPause.classList.remove(
        "bi-play-circle-fill",
        "bi-pause-circle-fill"
    );
    buttonPlayPause.classList.add(iconClass);
};

// Função para atualizar o nome do capítulo
const changeTrackname = () => {
    titleChapter.innerText = `Capitulo ${currentChapter}`;
};

// Inicialização
changeTrackname();

// Adiciona ouvintes de eventos aos botões
buttonPlayPause.addEventListener("click", playOrPause);
buttonNext.addEventListener("click", nextTrack);
buttonComeBack.addEventListener("click", backTrack);
