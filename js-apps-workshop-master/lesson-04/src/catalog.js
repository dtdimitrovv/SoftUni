import { e } from './dom.js';
import { showDetails } from './details.js';

async function getRecipes() {
    const response = await fetch('http://localhost:3030/data/recipes');
    const recipes = await response.json();

    return recipes;
}

function createRecipePreview(recipe) {
    const result = e('article', { className: 'preview', onClick: () => showDetails(recipe._id) },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );

    return result;
}

let main;
let section;
let setActiveNav;

// Setup function to store reference to the section we want the module to manage
// Store main element reference so that we have a place to append our section
// Initialize event listeners if necessary
export function setupCatalog(mainTarget, sectionTarget, setActiveNavCallBack) {
    main = mainTarget;
    section = sectionTarget;
    setActiveNav = setActiveNavCallBack;
}

// Display function
export async function showCatalog() {
    setActiveNav('catalogLink');

    // - clear main element's HTML
    main.innerHTML = '';

    // Clear section of previous data
    section.innerHTML = '';

    // - fetch data if required
    const recipes = await getRecipes();
    const cards = recipes.map(createRecipePreview);

    // - attach section
    cards.forEach(c => section.appendChild(c));

    main.appendChild(section);
}