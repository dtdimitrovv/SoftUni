function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      // Get the searched text
      let searchedText = document.getElementById('searchField').value;

      // Get the table
      let table = Array.from(document.querySelectorAll('tbody tr'));

      // Clear from previous searches
      table.forEach(e => e.className = '');

      // Filter which row(s) match the searched text and apply 'select' class to them
      let matches = table.filter(el => {
         let values = Array.from(el.children);
         for (let i = 0; i < values.length; i++) {
            if (values[i].textContent.includes(searchedText)) {
               el.className = 'select';
               break;
            }
         }
      });

      // Clear the searched field
      searchedText.value = '';
   }
}