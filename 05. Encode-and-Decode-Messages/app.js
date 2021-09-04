function encodeAndDecodeMessages() {
    // Get the encode button to add an event to it
    let encodeButtonElement = document.querySelector('button');

    let encodedText = '';

    // Get the decode textarea element
    let decodeTextareaElement = document.querySelectorAll('textarea')[1];

    encodeButtonElement.addEventListener('click', function () {
        // Get the text from the textarea
        let encodeTextareaElement = document.querySelector('textarea');

        // Clear the encoded text from the previous input
        encodedText = '';

        for (let i = 0; i < encodeTextareaElement.value.length; i++) {
            encodedText += String.fromCharCode(encodeTextareaElement.value.charCodeAt(i) + 1);
        }

        // Set its value equal to the encoded text
        decodeTextareaElement.value = encodedText;

        // Clear the textarea for the encoded element
        encodeTextareaElement.value = '';
    });

    // Get the decode button
    let decodeButtonElement = document.querySelectorAll('button')[1];

    decodeButtonElement.addEventListener('click', function () {
        // Decode the encoded text
        let decodedText = '';
        for (let i = 0; i < encodedText.length; i++) {
            decodedText += String.fromCharCode(encodedText.charCodeAt(i) - 1);
        }

        decodeTextareaElement.value = decodedText;
    });
}