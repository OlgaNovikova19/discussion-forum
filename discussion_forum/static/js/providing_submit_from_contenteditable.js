document.addEventListener('DOMContentLoaded', function() {
    let form_name = '.discussion-form';

    discussion_form = document.querySelector(form_name);
    if (discussion_form === null) {
        console.log("Discussion form " + form_name + " is not found.");

        form_name = '.comment-form';
        discussion_form = document.querySelector(form_name);
        if (discussion_form === null) {
            console.log("Comment form " + form_name + " is not found.")
        }
    }
    else {
        let submitButton = document.getElementById('submit_button_comment');
    }

    // -----------------------------
    if (form_name === '.comment-form') {
        const submitButton = document.getElementById('submit_button_comment');

        if (submitButton) {
            // Add event listener to the form, not the button
            submitButton.addEventListener('click', function(event) {
                event.preventDefault();  // Prevent the form from submitting (optional)

                let provided_comment = document.getElementById('textEditor').innerText;
                document.getElementById('textInput').value = provided_comment;

                console.log('Comment submitted: ' + provided_comment);

                discussion_form.submit();
               // document.getElementById('comment-form').submit();
            });
        }
        else  {
            console.log("Submit button not found in the form.");
        }
    }
    // -----------------------------
    else {
        discussion_form.addEventListener('submit', function(event) {
            console.log("Form submitted - begin");

            // Get the content of contenteditable divs and set them in the hidden inputs
            document.getElementById('subjectInput').value = document.getElementById('subjectEditor').innerHTML;
            document.getElementById('textInput').value = document.getElementById('textEditor').innerHTML;

            console.log("Form submitted - end");
        })
    }
    /*document.querySelector(form_name).onsubmit = function() {
        console.log("Form submission event triggered");
    };*/
});