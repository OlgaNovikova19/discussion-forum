function speakText(event, text = null) {
    // Get the text to read from the textarea
    event.preventDefault()
    if (text === null) {
        text = document.getElementById('textEditor').innerText;
    }

    // Check if the browser supports speech synthesis
    if ('speechSynthesis' in window) {
        // Create a new SpeechSynthesisUtterance instance
        const speech = new SpeechSynthesisUtterance(text);

        // Optional: You can customize the voice, pitch, rate, etc.
        speech.pitch = 1; // Default is 1 (range: 0 to 2)
        speech.rate = 1; // Default is 1 (range: 0.1 to 10)
        speech.volume = 1; // Default is 1 (range: 0 to 1)

        // Optional: Select a specific voice
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            speech.voice = voices[0]; // Choose the first available voice
        }

        // Speak the text
        window.speechSynthesis.speak(speech);
    } else {
        // If browser doesn't support speech synthesis
        alert('Sorry, your browser does not support text-to-speech.');
    }
}