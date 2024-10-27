function sendTextToAPI(text = null) {
    console.log("called function sendTextToAPI")

    if (text === null) {
        text = document.getElementById('textEditor').innerText;
    }

    fetch("/read-text/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'text': text })
    })
    .then(response => { // If audio is returned as a file
        if (!response.ok) {
            console.log("Impossible to get audio to play")
            throw new Error("Impossible to get audio to play");
        }

        console.log("Server answer with success.")
        return response.blob(); // Only process as a blob if the response is OK
    })
    .then(blob => {
        console.log("Response received in sendTextToAPI - try to play it.")

        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();

        console.log("Sound played.")
    })
    .catch(error => console.error('Error:', error));
}
