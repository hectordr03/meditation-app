const app = () => {
    // HTML element variables
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-select button');
    // Time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    // Get the length of the outline
    const outlineLength = outline.getTotalLength();
    // Duration
    let fakeDuration = 300;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Select different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlay(song);
        })
    })

    // Play sound
    play.addEventListener('click', () => {
        checkPlay(song);
    });

    // Select sound
    timeSelect.forEach(option => {
        // We use an ES5 function to make use of the "this" keyword
        option.addEventListener('click', function () {
            let seconds = Math.floor(fakeDuration % 60);
            let minutes = Math.floor(fakeDuration / 60);
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${minutes}:${seconds}`;
        })
    })

    // Function specific to stop and play sounds
    const checkPlay = (song) => {
        if (song.paused == true) {
            song.play();
            video.play();
            play.src = './assets/DevEd-assets/svg/pause.svg';
        }
        else {
            song.pause();
            video.pause();
            play.src = './assets/DevEd-assets/svg/play.svg';
        }
    }

    // Animate circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Circle animation
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        // Stop timer and video once timer hits 0
        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './assets/DevEd-assets/svg/play.svg';
            video.pause();
        }
    }
};

app();