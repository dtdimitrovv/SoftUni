function getArticleGenerator(articles) {

    // Create an index to check whether there will be more strings or not
    let i = 0;

    return function () {
        if (i < articles.length) {
            // Create an article element
            let newArticle = document.createElement('article');
            newArticle.textContent = articles[i++];

            // Append it to the section with ID='content'
            let sectionToAppend = document.getElementById('content');
            sectionToAppend.appendChild(newArticle);
        }
    }
}
