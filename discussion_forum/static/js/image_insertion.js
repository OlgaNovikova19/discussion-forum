
// Function to insert an image from the computer
function insertImageFromComputer(editorId) {
    var fileInput = document.getElementById('imageInput');
    var editor = document.getElementById(editorId);

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Create an image element and set its source
            var img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '35%';
            img.style.display = 'block';
            img.style.margin = '0 auto';

            // Insert the image into the editor
            editor.appendChild(img);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}

//Function to insert an image from URL
function insertImageFromURL(editorId) {
    var imageUrl = prompt("Enter the image URL");
    if (imageUrl) {
        var editor = document.getElementById(editorId);
        editor.focus();
        var imgTag = `<figure style="text-align: center;"><img src="${imageUrl}" style="max-width: 35%; height: auto;">`;
        // Insert the HTML for the image
        document.execCommand('insertHTML', false, imgTag);
        }

}