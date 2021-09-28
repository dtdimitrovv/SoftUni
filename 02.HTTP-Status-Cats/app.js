import { cats } from './catSeeder.js';
import { html, render } from 'https://unpkg.com/lit-html?module';

const catCardTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${onClick} class="showBtn">Show status code</button>
        <div class="status" style="display: none" id=${cat.id}>
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>;
`;

function onClick(event) {
    const parent = event.target.parentNode;
    const divToCheck = parent.querySelector('.status');
    if (event.target.textContent == 'Show status code') {
        divToCheck.style.display = 'block';
        // Change the button text
        event.target.textContent = 'Hide status code';
    } else {
        divToCheck.style.display = 'none';
        // Change the button text
        event.target.textContent = 'Show status code';
    }
}

const catUl = (cats) => html`${cats.map(cat => catCardTemplate(cat))}`;
render(catUl(cats), document.getElementById('allCats'));