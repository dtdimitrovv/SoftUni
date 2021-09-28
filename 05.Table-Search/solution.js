import { html, render } from 'https://unpkg.com/lit-html?module';

async function getData() {
   const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await response.json();
   return data;
}

const rowTemplate = (data) => html`
   <tr>
      <th>${data.firstName} ${data.lastName}</th>
      <th>${data.email}</th>
      <th>${data.course}</th>
   </tr>
`;

async function handleRows() {
   const data = await getData();
   const rows = Object.values(data).map(rowTemplate);
   render(rows, document.querySelector('tbody'));
}

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let input = document.getElementById('searchField');
      let inputText = input.value;

      // Get all rows
      let rows = document.querySelector('tbody').children;

      // Clear the classnames from previous searches
      for (let i = 0; i < rows.length; i++) {
         rows[i].classList.remove('select');
      }

      // Iterate through all rows
      for (let i = 0; i < rows.length; i++) {
         let currentRowChildren = rows[i].children;

         // Iterate through the elements in every row
         for (let j = 0; j < currentRowChildren.length; j++) {
            if (currentRowChildren[j].textContent.toLowerCase().includes(inputText.toLowerCase())) {
               rows[i].className = 'select';
            }
         }
      }

      // Clear the field
      input.value = '';
   }
}

window.addEventListener('load', handleRows);

solve();