let emailContent = document.querySelector('.emailContent')
let btnContinue = document.querySelector('.btnModify');

let urlParams = new URLSearchParams(window.location.search)
let email = urlParams.get('email')

emailContent.textContent = email;

btnContinue.addEventListener('click', () => {
    debugger
    let inputPassword = document.querySelector('#passwordField').value;

    let contacts = localStorage.getItem(email);
    let emailExist = JSON.parse(contacts);


    if (emailExist.newContact.password === inputPassword) {
        console.log("Bienvenido")
    } else {
        alert("introduce la contraseña correcta")
    }
})