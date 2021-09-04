function search() {
   // Get the list of towns
   let listOfTowns = Array.from(document.querySelectorAll('#towns li'));

   // Get the element we will check
   let searchedElement = document.getElementById('searchText').value;

   // Clear results from previous search
   listOfTowns.forEach(el => {
      el.style.fontWeight = 'normal';
      el.style.textDecoration = 'none';
   });

   let numberOfMatches = 0;

   // Check which towns contain the element
   listOfTowns.forEach(el => {
      if (el.textContent.includes(searchedElement)) {
         el.style.fontWeight = 'bold';
         el.style.textDecoration = 'underline';
         numberOfMatches++;
      }
   });

   // Get the result Id which will be assigned the answer
   let result = document.getElementById('result');
   result.textContent = `${numberOfMatches} matches found`;
}
