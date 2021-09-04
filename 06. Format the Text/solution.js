function solve() {
  // Get the input text
  let inputText = document.getElementById('input').value.trim().split('.');

  let finalOutput = document.getElementById('output');

  console.log(inputText);

  let currentOutput = '';

  let times = 0;
  for (let i = 0; i < inputText.length - 1; i++) {
    if (inputText[i].length >= 1) {
      currentOutput += inputText[i] + '.';
      times++;
    }
    if (times % 3 == 0) { // As we start counting from 0
      finalOutput.innerHTML += `<p>${currentOutput}</p>`;
      currentOutput = '';
    }
  }

  if (currentOutput.length != 0) {
    finalOutput.innerHTML += `<p>${currentOutput}</p>`;
  }
}