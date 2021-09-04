function solve() {
  // Get the generate button (it is the first button in the html file)
  let generateButtonElement = document.querySelector('body #container #exercise button');

  generateButtonElement.addEventListener('click', () => {
    // Get the textarea element
    let textareaElement = document.querySelector('body #container #exercise textarea');

    // Get input in the textarea in normal string, not JSON
    let items = JSON.parse(textareaElement.value);

    items.forEach(el => {
      let newProductImg = el.img;
      let newProductName = el.name;
      let newProductPrice = el.price;
      let newProductDecFactor = el.decFactor;

      // Create the image appearance
      let newTDForImage = document.createElement('td');
      let newImg = document.createElement('img');
      newImg.setAttribute('src', newProductImg);
      newTDForImage.appendChild(newImg);

      //Create the name appearance
      let newTDForName = document.createElement('td');
      let newNameParagraph = document.createElement('p');
      newNameParagraph.textContent = newProductName;
      newTDForName.appendChild(newNameParagraph);

      // Create the price appearance
      let newTDForPrice = document.createElement('td');
      let newPriceParagraph = document.createElement('p');
      newPriceParagraph.textContent = newProductPrice;
      newTDForPrice.appendChild(newPriceParagraph);

      // Create the decFactor appearance
      let newTDForDecFactor = document.createElement('td');
      let newDecFactorParagraph = document.createElement('p');
      newDecFactorParagraph.textContent = newProductDecFactor;
      newTDForDecFactor.appendChild(newDecFactorParagraph);

      // Create the checkbox element
      let newTDForCheckbox = document.createElement('td');
      let newCheckboxElement = document.createElement('input');
      newCheckboxElement.setAttribute('type', 'checkbox');
      newTDForCheckbox.appendChild(newCheckboxElement);

      // Create the new table row
      let newTableRow = document.createElement('tr');
      newTableRow.appendChild(newTDForImage);
      newTableRow.appendChild(newTDForName);
      newTableRow.appendChild(newTDForPrice);
      newTableRow.appendChild(newTDForDecFactor);
      newTableRow.appendChild(newTDForCheckbox);

      // Get the tbody element 
      let currentTbodyElement = document.querySelector('tbody');
      currentTbodyElement.appendChild(newTableRow);
    })

    // Clear the inputArea
    textareaElement.value = '';
  });

  // Get the buy button
  let buyButtonElement = document.querySelectorAll('body #container #exercise button')[1];

  buyButtonElement.addEventListener('click', () => {
    // Get all table rows
    let tableRowsElementList = Array.from(document.querySelectorAll('.table tbody tr'));
    let selectedRows = tableRowsElementList.filter(row => row.querySelector('input:checked'));

    // Create a variable to store "Bought furniture:..."
    let firstOuputLine = 'Bought furniture: ';

    // Create a variable to store the price
    let totalPrice = 0;

    // Create a variable for the average decoration factor
    let averageDecorationFactor = 0;

    for (let i = 0; i < selectedRows.length; i++) {
      if (i != selectedRows.length - 1) {
        firstOuputLine += selectedRows[i].children[1].textContent + ', ';
      } else {
        firstOuputLine += selectedRows[i].children[1].textContent;
      }
      totalPrice += Number(selectedRows[i].children[2].textContent);
      averageDecorationFactor += Number(selectedRows[i].children[3].textContent) / selectedRows.length;
    }

    // Get the textArea where the output will be shown
    let outputTextarea = document.querySelectorAll('body #container #exercise textarea')[1];
    outputTextarea.textContent += firstOuputLine + '\n';
    outputTextarea.textContent += `Total price: ${totalPrice.toFixed(2)}` + '\n';
    outputTextarea.textContent += `Average decoration factor: ${averageDecorationFactor}`;
  });
}