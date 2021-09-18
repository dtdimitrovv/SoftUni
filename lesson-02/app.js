async function getRecipes() {
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
    const recipes = await response.json();

    return Object.values(recipes);
}

function createArticle(recipe) {
    // Create article
    let article = document.createElement('article');
    article.className = 'preview';

    // Create div with class TITLE
    let div = document.createElement('div');
    div.className = 'title';

    // Create h2
    let h2 = document.createElement('h2');
    h2.textContent = recipe.name;

    div.appendChild(h2);

    let div2 = document.createElement('div');
    div2.className = 'small';

    let img = document.createElement('img');
    img.src = recipe.img;

    div2.appendChild(img);

    article.appendChild(div);
    article.appendChild(div2);

    return article;
}

async function handleRecipesIntoHTML() {
    let recipesArray = await getRecipes();
    let main = document.querySelector('body main');
    for (let i = 0; i < recipesArray.length; i++) {
        // Get the article
        let article = createArticle(recipesArray[i]);

        // Append the article to the main
        main.appendChild(article);

        // Add event listener to the article
        article.addEventListener('click', async () => {
            // Create the full recipe article
            let detailedArticle = await createFullRecipeArticle(recipesArray[i]._id);
            article.replaceWith(detailedArticle);
        });
    }
}

async function createFullRecipeArticle(id) {
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/details/' + id);
    const recipe = await response.json();

    let article = document.createElement('article');

    let h2 = document.createElement('h2');
    h2.textContent = recipe.name;

    let bandDiv = document.createElement('div');
    bandDiv.className = 'band'

    let thumbDiv = document.createElement('div');
    thumbDiv.className = 'thumb';

    let img = document.createElement('img');
    img.src = recipe.img;

    thumbDiv.appendChild(img);

    let ingredientsDiv = document.createElement('div');
    ingredientsDiv.className = 'ingredients';

    let h3 = document.createElement('h3');
    h3.textContent = 'Ingredients:';

    let ul = document.createElement('ul');
    for (let i = 0; i < recipe.ingredients.length; i++) {
        let li = document.createElement('li');
        li.textContent = recipe.ingredients[i];
        ul.appendChild(li);
    }

    ingredientsDiv.appendChild(h3);
    ingredientsDiv.appendChild(ul);

    bandDiv.appendChild(thumbDiv);
    bandDiv.appendChild(ingredientsDiv);

    let descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'description';

    let secondH3 = document.createElement('h3');
    secondH3.textContent = 'Preparation:';

    descriptionDiv.appendChild(secondH3);

    for (let i = 0; i < recipe.steps.length; i++) {
        let p = document.createElement('p');
        p.textContent = recipe.steps[i];
        descriptionDiv.appendChild(p);
    }

    article.appendChild(h2);
    article.appendChild(bandDiv);
    article.appendChild(descriptionDiv);

    return article;
}

window.addEventListener('load', async () => {
    // Hide the 'loading' paragraph'
    let p = document.querySelector('body main p');
    p.style.display = 'none';

    handleRecipesIntoHTML();
});