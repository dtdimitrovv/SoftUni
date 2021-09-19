async function attachEvents() {
    const response = await fetch('http://localhost:3030/jsonstore/blog/posts');
    const posts = Object.values(await response.json());
    let postsElement = document.getElementById('posts');

    for (let i = 0; i < posts.length; i++) {
        let option = document.createElement('option');
        option.value = posts[i].id;
        option.textContent = posts[i].title;
        postsElement.appendChild(option);
    }

    let viewPostsButton = document.getElementById('btnViewPost');
    viewPostsButton.addEventListener('click', async () => {
        let selectedOption = postsElement.options[postsElement.selectedIndex];

        const response = await fetch('http://localhost:3030/jsonstore/blog/comments/');
        const allComments = Object.values(await response.json());
        // console.log(allComments);

        for (let i = 0; i < allComments.length; i++) {
            if (selectedOption.value == allComments[i].postId) {
                // Find the post we are looking for
                for (let j = 0; j < posts.length; j++) {
                    if (posts[j].id == selectedOption.value) {
                        document.getElementById('post-title').textContent = posts[j].title;
                        document.getElementById('post-body').textContent = posts[j].body;
                    }
                }
                break;
            }
        }

        let ul = document.getElementById('post-comments');
        // Clear its children from previous searches
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        for (let i = 0; i < allComments.length; i++) {
            if (selectedOption.value == allComments[i].postId) {
                let li = document.createElement('li');
                li.textContent = allComments[i].text;
                ul.appendChild(li);
            }
        }
    });

}

attachEvents();