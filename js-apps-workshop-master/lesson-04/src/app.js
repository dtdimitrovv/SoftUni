import { setupCatalog, showCatalog } from './catalog.js';
import { setupLogin, showLogin } from './login.js';
import { setupRegister, showRegister } from './register.js';
import { setupCreate, showCreate } from './create.js';
import { setupDetails } from './details.js';
import { setupEdit } from './edit.js';

main();

function main() {
    // Decide what to show depending on if the user is logged in or not
    setUserNavigation();

    const nav = document.querySelector('nav');

    // Get the main element to which we will append sections
    const main = document.querySelector('main');

    // Grab sections and pass them by reference to their modules
    const catalogSection = document.getElementById('catalogSection');
    setupCatalog(main, catalogSection, setActiveNav);

    const loginSection = document.getElementById('loginSection');
    setupLogin(main, loginSection, setActiveNav); // The last function will change the user navigation if they have logged in successfully and will show the catalog

    const registerSection = document.getElementById('registerSection');
    setupRegister(main, registerSection, setActiveNav);

    const createSection = document.getElementById('createSection');
    setupCreate(main, createSection, setActiveNav);

    const detailsSection = document.getElementById('detailsSection');
    setupDetails(main, detailsSection, setActiveNav);

    const editSection = document.getElementById('editSection');
    setupEdit(main, editSection, setActiveNav);

    // Create a map to store the id and the function to be called when the element with that id is clicked  
    const links = {
        'catalogLink': showCatalog,
        'loginLink': showLogin,
        'registerLink': showRegister,
        'createLink': showCreate
    };

    // Make the nav buttons show different sections
    setupNavigation();

    // Start from the home page
    showCatalog();

    function setActiveNav(targetId) {
        // Get all links
        [...nav.querySelectorAll('a')].forEach(link => {
            if (link.id == targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function setupNavigation() {
        document.getElementById('logoutBtn').addEventListener('click', logout);

        nav.addEventListener('click', event => {
            event.preventDefault();
            // Check if the user has clicked on links
            // This is the way we identify links
            if (event.target.tagName == 'A') {
                const view = links[event.target.id];
                // Check if we have got the function or undefined as we may have clicked somewhere else
                if (typeof view == 'function') {
                    // Show that view
                    view();
                }
            }
        });
    }

    function setUserNavigation() {
        if (sessionStorage.getItem('authToken') != null) {
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
        } else {
            document.getElementById('user').style.display = 'none';
            document.getElementById('guest').style.display = 'inline-block';
        }
    }

    async function logout() {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'get',
            headers: {
                'X-Authorization': sessionStorage.getItem('authToken')
            },
        });
        if (response.status == 200) {
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('email');

            setUserNavigation();
            showCatalog();
        } else {
            console.error(await response.json());
        }
    }
}