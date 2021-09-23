// Get the form
const formElement = document.querySelector('form');
formElement.addEventListener('submit', createElement);

async function createElement(event) {
    event.preventDefault();

    const token = sessionStorage.getItem('userToken');
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const image = formData.get('img');
    const ingredients = formData
        .get('ingredients')
        .split('\n')
        .map(r => r.trim())
        .filter(r => r != '');
    const steps = formData
        .get('steps')
        .split('\n')
        .map(r => r.trim())
        .filter(r => r != '');

    // Create a request
    const response = await fetch('http://localhost:3030/data/recipes', {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify({ name, image, ingredients, steps })
    });

    if (response.ok == false) {
        const error = response.json();
        return alert(error.message);
    }

    // Redirect to catalogue page
    window.location.pathname = '/lesson-03/index.html';
}