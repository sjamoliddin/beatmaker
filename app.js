class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.bpm = 150;
        this.index = 0;
    }

    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // loop over each pad
        activeBars.forEach(bar =>{
            bar.style.animation = 'playTrack .3s alternate ease-in-out 2';
        })
        this.index++;
    }

    start() {
        let interval = (60 / this.bpm) * 1000;
        setInterval(() => {
            this.repeat();
        }, interval);
    }

    activePad() {
        this.classList.toggle('active');
    }
}

const drumKit = new DrumKit;

// Event Listeners

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = '';
    })
});

drumKit.playBtn.addEventListener('click', function(){
    drumKit.start();
});