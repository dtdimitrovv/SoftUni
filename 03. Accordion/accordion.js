function toggle() {
    const buttonName = document.getElementsByClassName('button')[0].textContent;
    if (buttonName == 'More') {
        document.getElementById('extra').style.display = 'block';
        document.getElementsByClassName('button')[0].textContent = 'Less';
    } else {
        document.getElementById('extra').style.display = 'none';
        document.getElementsByClassName('button')[0].textContent = 'More';
    }
}