function lockedProfile() {
    // Get the list of profiles
    let listOfProfiles = document.querySelectorAll('#main .profile');
    console.log(listOfProfiles);

    // Get the buttons
    let buttons = document.querySelectorAll('#main .profile button');

    // Add event listener to each
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            // Get the radio button name
            let radioButtonElementName = `user${i + 1}Locked`;

            // Give me the one that is checked as this is what matters
            let radioButtonElement = document.querySelector(`input[name="${radioButtonElementName}"]:checked`);

            // Check if the current profile is locked or not
            if (radioButtonElement.value == 'unlock') {
                // Get the hidden field for no matter which element is chosen
                let hiddenFieldElement = document.getElementById(`user${i + 1}HiddenFields`);

                if (buttons[i].textContent == 'Show more') {
                    // Toggle hidden field display
                    hiddenFieldElement.style.display = 'block';

                    // Get the button that is pressed and change its name
                    buttons[i].textContent = 'Hide it';
                } else {
                    // Toggle hidden field display
                    hiddenFieldElement.style.display = 'none';

                    // Get the button that is pressed and change its name
                    buttons[i].textContent = 'Show more';
                }
            }
        });
    }


}