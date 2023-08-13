const globalDefaults = {
    frequencyLeft: 150,
    frequencyRight: 156,
    panLeft: -1,
    panRight: 1,
    defaultVolume: 1,
    waveType: "sine",

    firstTimePlay: true
}

let globalAudioVars = {
    audioContext: null,
    oscLeft: null,
    oscRight: null,
    pannerNodeLeft: null,
    pannerNodeRight: null,
    gainNodeLeft: null,
    gainNodeRight: null
}

window.onload = function() {
    console.log("Loaded page - Welcome to Binaural Beat Generator By Aronyo!");

    $("#frequencyLeft").val(globalDefaults.frequencyLeft);
    $("#frequencyRight").val(globalDefaults.frequencyRight);
    // setupAudio();

    document.querySelector("#volumeSlider").addEventListener("change", function() {

        globalAudioVars.gainNodeLeft.gain.value = this.value;
        globalAudioVars.gainNodeRight.gain.value = this.value;
    });
}



function setupAudio() {

    const audioContextClass = window.AudioContext || window.webkitAudioContext; 
    globalAudioVars.audioContext = new audioContextClass();

    globalAudioVars.pannerNodeLeft = globalAudioVars.audioContext.createStereoPanner();
    globalAudioVars.pannerNodeLeft.pan.value = globalDefaults.panLeft;
    
    globalAudioVars.gainNodeLeft = globalAudioVars.audioContext.createGain();
    globalAudioVars.gainNodeLeft.gain.value = globalDefaults.defaultVolume;

    globalAudioVars.pannerNodeRight = globalAudioVars.audioContext.createStereoPanner();
    globalAudioVars.pannerNodeRight.pan.value = globalDefaults.panRight;

    globalAudioVars.gainNodeRight = globalAudioVars.audioContext.createGain();
    globalAudioVars.gainNodeRight.gain.value = globalDefaults.defaultVolume;

    let frequencyLeft = document.querySelector("#frequencyLeft").value;
    let frequencyRight = document.querySelector("#frequencyRight").value;

    createNewOscillatorNodes(globalDefaults.waveType, frequencyLeft, frequencyRight);
}

function createNewOscillatorNodes(type, frequencyLeft, frequencyRight) {

    globalAudioVars.oscLeft = globalAudioVars.audioContext.createOscillator();
    globalAudioVars.oscLeft.type = type;
    globalAudioVars.oscLeft.frequency.value = frequencyLeft;

    globalAudioVars.oscLeft.connect(globalAudioVars.gainNodeLeft).connect(globalAudioVars.pannerNodeLeft).connect(globalAudioVars.audioContext.destination);

    globalAudioVars.oscRight = globalAudioVars.audioContext.createOscillator();
    globalAudioVars.oscRight.type = type;
    globalAudioVars.oscRight.frequency.value = frequencyRight;

    globalAudioVars.oscRight.connect(globalAudioVars.gainNodeRight).connect(globalAudioVars.pannerNodeRight).connect(globalAudioVars.audioContext.destination);
}

function generateAudio() {

    setupAudio();
    globalAudioVars.oscLeft.start();
    globalAudioVars.oscLeft.stop(globalAudioVars.audioContext.currentTime + 3);

    globalAudioVars.oscRight.start();
    globalAudioVars.oscRight.stop(globalAudioVars.audioContext.currentTime + 3);
}

function playTone() {

    if (globalDefaults.firstTimePlay) {
        setupAudio();
        globalDefaults.firstTimePlay = false;
    }
    else {
        pauseTone();

        let frequencyLeft = document.querySelector("#frequencyLeft").value;
        let frequencyRight = document.querySelector("#frequencyRight").value;

        createNewOscillatorNodes(globalDefaults.waveType, frequencyLeft, frequencyRight);
    }

    globalAudioVars.oscLeft.start();
    globalAudioVars.oscRight.start();
}

function pauseTone() {
    globalAudioVars.oscLeft.stop();
    globalAudioVars.oscRight.stop();
}