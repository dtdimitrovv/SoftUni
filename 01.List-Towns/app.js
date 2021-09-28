import { html, render } from 'https://unpkg.com/lit-html?module';

const listTemplate = (data) => html`
<ul>
    ${data.map(town => html`<li>${town}</li>`)}
</ul>`;

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const towns = document.getElementById('towns').value.split(', ');
    render(listTemplate(towns), document.getElementById('root'));
    document.querySelector('form').reset();
})
