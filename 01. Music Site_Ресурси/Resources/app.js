window.addEventListener('load', solve);

function solve() {
    const addButton = document.getElementById('add-btn');

    // Add event listener to the form
    addButton.addEventListener('click', (event) => {
        event.preventDefault();

        // Get the form items
        const genre = document.getElementById('genre');
        const name = document.getElementById('name');
        const author = document.getElementById('author');
        const date = document.getElementById('date');

        if (genre.value != '' && name.value != '' && author.value != '' && date.value != '') {
            // Input fields must be added to the div with the class "all-hits-container" 
            let newDiv = document.createElement('div');
            newDiv.className = 'hits-info';

            let img = document.createElement('img');
            img.src = './static/img/img.png';

            let genreH2 = document.createElement('h2');
            genreH2.textContent = `Genre: ${genre.value}`;

            let nameH2 = document.createElement('h2');
            nameH2.textContent = `Name: ${name.value}`;

            let authorH2 = document.createElement('h2');
            authorH2.textContent = `Author: ${author.value}`;

            let dateH3 = document.createElement('h3');
            dateH3.textContent = `Date: ${date.value}`;

            let saveButton = document.createElement('button');
            saveButton.className = 'save-btn';
            saveButton.textContent = 'Save song';
            saveButton.addEventListener('click', onSave);

            let likeButton = document.createElement('button');
            likeButton.className = 'like-btn';
            likeButton.textContent = 'Like song';
            likeButton.addEventListener('click', onLike);

            let deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', onDeleteInCollectionOfSongs)

            newDiv.appendChild(img);
            newDiv.appendChild(genreH2);
            newDiv.appendChild(nameH2);
            newDiv.appendChild(authorH2);
            newDiv.appendChild(dateH3);
            newDiv.appendChild(saveButton);
            newDiv.appendChild(likeButton);
            newDiv.appendChild(deleteButton);

            document.querySelector('.all-hits-container').appendChild(newDiv);

            // Clear the inputs
            genre.value = '';
            name.value = '';
            author.value = '';
            date.value = '';
        }
    });

    function onLike(event) {
        // Disable the like button
        event.target.disabled = true;

        // Get the Total likes
        let totalLikesElement = document.querySelector('.likes').children[0];
        let totalLikesText = document.querySelector('.likes').children[0].textContent;
        let number = Number(totalLikesText.split(' ')[2]);
        number++;
        totalLikesElement.textContent = `Total Likes: ${number}`;
    }

    function onDeleteInSavedSongs(event) {
        document.querySelector('.saved-container').removeChild(event.target.parentNode);
    }

    function onDeleteInCollectionOfSongs(event) {
        document.querySelector('.all-hits-container').removeChild(event.target.parentNode);
    }

    function onSave(event) {
        // Get the div
        let div = event.target.parentNode;

        // Remove the div from 'Collection of songs'
        document.querySelector('.all-hits-container').removeChild(div);

        let saveBtn = div.children[5];
        let likeBtn = div.children[6];
        let deleteButton = div.children[7];

        // Remove the like and save button of the current div
        div.removeChild(saveBtn);
        div.removeChild(likeBtn);

        deleteButton.addEventListener('click', onDeleteInSavedSongs);

        document.querySelector('.saved-container').appendChild(div);
    }
}