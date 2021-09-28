import { html, render } from 'https://unpkg.com/lit-html?module';

const optionTemplate = (data) => html`
    <option value=${data._id}>${data.text}</option>
`;

async function getInfo() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    const data = await response.json();
    return data;
}

async function handleDropdown() {
    let data = await getInfo();
    render(Object.values(data).map(optionTemplate), document.getElementById('menu'));
}

function addItem() {
    document.querySelector('form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const input = document.getElementById('itemText');
        const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ text: input.value })
        });

        if (response.ok) {
            handleDropdown();
        }

        // Clear the input field
        event.target.reset();
    });
}

window.addEventListener('load', handleDropdown);

addItem();