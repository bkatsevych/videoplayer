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
const pipBtn = container.querySelector(".pic-in-pic span");
const fullScBtn = container.querySelector(".fullscreen i");
const videoTimeline = container.querySelector(".video-timeline");
const currentVidTime = document.querySelector(".current-time");
const videoDuration = container.querySelector(".video-duration");

// Autohide
let timer;

const hideControls = () => {
    if (mainVideo.paused) return;

    timer = setTimeout(() => {
        container.classList.remove("show-controls");
    }, 3000);
};

hideControls();

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();
});

const formatTime = (time) => {
    let seconds = Math.floor(time % 60),
        minutes = Math.floor(time / 60) % 60,
        hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours == 0) {
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
};

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
    currentVidTime.innerText = formatTime(currentTime);
});

// Display duration on the bar
mainVideo.addEventListener("loadeddata", (e) => {
    videoDuration.innerText = formatTime(e.target.duration);
});

// Display duration by mouse hover
videoTimeline.addEventListener("mousemove", (e) => {
    const progressTime = videoTimeline.querySelector("span");
    let offsetX = e.offsetX;
    progressTime.style.left = `${offsetX}px`;
    let timelineWidth = videoTimeline.clientWidth;
    let percent = (e.offsetX / timelineWidth) * mainVideo.duration;
    progressTime.innerText = formatTime(percent);
});

// update video time on progressbar click
videoTimeline.addEventListener("click", (e) => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
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

// PiP mode
pipBtn.addEventListener("click", () => {
    mainVideo.requestPictureInPicture();
});

// Fullscreen mode
fullScBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");

    if (document.fullscreenElement) {
        fullScBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
});
