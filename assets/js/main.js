const container = document.querySelector(".container");
const mainVideo = container.querySelector("video");
const playPauseBtn = container.querySelector(".play-pause i");
const progressBar = container.querySelector(".progress-bar");
const skipBackward = container.querySelector(".skip-backward i");
const skipForward = container.querySelector(".skip-forward i");
const volumeBtn = container.querySelector(".volume i");
const volumeSlider = container.querySelector(".left input");
const speedBtn = container.querySelector(".playback-speed span");
const speedOptions = container.querySelector(".speed-options");

// Play/pause
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

// Progress bar
mainVideo.addEventListener("timeupdate", (e) => {
    let { currentTime, duration } = e.target;
    let ratio = (currentTime / duration) * 100; // % of currentTime from duration
    progressBar.style.width = `${ratio}%`; // displaying respective progress bar width
});

// Skip backward/forward functionality
skipBackward.addEventListener("click", () => {
    mainVideo.currentTime -= 10;
});
skipForward.addEventListener("click", () => {
    mainVideo.currentTime += 10;
});

// Volume
// button
volumeBtn.addEventListener("click", () => {
    if (!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});
// slider
volumeSlider.addEventListener("input", (e) => {
    mainVideo.volume = e.target.value;

    if (e.target.value == 0) {
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    } else {
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    }
});

// Playback speed
speedBtn.addEventListener("click", () => {
    speedOptions.classList.toggle("show");
});

document.addEventListener("click", (e) => {
    if (
        e.target.tagName !== "SPAN" ||
        e.target.className !== "material-symbols-rounded"
    ) {
        speedOptions.classList.remove("show");
    }
});

speedOptions.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});
