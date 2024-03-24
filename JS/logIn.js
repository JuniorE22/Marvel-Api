let btnContinue = document.querySelector('.btnModify');

btnContinue.addEventListener('click', () => {
    let inputEmail = document.querySelector('#exampleInputEmail1').value;
    let contacts = JSON.parse(localStorage.getItem(inputEmail));

    if (contacts !== null && contacts.newContact.email === inputEmail) {
        window.location.href = "signIn.html?email=" + inputEmail
    } else {
        window.location.href = "createAccount.html?email=" + inputEmail
    }
})