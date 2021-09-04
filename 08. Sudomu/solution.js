function solve() {
    // Get the table element
    let tableElement = document.querySelector('table');

    // Get the numbers in the rows
    let rowsNumbers = document.querySelectorAll('#container #main #exercise table tbody tr td');

    // Get the output paragraph
    let outputParagraph = document.getElementById('check').children[0];

    // Get the "quick check" button
    let quickCheckButtonElement = document.querySelector('#container #main #exercise table tfoot tr td button');

    // Add an event to it
    quickCheckButtonElement.addEventListener('click', () => {
        for (let i = 0; i < rowsNumbers.length; i += 3) {
            let firstNumber = rowsNumbers[i].children[0].value;
            let secondNumber = rowsNumbers[i + 1].children[0].value;
            let thirdNumber = rowsNumbers[i + 2].children[0].value;

            if (firstNumber >= 1 && firstNumber <= 3 && secondNumber >= 1 && secondNumber <= 3 && thirdNumber >= 1 && thirdNumber <= 3) {
                if (firstNumber != secondNumber && firstNumber != thirdNumber && secondNumber != thirdNumber) {
                    // Do nothing
                } else {
                    wrong();
                    return;
                }
            } else {
                wrong();
                return;
            }

            correct();
        }

        function correct() {
            outputParagraph.textContent = 'You solve it! Congratulations!';
            outputParagraph.style.color = 'green';
            tableElement.style.border = '2px solid green';
        }

        function wrong() {
            outputParagraph.textContent = 'NOP! You are not done yet...';
            outputParagraph.style.color = 'red';
            tableElement.style.border = '2px solid red';
        }
    });

    // Get the clear button
    let clearButtonElement = document.querySelectorAll('#container #main #exercise table tfoot tr td button')[1];

    // Add an event to it
    clearButtonElement.addEventListener('click', () => {
        // Clear the table
        for (let i = 0; i < rowsNumbers.length; i++) {
            rowsNumbers[i].children[0].value = '';
        }
        // Clear the text
        outputParagraph.textContent = '';
        tableElement.style.border = 'none';
    });
}