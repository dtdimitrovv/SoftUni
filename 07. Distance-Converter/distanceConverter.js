function attachEventsListeners() {
    // Get the CONVERT button
    let convertButtonElement = document.getElementById('convert');

    convertButtonElement.addEventListener('click', () => {
        // Get the input field
        let inputFieldElement = document.getElementById('inputDistance');

        // Get the value in the input field
        let inputValueInMeters = inputFieldElement.value;

        // Get the type of distance
        let typeOfInputDistance = document.getElementById('inputUnits').value;

        // Convert the input value to meters
        if (typeOfInputDistance == 'km') {
            inputValueInMeters = Number(inputValueInMeters) * 1000;
        } else if (typeOfInputDistance == 'cm') {
            inputValueInMeters = Number(inputValueInMeters) / 100;
        } else if (typeOfInputDistance == 'mm') {
            inputValueInMeters = Number(inputValueInMeters) / 1000;
        } else if (typeOfInputDistance == 'mi') {
            inputValueInMeters = Number(inputValueInMeters) * 1609.34;
        } else if (typeOfInputDistance == 'yrd') {
            inputValueInMeters = Number(inputValueInMeters) * 0.9144;
        } else if (typeOfInputDistance == 'ft') {
            inputValueInMeters = Number(inputValueInMeters) * 0.3048;
        } else if (typeOfInputDistance == 'in') {
            inputValueInMeters = Number(inputValueInMeters) * 0.0254;
        }

        // Get the type of the desired output distance
        let typeOfOutputDistance = document.getElementById('outputUnits').value;

        // Create a variable to store the output
        let outputValue = inputValueInMeters;

        // Convert the input value which s converted in meters to the desired output value
        if (typeOfOutputDistance == 'km') {
            outputValue = inputValueInMeters / 1000;
        } else if (typeOfOutputDistance == 'cm') {
            outputValue = inputValueInMeters * 100;
        } else if (typeOfOutputDistance == 'mm') {
            outputValue = inputValueInMeters * 1000;
        } else if (typeOfOutputDistance == 'mi') {
            outputValue = inputValueInMeters / 1609.34;
        } else if (typeOfOutputDistance == 'yrd') {
            outputValue = inputValueInMeters / 0.9144;
        } else if (typeOfOutputDistance == 'ft') {
            outputValue = inputValueInMeters / 0.3048;
        } else if (typeOfOutputDistance == 'in') {
            outputValue = inputValueInMeters / 0.0254;
        }
        // Get the field which will take the output value
        let outputFieldElement = document.getElementById('outputDistance');
        outputFieldElement.value = outputValue;
    });
}