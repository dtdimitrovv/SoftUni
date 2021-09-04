function addItem() {
    // Get the text element
    let inputElement = document.getElementById('newItemText');

    // Get the value
    let valueElement = document.getElementById('newItemValue');

    // Create the option element
    let newOption = document.createElement('option');

    newOption.value = valueElement.value;
    newOption.textContent = inputElement.value;

    // Get the select element
    let selectElement = document.getElementById('menu');
    selectElement.appendChild(newOption);

    // Clear the text area and the input area
    inputElement.value = '';
    valueElement.value = '';
}