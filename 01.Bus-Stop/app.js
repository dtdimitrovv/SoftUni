async function getInfo() {
    let submitButton = document.getElementById('submit');

    let stopID = document.getElementById('stopId');

    let stopNameElement = document.getElementById('stopName');

    let busesListElement = document.getElementById('buses');
    // Clear the children from the previous searches
    while (busesListElement.firstChild) {
        busesListElement.removeChild(busesListElement.firstChild);
    }

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopID.value} `);
        if (!response.ok) {
            throw new Error();
        }
        const stop = await response.json();

        stopNameElement.textContent = stop.name;

        let busInfoArray = Object.entries(stop.buses);

        for (let i = 0; i < busInfoArray.length; i++) {
            let li = document.createElement('li');
            li.textContent = `Bus ${busInfoArray[i][0]} arrives in ${busInfoArray[i][1]}`;
            busesListElement.appendChild(li);
        }

        // Clear the input field
        stopID.value = '';
    } catch (e) {
        stopNameElement.textContent = 'Error';
    }
}