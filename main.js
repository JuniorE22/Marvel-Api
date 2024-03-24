let login = document.querySelector('.login')
let containerTopNav = document.querySelector('.container-topNav')
let bntGetStarted = document.querySelector('.cta-btn')
let imgMarvel = document.querySelector('.image-logo')
let comics = document.querySelector('#comics')
let characters = document.querySelector('#characters')


let urlParams = new URLSearchParams(window.location.search)
let email = urlParams.get('email')

function sessionActive() {

    let userActive = JSON.parse(localStorage.getItem(email))
    let logOut
    debugger
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));
   
        if(value.newContact.active === true){

        login.textContent = value.newContact.firstName + " " + value.newContact.lastName
        imgMarvel.href = "../index.html"
        let divLogOut = document.createElement('div');
        divLogOut.classList.add("containerLogout")
        bntGetStarted.remove()
        logOut = document.createElement('a');
        logOut.classList.add("logOut")
        logOut.textContent = "Log Out"

        divLogOut.appendChild(logOut)
        containerTopNav.appendChild(divLogOut)

        logOut.addEventListener('click', () => {

            let respond = confirm("¿Estas seguro que quieres cerrar sesion?")
            if (respond) {
                value.newContact.active = false
                const respond = JSON.stringify(value);
                localStorage.setItem(key, respond);
                window.location.href = "/index.html"
            }
        })
    }
    }
}

window.onload = () => {
    sessionActive();
}

export {sessionActive}