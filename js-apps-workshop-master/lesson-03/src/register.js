document.querySelector('form').addEventListener('submit', onRegisterSubmit);

async function onRegisterSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const repeatedPassword = formData.get('rePass');

    // Make sure the fields are filled
    if (email == '' || password == '') {
        return alert('All fields are required');
    }

    // Check if both passwords match
    if (password != repeatedPassword) {
        return alert('Passwords don\'t match');
    }

    // Make a POST request
    const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    // Check the response
    if (response.ok == false) {
        const error = response.json();
        return alert(error.message);
    }

    const data = await response.json();
    sessionStorage.setItem('userToken', data.accessToken);

    window.location.pathname = 'lesson-03/index.html';
}