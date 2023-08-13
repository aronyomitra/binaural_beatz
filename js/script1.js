window.onload = function() {
    console.log("Loaded page");

}

function generateAudio() {
    const audioContextClass = window.AudioContext || window.webkitAudioContext; 
    const audioContext = new audioContextClass();

    var osc = audioContext.createOscillator();

    osc.type = "sine";
    osc.frequency.value = 150;
    osc.connect(audioContext.destination);
    osc.start();

    osc.stop(5);
}