let keyMap = {
    a: { note: 'C', isPreesed: false, },
    w: { note: 'CSharp', isPreesed: false, },
    s: { note: 'D', isPreesed: false, },
    e: { note: 'DSharp', isPreesed: false, },
    d: { note: 'E', isPreesed: false, },
    f: { note: 'F', isPreesed: false, },
    t: { note: 'FSharp', isPreesed: false, },
    g: { note: 'G', isPreesed: false, },
    y: { note: 'GSharp', isPreesed: false, },
    h: { note: 'A', isPreesed: false, },
    u: { note: 'ASharp', isPreesed: false, },
    j: { note: 'B', isPreesed: false, },
    k: { note: 'CTop', isPreesed: false, },
    z: { note: 'z', isPreesed: false, },
    x: { note: 'x', isPreesed: false, },
};
let octaveUp = false
let octaveDown = false
let metronomInterval
let interval = ""
let beats = 4
let bar = 4
let beatsCounter = 0
let multiplayInterval = 1000
let isMetronomPlaying = false
displaySigniture()

function displaySigniture() {
    document.getElementById("displayBeat").innerText = beats
    document.getElementById("displayBar").innerText = bar
    beatsCounter = beats
    stopMetronom()
}

document.addEventListener('keyup', function (event) {
    const key = event.key.toLowerCase();
    if (!keyMap[key]) {
        return
    }
    keyMap[key].isPreesed = false
})

document.addEventListener('keydown', function (event) {
    const key = event.key.toLowerCase();
    if (!keyMap[key]) {
        return
    }
    if (keyMap[key].isPreesed) {
        return
    }
    const note = keyMap[key].note
    keyMap[key].isPreesed = true
    if (note == "z" && octaveUp == false) {
        octaveDown = true
        document.getElementById("octave").innerText = "-1"

    }
    else if (note == "z" && octaveUp) {
        octaveDown = false
        octaveUp = false
        document.getElementById("octave").innerText = "0"

    }
    else if (note == "x" && !octaveDown) {
        octaveUp = true
        document.getElementById("octave").innerText = "1"

    }
    else if (note == "x" && octaveDown) {
        octaveUp = false
        octaveDown = false
        document.getElementById("octave").innerText = "0"

    }
    else if (note) {
        playSound(note);

    }
});

function playSound(note) {

    document.getElementById(`${note}`).style.backgroundColor = "green"
    setTimeout(() => {

        if (note.includes("Sharp")) {

            document.getElementById(`${note}`).style.backgroundColor = "black"
        }
        else document.getElementById(`${note}`).style.backgroundColor = "white"
    }, 100);
    if (octaveUp == true) {
        audio = new Audio(`notes/${note}1.mp3`)

    }
    else if (octaveDown == true) {
        audio = new Audio(`notes/${note}-1.mp3`)

    }
    else audio = new Audio(`notes/${note}.mp3`)

    audio.play()

}

function startMetronom() {
    if (isMetronomPlaying){
        return
    }
    interval = document.getElementById("userBpm").value
    if (interval > 200 || interval < 20) {
        return alert("Please Enter Bpm Between 20 and 200")
    }
    else if (bar == 1) { multiplayInterval = 4000 }
    else if (bar == 2) { multiplayInterval = 2000 }
    else if (bar == 4) { multiplayInterval = 1000 }
    else if (bar == 6) { multiplayInterval = 666.66 }
    else if (bar == 8) { multiplayInterval = 500 }


    interval = ((60 / interval) * multiplayInterval);
    isMetronomPlaying = true
    metronomInterval = setInterval(() => {
        if (beatsCounter >= beats) {
            beatsCounter = 0
            console.log("full bar");
            let metronomUp =
                new Audio("notes/MetronomeUp.wav")
            metronomUp.play()
            beatsCounter++
            return
        }
        console.log(interval);
        let metronomDown =
            new Audio("notes/Metronome.wav")
        metronomDown.play()
        beatsCounter++
    }, interval);

}

function stopMetronom() {
    clearInterval(metronomInterval)
    console.log("interval Stop");
    isMetronomPlaying = false
    interval = 0
}

function changeTimeSigniture() {
    let userBeat = document.getElementById("userBeat").value
    let userBar = document.getElementById("userBar").value
    console.log("user beat" + userBeat);
    console.log("user bar "+ userBar);
    if ((userBar == 1
        || userBar == 2
        || userBar == 4
        || userBar == 6
        || userBar == 8)) {
        beats = userBeat
        bar = userBar
        displaySigniture()
        return
    }
    else
        alert("Please choose a Beat devition ");
}
