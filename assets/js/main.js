const container = document.querySelector(".container");
const mainVideo = container.querySelector("video");
const playPauseBtn = container.querySelector(".play-pause i");
const progressBar = container.querySelector(".progress-bar");

// play/pause functionality
playPauseBtn.addEventListener("click", () => {
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();

    // change button's icon
    mainVideo.addEventListener("play", () => {
        playPauseBtn.classList.replace("fa-play", "fa-pause");
    });
    mainVideo.addEventListener("pause", () => {
        playPauseBtn.classList.replace("fa-pause", "fa-play");
    });
});

// progress bar functionality
mainVideo.addEventListener("timeupdate", (e) => {
    let { currentTime, duration } = e.target;
    let ratio = (currentTime / duration) * 100; // % of currentTime from duration
    progressBar.style.width = `${ratio}%`; // displaying respective progress bar width
});
