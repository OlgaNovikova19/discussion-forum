
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

    const textEditor = document.getElementById("textEditor")

    textEditor.scrollTop = textEditor.scrollHeight;

    console.log(`${author}: "${selectedText}"`)
    textEditor.innerHTML += `${author}: "${selectedText}"`;

    textEditor.focus();
}