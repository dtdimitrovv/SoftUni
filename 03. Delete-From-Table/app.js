function deleteByEmail() {
    // Get the input
    let inputElement = document.querySelector('input');

    // Get div with ID='result' from DOM
    let resultElement = document.getElementById('result');

    let dataElement = Array.from(document.querySelectorAll('tbody tr'));
    for (let i = 0; i < dataElement.length; i++) {
        let currentUserEmail = dataElement[i].children[1].textContent;
        if (currentUserEmail == inputElement.value) {
            // Remove the current element
            dataElement[i].remove();

            // Change the result text to 'Deleted.'
            resultElement.textContent = 'Deleted.';
        }
    }

    if (resultElement.textContent != 'Deleted.') {
        resultElement.textContent = 'Not found.';
    }

    // Clear the input
    inputElement.value = '';
}