// Function to format selected text
function formatText(command, editorId) {
    console.log("formatText");
    var editor = document.getElementById(editorId);
    editor.focus();
    document.execCommand(command, false, null);
}

// On form submit, populate the hidden fields with contenteditable values
document.querySelector('form').onsubmit = function() {
    document.getElementById('subjectInput').value = document.getElementById('subjectEditor').innerHTML;
    document.getElementById('textInput').value = document.getElementById('textEditor').innerHTML;
}


function changeTextColor(editorId) {
    console.log("changeTextColor");
    var editor = document.getElementById(editorId);
    var color = document.getElementById('textColorPicker').value;  // Get the selected color
    editor.focus();
    document.execCommand('foreColor', false, color);  // Change the text color
}

 function highlightText(editorId) {
    console.log("highlightText");
    var editor = document.getElementById(editorId);
    var color = document.getElementById('hiliteColor').value;  // Get the selected color
    editor.focus();
    document.execCommand('hiliteColor', false, color);  // Change the text color
}


