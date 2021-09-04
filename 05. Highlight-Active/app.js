function focused() {
    let allDivElements = document.querySelectorAll('body div div');

    console.log(allDivElements);

    for (let i = 0; i < allDivElements.length; i++) {
        allDivElements[i].children[1].addEventListener('focus', () => {
            allDivElements[i].className = 'focused';
        });

        console.log(allDivElements[i].children[1]);

        allDivElements[i].children[1].addEventListener('blur', () => {
            allDivElements[i].classList.remove('focused');
        });
    }
}