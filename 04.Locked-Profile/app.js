async function lockedProfile() {
    // Hide the example user card
    document.querySelector('.profile').style.display = 'none';

    let mainElement = document.getElementById('main');

    let response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    let profiles = Object.values(await response.json());

    for (let i = 0; i < profiles.length; i++) {
        let usercard = createUserCard(profiles[i], i);
        mainElement.appendChild(usercard);
    }
}

function createUserCard(profile, i) {
    let div = createElement('div', { className: 'profile' },);

    let img = createElement('img', { src: './iconProfile2.png', className: 'userIcon' },);

    let label = createElement('label', {}, 'Lock');

    let input = createElement('input', { type: 'radio', name: `user${i + 1}Locked`, value: 'lock' });
    input.checked = true;

    let label2 = createElement('label', {}, 'Unlock');

    let input2 = createElement('input', { type: 'radio', name: `user${i + 1}Locked`, value: 'unlock' });

    let hr = createElement('HR', {},);

    let label3 = createElement('label', {}, 'Username');

    let input3 = createElement('input', { type: 'text', name: `user${i + 1}Username`, value: '' });
    input3.disabled = true;
    input3.readonly = true;
    input3.value = profile.username;

    let hiddenFieldDiv = createHiddenFieldsDiv(profile, i);
    hiddenFieldDiv.style.display = 'none';

    let button = createButtonAndAddEventListeners(hiddenFieldDiv);

    div.appendChild(img);
    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(label2);
    div.appendChild(input2);
    div.appendChild(hr);
    div.appendChild(label3);
    div.appendChild(input3);
    div.appendChild(hiddenFieldDiv);
    div.appendChild(button);

    return div;
}

function createButtonAndAddEventListeners(hiddenFieldDiv) {
    let button = createElement('button', {}, 'Show more');
    button.addEventListener('click', () => {
        if (button.textContent == 'Show more') {
            hiddenFieldDiv.style.display = 'inline';
            button.textContent = 'Hide it';
        } else {
            hiddenFieldDiv.style.display = 'none';
            button.textContent = 'Show more';
        }
    });

    return button;
}

function createHiddenFieldsDiv(profile, i) {
    let hiddenFieldDiv = createElement('div', { className: `user${i + 1}HiddenFields` });
    let hr = createElement('HR', {},);
    let label = createElement('label', {}, 'Email:');
    let input = createElement('input', { type: 'email', name: `user${i + 1}Email`, value: '' });
    input.disabled = true;
    input.readonly = true;
    input.value = profile.email;
    let label2 = createElement('label', {}, 'Age:');
    let input2 = createElement('input', { type: 'email', name: `user${i + 1}Age`, value: '' });
    input2.disabled = true;
    input2.readonly = true;
    input2.value = profile.age;

    hiddenFieldDiv.appendChild(hr);
    hiddenFieldDiv.appendChild(label);
    hiddenFieldDiv.appendChild(input);
    hiddenFieldDiv.appendChild(label2);
    hiddenFieldDiv.appendChild(input2);

    return hiddenFieldDiv;
}

function createElement(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}