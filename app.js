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

    // Play sound
    play.addEventListener('click', () => {
        checkPlay(song);
    });

    // Select sound
    timeSelect.forEach(option => {
        // We use an ES5 function to make use of the "this" keyword
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`; 
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
    }
};

app();