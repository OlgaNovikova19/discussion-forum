 // On form submit, populate the hidden fields with contenteditable values
document.querySelector('form').onsubmit = function() {
    document.getElementById('subjectInput').value = document.getElementById('subjectEditor').innerHTML;
    document.getElementById('textInput').value = document.getElementById('textEditor').innerHTML;
}


function openDrawingCanvas() {
     var drawingContainer = document.getElementById('drawingContainer'); // Ensure this is defined

    if (drawingContainer) {
        drawingContainer.style.display = 'block'; // Show the canvas
        clearCanvas(); // Clear any previous drawings when opening the canvas
    }
}

var canvas = document.getElementById('drawingCanvas');
var ctx = canvas.getContext('2d');
var drawing = false;
var currentColor = '#000000'; // Default drawing color
var strokeWidth = 1;
var eraserMode = false; // Track if the eraser is active
var eraserWidth = 10;

function updateStrokeWidth() {
    strokeWidth = document.getElementById('strokeWidth').value; // Get value from range input
}

// Function to change the drawing color
function changeDrawingColor() {
    currentColor = document.getElementById('drawingColorPicker').value;
    eraserMode = false; // Disable eraser mode when a color is selected
}

// Function to toggle eraser mode
function toggleEraser() {
    eraserMode = !eraserMode; // Toggle the eraser mode
    currentColor = eraserMode ? '#FFFFFF' : document.getElementById('drawingColorPicker').value; // Set color to white for erasing
    ctx.lineWidth = strokeWidth; // Set the line width for eraser
}

canvas.addEventListener('mousedown', function(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', function(e) {
    if (drawing) {
        ctx.strokeStyle = currentColor; // Use current color (or white for eraser)
        ctx.lineWidth = strokeWidth; // Set line width for drawing or erasing
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', function() {
    drawing = false;
});

function insertDrawing() {
    console.log("insertDrawing called")

    var editor = document.getElementById('textEditor');
    var img = new Image();
    img.src = canvas.toDataURL();  // Convert the canvas drawing to a data URL
    img.style.maxWidth = '100%';  // Scale the image to fit the text editor width

    // Create a wrapper div to center the image
    var wrapper = document.createElement('div');
    wrapper.style.textAlign = 'center';  // Center the content inside the wrapper
    wrapper.appendChild(img);  // Append the image to the wrapper

    editor.appendChild(wrapper);  // Insert the wrapper into the contenteditable area

    document.getElementById('drawingContainer').style.display = 'none';  // Hide the canvas after insertion
}



// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
}

function closeDrawingCanvas() {
    var drawingContainer = document.getElementById('drawingContainer');
    if (drawingContainer) {
        drawingContainer.style.display = 'none'; // Hide the canvas
        clearCanvas(); // Clear the canvas when it's closed
    }
}
