function attachEvents() {
    // Get the load button
    const loadButton = document.getElementById('btnLoad');
    loadButton.addEventListener('click', loadContacts);

    let createButton = document.getElementById('btnCreate');
    createButton.addEventListener('click', addNewContact);
}

async function addNewContact() {
    const person = document.getElementById('person').value;
    const phone = document.getElementById('phone').value;

    const response = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ person, phone })
    });

    const data = await response.json();
    console.log(data);

    document.getElementById('person').value = '';
    document.getElementById('phone').value = '';

    addNewLi(person, phone, data._id);
}

async function loadContacts() {
    // Clear the contacts which appeared previously
    clearContacts();
    
    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();
    Object.values(data).forEach(el => {
        addNewLi(el.person, el.phone, el._id);
    });
}

function addNewLi(person, phone, id) {
    let ul = document.getElementById('phonebook');

    let li = document.createElement('li');
    li.textContent = `${person}: ${phone}`;

    let button = document.createElement('button');
    button.textContent = 'Delete';

    ul.appendChild(li);
    ul.appendChild(button);

    button.addEventListener('click', () => {
        deleteData(id);
        ul.removeChild(li);
        ul.removeChild(button);
    });
}

async function deleteData(id) {
    const response = await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
        method: 'delete'
    });

}

function clearContacts() {
    let ul = document.getElementById('phonebook');
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}
attachEvents();