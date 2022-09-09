const container = document.querySelector(".container");
const mainVideo = container.querySelector("video");
const playPauseBtn = container.querySelector(".play-pause i");

// play/pause functionality
playPauseBtn.addEventListener("click", () => {
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();

    // change button's icon
    playPauseBtn.classList.contains("fa-play")
        ? playPauseBtn.classList.replace("fa-play", "fa-pause")
        : playPauseBtn.classList.replace("fa-pause", "fa-play");
});
