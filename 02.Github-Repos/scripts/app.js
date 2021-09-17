function loadRepos() {
	// Get the username
	let username = document.getElementById('username').value;

	// Create the URL
	let url = `https://api.github.com/users/${username}/repos`;

	// Create a request
	let request = fetch(url);

	request.then(handleResponse);

	function handleResponse(response) {
		let dataPromise = response.json();

		dataPromise.then(handleData);
	}

	function handleData(data) {
		let ulElement = document.getElementById('repos');

		for (let i = 0; i < data.length; i++) {
			let newLi = document.createElement('li');
			let a = document.createElement('a');
			a.href = data[i].archive_url;
			a.textContent = data[i].full_name;
			newLi.appendChild(a);
			ulElement.appendChild(newLi);
		}
	}
}