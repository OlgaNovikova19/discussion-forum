 let recognition;

// Initialize speech recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Set to true if you want continuous recognition
    recognition.interimResults = false; // Set to true if you want interim results

    recognition.onstart = function() {
        console.log('Voice recognition started');
    };

    recognition.onresult = function(event) {
        // Get the recognized text from the event
        console.log('before transcript');
        const transcript = event.results[0][0].transcript;
        console.log('Recognized text:', transcript);

        // Insert the recognized text at the caret position
        insertTextAtCaret(transcript);
    };

    recognition.onend = function() {
        console.log('Voice recognition ended');
    };

    recognition.onerror = function(event) {
        console.error('Error occurred in recognition:', event.error);
    };
} else {
    console.error('Speech recognition not supported in this browser.');
}

function startRecognition(event) {
    event.preventDefault()
    recognition.start();
}

// Function to insert text at the caret position
function insertTextAtCaret(text) {
    const editor = document.getElementById('textEditor');
    editor.focus(); // Ensure the editor is focused

    // Get the current selection and range
    const selection = window.getSelection();
    let range;

    if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
    } else {
        range = document.createRange();
        range.selectNodeContents(editor);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    // Insert the text at the current caret position
    range.deleteContents(); // Optional: delete selected text if any
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);

    // Move the caret after the inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
}