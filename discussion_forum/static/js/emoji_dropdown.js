const textArea = document.getElementById('textEditor');
let caretPosition = 0;

function saveCaretPosition() {
    const selection = window.getSelection();
    console.log("Selection anchor offset: " + selection.anchorOffset)
    console.log("Previous caret position: " + caretPosition)
    caretPosition = selection.anchorOffset;
    console.log("Set new caret position: " + caretPosition)
}

textEditor.addEventListener('focus', () => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(textEditor.childNodes[0] || textEditor, caretPosition);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    console.log("Restore caret position: " + caretPosition)
});

textEditor.addEventListener('blur', saveCaretPosition);


// Function to toggle the emoji dropdown visibility
function toggleEmojiDropdown() {
    var dropdown = document.getElementById('emojiDropdown');
    dropdown.style.display = (dropdown.style.display === 'none') ? 'block' : 'none';
}


function insertEmoji(emoji, editorId) {
    var editor = document.getElementById(editorId);

    console.log('Caret position to insert emoji: ', caretPosition);

    editor.focus();
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    const currentTextNode = range.startContainer;

    const textBefore = currentTextNode.textContent.slice(0, caretPosition);
    const textAfter = currentTextNode.textContent.slice(caretPosition);
    currentTextNode.textContent = textBefore + emoji + textAfter;

    range.setStart(currentTextNode, caretPosition + emoji.length)
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    caretPosition += emoji.length;
    console.log("New caret position: " + caretPosition);

    editor.focus();
}


document.addEventListener('click', function(event) {
    var dropdown = document.getElementById('emojiDropdown');
    if (!event.target.closest('.toolbar-btn') && !event.target.closest('.emoji-dropdown')) {
        dropdown.style.display = 'none';
    }
});
