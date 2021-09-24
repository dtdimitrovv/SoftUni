function start() {
    loadAllBooks();

    let loadAllBooksButton = document.getElementById('loadBooks');
    loadAllBooksButton.addEventListener('click', loadAllBooks);

    let formElement = document.querySelector('form');
    formElement.addEventListener('submit', formHandler);

    // Add an event listener to the table
    document.querySelector('table').addEventListener('click', handleTableClick);

    // Add an event listener to the edit form
    document.getElementById('editForm').addEventListener('submit', updateBook);
}

async function handleTableClick(event) {
    if (event.target.className == 'editBtn') {
        handleEditButton(event);
    } else if (event.target.className == 'deleteBtn') {
        const bookID = event.target.parentNode.parentNode.id;

        // Make a request to delete the data
        await fetch('http://localhost:3030/jsonstore/collections/books/' + bookID, {
            method: 'delete'
        });

        // Reset the DOM
        loadAllBooks();
    }
}

async function handleEditButton(event) {
    // Hide the form used to create a new book
    document.getElementById('createForm').style.display = 'none';

    // Make the form for editing visible
    let editForm = document.getElementById('editForm');
    editForm.style.display = 'block';

    const bookID = event.target.parentNode.parentNode.id;

    // Make a request to read the correct data
    const response = await fetch('http://localhost:3030/jsonstore/collections/books/' + bookID);
    const book = await response.json();

    // Change the form input fields
    editForm.children[2].value = bookID;
    editForm.children[3].value = book.title;
    editForm.children[5].value = book.author;
}

async function getAllBooks() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books');
    const data = await response.json();
    return data;
}

async function loadAllBooks() {
    let tableBody = document.querySelector('tbody');
    // Clear the table
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    let data = await getAllBooks();
    Object.entries(data).forEach(el => {
        let row = createRow(el[1].author, el[1].title, el[0]);
        tableBody.appendChild(row);
    });
}

async function updateBook(event) {
    event.preventDefault();

    // Get the elements from the edit form
    const formData = new FormData(editForm);
    const id = formData.get('id');
    const title = formData.get('title');
    const author = formData.get('author');

    await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ title, author })
    });

    // Clear the input fields
    event.target.reset();

    // Reset the DOM
    loadAllBooks();

    // Hide the edit form 
    document.getElementById('editForm').style.display = 'none';

    // Make the submit form visible
    document.getElementById('createForm').style.display = 'block';
}

async function deleteBook(id) {
    const result = await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });
}

async function formHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get('title');
    const author = formData.get('author');

    await fetch('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ title, author })
    });

    // Clear the fields
    event.target.reset();

    // Update the DOM
    loadAllBooks();
}

function createRow(authorString, titleString, id) {
    let tr = document.createElement('tr');
    tr.id = id;
    let td1 = document.createElement('td');
    td1.textContent = titleString;

    let td2 = document.createElement('td');
    td2.textContent = authorString;

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editBtn';

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteBtn';

    let td3 = document.createElement('td');
    td3.appendChild(editButton);
    td3.appendChild(deleteButton);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    return tr;
}

start();