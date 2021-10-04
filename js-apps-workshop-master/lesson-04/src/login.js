import { showCatalog } from './catalog.js';

async function onSubmit(data) {
    const body = JSON.stringify({
        email: data.email,
        password: data.password,
    });

    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
        const data = await response.json();
        if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
            sessionStorage.setItem('userId', data._id);
            sessionStorage.setItem('email', data.email);

            // setUserNavigation
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';

            // Don't reload the page call the function below
            showCatalog();
        } else {
            throw new Error(data.message);
        }
    } catch (err) {
        console.error(err.message);
    }
}

let main;
let section;
let setActiveNav;

export function setupLogin(mainTarget, sectionTarget, setActiveNavCallBack) {
    main = mainTarget;
    section = sectionTarget;
    setActiveNav = setActiveNavCallBack;

    // The login form will come from the section as the document now has many forms and we need to take the exact one which is on the section 
    const form = section.querySelector('form');

    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        onSubmit([...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {}));
    }));
}

export function showLogin() {
    setActiveNav('loginLink');
    main.innerHTML = '';
    main.appendChild(section);
}