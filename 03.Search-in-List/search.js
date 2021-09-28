import { towns } from './towns.js';
import { html, render } from 'https://unpkg.com/lit-html?module';

const townsList = (towns) => html`
<ul>
   ${towns.map(town => html`<li>${town}</li>`)}
</ul>`;

function search() {
   render(townsList(towns), document.getElementById('towns'));
}

search();

// Get the button
document.querySelector('button').addEventListener('click', (event) => {
   // Get the input and the searched text
   let inputField = document.getElementById('searchText');
   let searchedText = document.getElementById('searchText').value;

   // Get the children of the ul
   let towns = document.querySelector('ul').children;

   let matchesCount = 0;
   for (let i = 0; i < towns.length; i++) {
      if (towns[i].textContent.toLowerCase().includes(searchedText.toLowerCase())) {
         towns[i].className = 'active';
         matchesCount++;
      }
   }

   document.getElementById('result').textContent = `${matchesCount} matches found`;

   inputField.value = '';
});