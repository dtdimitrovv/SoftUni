function attachGradientEvents() {
    // Get the box
    let gradientBoxElement = document.getElementById('gradient-box');

    // Get the result
    let resultElement = document.getElementById('result');

    gradientBoxElement.addEventListener('mouseover', function (e) {
        let percentage = Math.floor((e.offsetX / e.currentTarget.offsetWidth) * 100);
        resultElement.textContent = `${percentage}%`;
    });
}