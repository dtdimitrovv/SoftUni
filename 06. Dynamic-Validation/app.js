function validate() {
    // Get the input field
    let inputEmailElement = document.getElementById('email');

    let regex = /\b[a-z]+@[a-z]+.[a-z]+/g;

    inputEmailElement.addEventListener('change', () => {
        if (regex.test(inputEmailElement.value)) {
            inputEmailElement.classList.remove('error');
        } else {
            inputEmailElement.className = 'error';
        }
    });

}