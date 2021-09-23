function attachEvents() {
    const sendButton = document.getElementById('submit');
    sendButton.addEventListener('click', onSend);

    const refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', onRefresh);
}

async function onRefresh() {
    let textarea = document.getElementById('messages');
    const response = await fetch('http://localhost:3030/jsonstore/messenger');
    const data = await response.json();
    Object.values(data).forEach(el => {
        if (el.author != undefined && el.content != undefined) {
            textarea.textContent += `${el.author}: ${el.content}` + '\n';
        }
    });
    textarea.textContent.trimEnd();
}

async function onSend() {
    // Clear the textarea
    let textarea = document.getElementById('messages');
    textarea.textContent = '';
    
    const author = document.querySelector('input').value;
    const content = document.querySelectorAll('input')[1].value;

    const response = await fetch('http://localhost:3030/jsonstore/messenger', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ author, content })
    });

    if (response.ok == false) {
        const error = response.json();
        return alert(error.message);
    }

    // Clear the fields
    document.querySelector('input').value = '';
    document.querySelectorAll('input')[1].value = '';
}

attachEvents();