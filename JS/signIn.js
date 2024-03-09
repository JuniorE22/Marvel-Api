let emailContent = document.querySelector('.emailContent')
let btnContinue = document.querySelector('.btnModify');

let urlParams = new URLSearchParams(window.location.search)
let email = urlParams.get('email')

emailContent.textContent = email;


btnContinue.addEventListener('click', () => {
    debugger
    let inputPassword = document.querySelector('#passwordField').value;
    let emailExist = JSON.parse(localStorage.getItem(email));

    if (emailExist.newContact.password === inputPassword) {
        emailExist.newContact.active = true
        const value = JSON.stringify(emailExist);
        localStorage.setItem(email, value);
        window.location.href = "/index.html?email=" + email
        console.log("Bienvenido")

    } else {
        alert("introduce la contraseña correcta")
    }
})