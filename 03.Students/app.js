async function extractExistingStudents() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = Object.values(await response.json());
    let tableBody = document.querySelector('tbody');
    data.forEach(person => {
        let row = createStudentRow(person);
        tableBody.appendChild(row);
    });
}

document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');
    let facultyNumber = formData.get('facultyNumber');
    let grade = formData.get('grade');

    if (firstName == '' || lastName == '' || facultyNumber == '' || grade == '') {
        return alert('Fields must be non-empty');
    }

    let person = { firstName, lastName, facultyNumber, grade };

    const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(person)
    });

    if (response.ok) {
        let tableBody = document.querySelector('tbody');
        let row = createStudentRow(person);
        tableBody.appendChild(row);
    } else {
        const error = response.json();
        return alert(error.message);
    }

    clearInputFields();
});


extractExistingStudents();

function createStudentRow(personObject) {
    let th1 = document.createElement('th');
    th1.textContent = personObject.firstName;

    let th2 = document.createElement('th');
    th2.textContent = personObject.lastName;

    let th3 = document.createElement('th');
    th3.textContent = personObject.facultyNumber;

    let th4 = document.createElement('th');
    th4.textContent = personObject.grade;

    let tr = document.createElement('tr');
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);

    return tr;
}

function clearInputFields() {
    let inputFields = Array.from(document.querySelector('.inputs').children);
    inputFields.forEach(field => {
        field.value = '';
    })
}