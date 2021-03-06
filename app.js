class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.muteBtns = document.querySelectorAll('.mute');
        this.selects = document.querySelectorAll('select');
        this.tempo = document.querySelector('.tempo-slider');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.isPlaying = null;
        this.bpm = 150;
        this.index = 0;
    }

    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // loop over each pad
        activeBars.forEach(bar => {
            bar.style.animation = 'playTrack .3s alternate ease-in-out 2';
            // playing sounds
            if (bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
    }

    start() {
        let interval = (60 / this.bpm) * 1000;
        // check if it's playing
        if (this.isPlaying) {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        } else {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        }
    }

    activePad() {
        this.classList.toggle('active');
    }

    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.classList.add('active');
            this.playBtn.innerText = 'Stop';
        } else {
            this.playBtn.classList.remove('active');
            this.playBtn.innerText = 'Start';
        }
    }

    mute(e) {
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if (e.target.classList.contains('active')) {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    break;
            }
        } else {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }

    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) {
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectionValue;
                break;
        }
    }

    changeTempo(e){
        document.querySelector('.tempo-nr').innerText = e.target.value;        
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            this.bpm = e.target.value;
            if(this.playBtn.classList.contains('active')){
                this.start();                    
            }
    }
}

const drumKit = new DrumKit;

// Event Listeners
drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});

drumKit.playBtn.addEventListener('click', function () {
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.muteBtns.forEach(muteBtn => {
    muteBtn.addEventListener('click', function (e) {
        drumKit.mute(e);
    });
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeSound(e);
    });
});

drumKit.tempo.addEventListener('input', function(e){
    drumKit.changeTempo(e);    
});