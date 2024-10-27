function insert_quote(text) {
    const editor = document.getElementById('textEditor'); // Get the actual DOM element
    editor.focus(); // Focus on the text editor

    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
        return; // Ensure there's a valid selection
    }

    const range = selection.getRangeAt(0);
    const currentTextNode = range.startContainer;

    const caretPosition = range.startOffset; // Get the current caret position
    const textBefore = currentTextNode.textContent.slice(0, caretPosition);
    const textAfter = currentTextNode.textContent.slice(caretPosition);

    // Insert the new quote
    currentTextNode.textContent = textBefore + text + textAfter;

    // Create a new range for the end of the inserted text
    const newRange = document.createRange();
    newRange.setStart(currentTextNode, caretPosition + text.length); // Position after the inserted text
    newRange.collapse(true); // Collapse the range to the end position

    selection.removeAllRanges(); // Clear existing selections
    selection.addRange(newRange); // Add the new range with caret at the end of the quote

    // Optional: Scroll to the bottom of the editor
    editor.scrollTop = editor.scrollHeight; // This ensures the editor scrolls to the bottom
}


function quoteText(commentId, text, author) {
    // Get the selected text
    console.log(`Quote text called with commentId: ${commentId}`);
    const commentElement = document.getElementById(`comment-text-${commentId}`);
    console.log(`commentElement: ${commentElement}`)
    console.log(`commentId: ${commentId}`)
    let selectedText = window.getSelection().toString();

    // If no text is selected, get the whole comment text

    if (!selectedText) {
            selectedText = text
             console.log(`selectedText: ${selectedText}`)
     }

    // Insert quoted text

    const textEditor = document.getElementById("textEditor")


    // Optional: Scroll to the bottom of the editor
    textEditor.scrollTop = textEditor.scrollHeight;


    //textEditor.innerHTML += `<p>${author}: "${selectedText}"</p>`;
    //insert_quote(textEditor.innerHTML)
    formattedQuote =  ` ${author}: "${selectedText}" `
    //textEditor.scrollTop = textEditor.scrollHeight;
    insert_quote(formattedQuote)
    // Focus the text editor for the user to continue typing
    textEditor.focus();
}