function solve() {
   // Get the 3 products and add an event to them
   let listOfProductElements = document.querySelectorAll('.product');

   // Get the textarea which will be added text
   let textareaElementForAddedAndCheckoutProducts = document.querySelector('textarea');

   // Create a map to store the unique products and their prices
   let productsAndPrices = new Map();

   // Get the elements of each product
   for (let i = 0; i < listOfProductElements.length; i++) {
      // Get the name
      let productNameElement = listOfProductElements[i].children[1].children[0].textContent;

      // Get the price
      let productPriceElement = Number(listOfProductElements[i].children[3].textContent);

      // Get the button
      let productAddButtonElement = listOfProductElements[i].children[2].children[0];

      // Add an event to the button
      productAddButtonElement.addEventListener('click', () => {
         textareaElementForAddedAndCheckoutProducts.textContent += `Added ${productNameElement} for ${productPriceElement.toFixed(2)} to the cart.\n`
         if (productsAndPrices.has(productNameElement)) {
            // Get the current price
            let currentProductPrice = productsAndPrices.get(productNameElement);
            currentProductPrice += productPriceElement;

            // Update the map
            productsAndPrices.set(productNameElement, currentProductPrice);
         } else {
            productsAndPrices.set(productNameElement, productPriceElement);
         }
      });
   }

   // Get the checkout button element
   let checkoutButtonElement = document.querySelector('.checkout');
   checkoutButtonElement.addEventListener('click', () => {
      let boughProducts = Array.from(productsAndPrices.keys()).join(", ");
      textareaElementForAddedAndCheckoutProducts.textContent += `You bought ${boughProducts} for ${getTotalPrice().toFixed(2)}.`;
   });

   function getTotalPrice() {
      let sum = 0;
      productsAndPrices.forEach((v) => {
         sum += v;
      });
      return sum;
   }
}