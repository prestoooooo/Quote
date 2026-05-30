async function getQuote(){
    try {
        const text = document.getElementById("customText")
        const img = document.getElementById("img")
        const res = await fetch ("https://dummyjson.com/quotes/random")
        const data = await res.json()
        text.value = "Loading..............."
        text.value = `${data.quote} - ${data.author}`
        img.src = `https://picsum.photos/600/300?${Date.now()}`
        

        console.log("data", data)
    } catch (error) {
        
    }
}

function loadVoices() {
    const select = document.getElementById("voiceSelect");
    select.innerHTML = "";

    const voices = speechSynthesis.getVoices();

    voices.forEach((v, i) => {
        const opt = document.createElement("option");

        let label =
            v.name.toLowerCase().includes("female") ? "♀ Female"
            : v.name.toLowerCase().includes("male") ? "♂ Male"
            : "🎧 Neutral";

        opt.value = i;
        opt.textContent = `${label} - ${v.name}`;

        select.appendChild(opt);
    });

    selectedVoice = voices[0] || null;

    select.onchange = () => {
        selectedVoice = voices[select.value];
    };
}
function speak() {
    const text = document.getElementById("customText").value;

    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
        utter.voice = selectedVoice;
    }

    speechSynthesis.speak(utter);
}

function pauseSpeech() { speechSynthesis.pause(); }
function resumeSpeech() { speechSynthesis.resume(); }
function stopSpeech() { speechSynthesis.cancel(); }

speechSynthesis.onvoiceschanged = loadVoices;
getQuote()