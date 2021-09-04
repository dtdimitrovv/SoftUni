function solve() {
  let textArray = document.getElementById('text').value.match(/[\w+]+/g);
  let namingConversion = document.getElementById('naming-convention').value;

  let resultField = document.getElementById('result');

  textArray = textArray.map(e => e.toLowerCase());

  let output = '';

  if (namingConversion == 'Camel Case') {
    output += textArray[0];
    for (let i = 1; i < textArray.length; i++) {
      output += textArray[i][0].toUpperCase() + textArray[i].substring(1);
    }
  } else if (namingConversion == 'Pascal Case') {
    for (let i = 0; i < textArray.length; i++) {
      output += textArray[i][0].toUpperCase() + textArray[i].substring(1);
    }
  } else {
    output = 'Error!'
  }

  resultField.textContent = output;
}