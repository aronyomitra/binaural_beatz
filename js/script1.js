const globalDefaults = {
    frequencyLeft: 150,
    frequencyRight: 156,
    panLeft: -1,
    panRight: 1,
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
    console.log("Loaded page");

    // setupAudio();

}

function setupAudio() {

    const audioContextClass = window.AudioContext || window.webkitAudioContext; 
    globalAudioVars.audioContext = new audioContextClass();

    globalAudioVars.oscLeft = globalAudioVars.audioContext.createOscillator();
    globalAudioVars.oscLeft.type = globalDefaults.waveType;
    globalAudioVars.oscLeft.frequency.value = globalDefaults.frequencyLeft;

    globalAudioVars.pannerNodeLeft = globalAudioVars.audioContext.createStereoPanner();
    globalAudioVars.pannerNodeLeft.pan.value = globalDefaults.panLeft;
    
    globalAudioVars.oscLeft.connect(globalAudioVars.pannerNodeLeft).connect(globalAudioVars.audioContext.destination);

    globalAudioVars.oscRight = globalAudioVars.audioContext.createOscillator();
    globalAudioVars.oscLeft.type = globalDefaults.waveType;
    globalAudioVars.oscRight.frequency.value = globalDefaults.frequencyRight;

    globalAudioVars.pannerNodeRight = globalAudioVars.audioContext.createStereoPanner();
    globalAudioVars.pannerNodeRight.pan.value = globalDefaults.panRight;

    globalAudioVars.oscRight.connect(globalAudioVars.pannerNodeRight).connect(globalAudioVars.audioContext.destination);
}

function createNewOscillatorNodes(type, frequencyLeft, frequencyRight) {

    globalAudioVars.oscLeft = globalAudioVars.audioContext.createOscillator();
    globalAudioVars.oscLeft.type = type;
    globalAudioVars.oscLeft.frequency.value = frequencyLeft;

    globalAudioVars.oscLeft.connect(globalAudioVars.pannerNodeLeft).connect(globalAudioVars.audioContext.destination);

    globalAudioVars.oscRight = globalAudioVars.audioContext.createOscillator();
    globalAudioVars.oscRight.type = type;
    globalAudioVars.oscRight.frequency.value = frequencyRight;

    globalAudioVars.oscRight.connect(globalAudioVars.pannerNodeRight).connect(globalAudioVars.audioContext.destination);
}

function generateAudio() {

    setupAudio();
    globalAudioVars.oscLeft.start();
    globalAudioVars.oscLeft.stop(globalAudioVars.audioContext.currentTime + 3);

    globalAudioVars.oscRight.start();
    globalAudioVars.oscRight.stop(globalAudioVars.audioContext.currentTime + 3);
}