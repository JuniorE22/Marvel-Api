let login = document.querySelector('.login')
let containerTopNav = document.querySelector('.container-topNav')
let bntGetStarted = document.querySelector('.cta-btn')
let imgMarvel = document.querySelector('.image-logo')




let urlParams = new URLSearchParams(window.location.search)
let email = urlParams.get('email')

function sessionActive() {

    let userActive = JSON.parse(localStorage.getItem(email))
    let logOut

    if (email === null) {
    } else if (userActive.newContact.email === email && userActive.newContact.active === true) {
        login.href = "#"
        login.textContent = userActive.newContact.firstName + " " + userActive.newContact.lastName
        imgMarvel.href = window.location.search
        bntGetStarted.remove()
        let divLogOut = document.createElement('div');
        divLogOut.classList.add("containerLogout")
        logOut = document.createElement('a');
        logOut.classList.add("logOut")
        logOut.textContent = "Log Out"

        divLogOut.appendChild(logOut)
        containerTopNav.appendChild(divLogOut)

        logOut.addEventListener('click', () => {
          debugger
            
            let respond = confirm("¿Estas seguro que quieres cerrar sesion?")
            if (respond) {
                userActive.newContact.active = false
                const value = JSON.stringify(userActive );
                localStorage.setItem(email, value);
                window.location.href = "/index.html"
            }
        })
    }




}


window.onload = () => {
    sessionActive();
}