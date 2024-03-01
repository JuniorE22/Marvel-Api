let btnContinue = document.querySelector('.btnModify');
let firstNameInput = document.querySelector('#firstNameField');
let lastNameInput = document.querySelector('#lastNameField');
let passwordInput = document.querySelector('#passwordField');
let birthDayInput = document.querySelector('#birthField');
let emailContent = document.querySelector('.emailContent')

let urlParams = new URLSearchParams(window.location.search)
let email = urlParams.get('email')

emailContent.textContent = email;

btnContinue.addEventListener('click', () => {
    debugger

    let firstName = firstNameInput.value
    let lastName = lastNameInput.value
    let password = passwordInput.value
    let birthDay = birthDayInput.value
    let active = true;
    if (email !== null && email.trim() !== '') {

        let newContact = {
            email, firstName, lastName, password, birthDay, active
        }
        const value = JSON.stringify({newContact});
        localStorage.setItem(email, value);

    } else {
        alert('llena todos los campos')
    }
})
