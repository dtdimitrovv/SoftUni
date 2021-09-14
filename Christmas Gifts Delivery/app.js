function solution() {
    let addGiftButton = document.querySelector('.card div button');

    let listOfGiftsElement = document.querySelectorAll('.card')[1].children[1];


    addGiftButton.addEventListener('click', () => {
        let input = document.querySelector('.card div input');

        // Create new li element
        let newListElement = document.createElement('li');
        newListElement.textContent = input.value;
        newListElement.className = 'gift';

        // Create SEND button
        let sendButton = document.createElement('button');
        sendButton.textContent = 'Send';
        sendButton.id = 'sendButton';

        // Create DISCARD button
        let discardButton = document.createElement('button');
        discardButton.textContent = 'Discard';
        discardButton.id = 'discardButton';

        // Append the buttons to the li item
        newListElement.appendChild(sendButton);
        newListElement.appendChild(discardButton);

        // Append the li to the unordered list
        listOfGiftsElement.appendChild(newListElement);

        // Sort the UL list
        sortList();

        // Clear the input
        input.value = '';

        // Add event to the SEND button
        sendButton.addEventListener('click', () => {
            let sentGiftsListElement = document.querySelectorAll('.card')[2].children[1];

            // Remove the SEND AND DISCARD buttons
            newListElement.removeChild(sendButton);
            newListElement.removeChild(discardButton);

            // Create new li element
            let liElement = document.createElement('li');
            liElement.textContent = newListElement.textContent;
            liElement.className = 'gift';

            sentGiftsListElement.appendChild(liElement);
            listOfGiftsElement.removeChild(newListElement);
        });

        // Add event to the DISCARD button
        discardButton.addEventListener('click', () => {
            let discardedGiftsListElement = document.querySelectorAll('.card')[3].children[1];

            // Remove the SEND AND DISCARD buttons
            newListElement.removeChild(sendButton);
            newListElement.removeChild(discardButton);

            // Create new li element
            let liElement = document.createElement('li');
            liElement.textContent = newListElement.textContent;
            liElement.className = 'gift';

            discardedGiftsListElement.appendChild(liElement);
            listOfGiftsElement.removeChild(newListElement);
        });
    });


    function sortList() {
        var list, i, switching, b, shouldSwitch;
        list = document.querySelectorAll('.card')[1].children[1];
        switching = true;
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            b = list.getElementsByTagName("LI");
            // Loop through all list items:
            for (i = 0; i < (b.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Check if the next item should
                switch place with the current item: */
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    /* If next item is alphabetically lower than current item,
                    mark as a switch and break the loop: */
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark the switch as done: */
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
            }
        }
    }
}