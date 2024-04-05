import { sessionActive } from "../main.js";

let allCharacterData = [];
let allPagination = [];
let rowContainer = document.querySelector('#rowContainer')
let paginationContainer = document.querySelector("#pagination")
const inputSearch = document.querySelector("#inputSearch")
const btnSearch = document.querySelector("#btnSearch")
let GET_URL = "http://gateway.marvel.com/v1/public/characters?"

let currentPage = 1;
let liPrevious = document.createElement("li");
let aPrevious = document.createElement("a");
let liNext = document.createElement("li");
let aNext = document.createElement("a");

const getCharacters = async (params = {}) => {
    try {
        const mainParams = {
            name: params.name,
            apikey: 'f261b7a9df35311738cdc220e78c3bf9',
            ts: '1',
            hash: '8147a92999450be7f35b0b0003b77eed',
            offset: currentPage - 1,
        }

        const response = await axios.get(GET_URL, {
            params: mainParams
        })

        const responseData = response.data.data;
        allPagination = response.data;
        allCharacterData = responseData.results;
        console.log(responseData)
    } catch (error) {
        console.log(error)
    }
}
const createElements = () => {
    paginationContainer.innerHTML = ""
    createPagination();
    rowContainer.innerHTML = "";

    allCharacterData.forEach(characterData => {

        let divCol = document.createElement("div")
        let column = document.createElement("a")
        let imgCharacter = document.createElement("img");
        let divDescription = document.createElement("div");
        let titleCharacter = document.createElement("h5");
        let premiereCharacter = document.createElement("p");

        divCol.className = "col"
        divCol.style = "padding-bottom: 5rem"
        column.className = "card border-color";
        column.style = "border-color: black;"
        column.href = "./detailsCharacters.html?characters=characters?id=" + characterData.id
        imgCharacter.className = "card-img-top";
        imgCharacter.src = `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`
        divDescription.className = "card-body";
        divDescription.style = "background-color: #202020; text-align: center;"
        titleCharacter.className = "card-text";
        titleCharacter.style = " color: white;"
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        titleCharacter.className = "card-title text-truncate";
        titleCharacter.setAttribute('data-bs-toggle', "tooltip")
        titleCharacter.setAttribute('data-bs-placement', "top")
        titleCharacter.setAttribute('data-bs-title', `${characterData.name}`)
        titleCharacter.textContent = characterData.name;

        rowContainer.appendChild(divCol);
        divCol.appendChild(column);
        column.appendChild(imgCharacter);
        column.appendChild(divDescription);
        divDescription.appendChild(titleCharacter);
        divDescription.appendChild(premiereCharacter);
    })
}
const createElementsBySearch = () => {
    paginationContainer.innerHTML = ""
    createPaginationBySearch();
    rowContainer.innerHTML = "";

    allCharacterData.forEach(characterData => {
        let divCol = document.createElement("div")
        let column = document.createElement("a")
        let imgCharacter = document.createElement("img");
        let divDescription = document.createElement("div");
        let titleCharacter = document.createElement("h5");
        let premiereCharacter = document.createElement("p");

        divCol.className = "col"
        divCol.style = "padding-bottom: 5rem"
        column.className = "card border-color";
        column.style = "border-color: black;"
        column.href = "./detailsCharacters.html?characters=characters?id=" + characterData.id
        imgCharacter.className = "card-img-top";
        imgCharacter.src = `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`
        divDescription.className = "card-body";
        divDescription.style = "background-color: #202020; text-align: center;"
        titleCharacter.className = "card-text";
        titleCharacter.style = " color: white;"
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        titleCharacter.className = "card-title text-truncate";
        titleCharacter.setAttribute('data-bs-toggle', "tooltip")
        titleCharacter.setAttribute('data-bs-placement', "top")
        titleCharacter.setAttribute('data-bs-title', `${characterData.name}`)
        titleCharacter.textContent = characterData.name;

        rowContainer.appendChild(divCol);
        divCol.appendChild(column);
        column.appendChild(imgCharacter);
        column.appendChild(divDescription);
        divDescription.appendChild(titleCharacter);
        divDescription.appendChild(premiereCharacter);
    })
}

const createPagination = () => {

    liPrevious.className = "page-item disabled";
    aPrevious.className = "page-link";
    aPrevious.setAttribute('tabindex', "-1")
    aPrevious.setAttribute('aria-disabled', "true")
    aPrevious.textContent = "Previous"

    if (currentPage > 1) {
        liPrevious.className = "page-item";
        aPrevious.className = "page-link";
        aPrevious.setAttribute('aria-disabled', "false")
        aPrevious.href = "#"
    }

    paginationContainer.appendChild(liPrevious);
    liPrevious.appendChild(aPrevious);

    if (currentPage < 5) {

        for (let index = 1; index <= 7; index++) {
            const liPagination = document.createElement("li");
            liPagination.className = "page-item";
            const aPage = document.createElement("a");
            aPage.href = "#";


            aPage.className = "page-link ";
            aPage.textContent = `${index}`
            if (currentPage == index) {
                aPage.className = "page-link active";
            }

            if (index == 7) {
                aPage.textContent = "..."
                aPage.className = "page-link disabled";
                paginationContainer.appendChild(liPagination);
                liPagination.appendChild(aPage);
            }

            paginationContainer.appendChild(liPagination);
            liPagination.appendChild(aPage);

            aPage.addEventListener("click", async () => {
                aPage.href = "#";
                currentPage = parseInt(aPage.textContent)
                liPagination.className = "page-item active";

                const params = buildParams();
                await getCharacters(params);
                createElements();
            })
        }

        const liPagination = document.createElement("li");
        liPagination.className = "page-item";
        const aPage = document.createElement("a");
        aPage.href = "#";
        aPage.textContent = `${allPagination.data.total}`
        aPage.className = "page-link";

        paginationContainer.appendChild(liPagination);
        liPagination.appendChild(aPage);

        aPage.addEventListener("click", async () => {
            aPage.href = "#";
            currentPage = parseInt(aPage.textContent)
            liPagination.className = "page-item active";

            const params = buildParams();
            await getCharacters(params);
            createElements();
        })
    }

    if (currentPage > 4 && currentPage < allPagination.data.total - 2) {
        for (let index = 1; index <= 8; index++) {
            const liPagination = document.createElement("li");
            liPagination.className = "page-item";
            const aPage = document.createElement("a");
            aPage.href = "#";

            if (index == 1) {
                aPage.textContent = "1"
                aPage.className = "page-link";
                paginationContainer.appendChild(liPagination);
                liPagination.appendChild(aPage);
            }

            if (index == 2) {
                aPage.textContent = "..."
                aPage.className = "page-link disabled";
                paginationContainer.appendChild(liPagination);
                liPagination.appendChild(aPage);
            }

            if (index == 3) {
                aPage.textContent = currentPage - 1
                aPage.className = "page-link";
                paginationContainer.appendChild(liPagination);
                liPagination.appendChild(aPage);
            }

            if (index == 4) {
                aPage.textContent = currentPage = parseInt(currentPage)
                aPage.className = "page-link active";
                paginationContainer.appendChild(liPagination);
                liPagination.appendChild(aPage);
            }

            if (index == 5) {
                aPage.textContent = currentPage + 1
                aPage.className = "page-link";
                paginationContainer.appendChild(liPagination);
                liPagination.appendChild(aPage);
            }

            if (index == 6) {
                aPage.textContent = currentPage + 2
                aPage.className = "page-link ";
                paginationContainer.appendChild(liPagination);
                liPagination.appendChild(aPage);
            }

            if (index == 7) {
                aPage.textContent = "..."
                aPage.className = "page-link disabled";
                paginationContainer.appendChild(liPagination);
                liPagination.appendChild(aPage);

            }

            if (index == 8) {
                aPage.textContent = `${allPagination.data.total}`
                aPage.className = "page-link";

                paginationContainer.appendChild(liPagination);
                liPagination.appendChild(aPage);
            }

            aPage.addEventListener("click", async () => {
                aPage.href = "#";
                currentPage = parseInt(aPage.textContent)
                liPagination.className = "page-item active";

                const params = buildParams();
                await getCharacters(params);
                createElements();
            })
        }
    }

    if (currentPage >= allPagination.data.total - 2 && currentPage <= allPagination.data.total) {

        for (let index = allPagination.data.total - 5; index <= allPagination.data.total; index++) {
            const liPagination = document.createElement("li");
            liPagination.className = "page-item";
            const aPage = document.createElement("a");
            aPage.href = "#";

            aPage.className = "page-link ";
            aPage.textContent = `${index}`

            if (currentPage == index) {
                aPage.className = "page-link active";
            }

            if (index == allPagination.data.total - 5) {
                aPage.textContent = "1"
                aPage.className = "page-link";
                paginationContainer.appendChild(liPagination);
                liPagination.appendChild(aPage);
            }

            if (index == allPagination.data.total - 4) {
                aPage.textContent = "..."
                aPage.className = "page-link disabled";
                paginationContainer.appendChild(liPagination);
                liPagination.appendChild(aPage);
            }
            paginationContainer.appendChild(liPagination);
            liPagination.appendChild(aPage);

            aPage.addEventListener("click", async () => {

                aPage.href = "#";
                currentPage = parseInt(aPage.textContent)
                liPagination.className = "page-item active";

                const params = buildParams();
                await getCharacters(params);
                createElements();
            })
        }
    }

    liNext.className = "page-item";
    aNext.className = "page-link";
    aNext.href = "#"
    aNext.textContent = "Next"

    if (currentPage == allPagination.data.total) {
        liNext.className = "page-item disable";
        aNext.className = "page-link disabled";
        aNext.textContent = "Next"
    }

    paginationContainer.appendChild(liNext);
    liNext.appendChild(aNext);
}

const createPaginationBySearch = () => {

    liPrevious.className = "page-item disabled";
    aPrevious.className = "page-link";
    aPrevious.setAttribute('tabindex', "-1")
    aPrevious.setAttribute('aria-disabled', "true")
    aPrevious.textContent = "Previous"

    if (currentPage > 1) {
        liPrevious.className = "page-item";
        aPrevious.className = "page-link";
        aPrevious.setAttribute('aria-disabled', "false")
        aPrevious.href = "#"
    }

    paginationContainer.appendChild(liPrevious);
    liPrevious.appendChild(aPrevious);

    for (let index = 1; index <= allPagination.data.total; index++) {
        const liPagination = document.createElement("li");
        liPagination.className = "page-item";
        const aPage = document.createElement("a");
        aPage.href = "#";

        aPage.className = "page-link ";
        aPage.textContent = `${index}`
        if (currentPage == index) {
            aPage.className = "page-link active";
        }

        paginationContainer.appendChild(liPagination);
        liPagination.appendChild(aPage);

        aPage.addEventListener("click", async () => {
            aPage.href = "#";
            currentPage = parseInt(aPage.textContent)
            liPagination.className = "page-item active";

            const params = buildParamsBySearch();
            await getCharacters(params);
            createElementsBySearch();
        })
    }

    liNext.className = "page-item";
    aNext.className = "page-link";
    aNext.href = "#"
    aNext.textContent = "Next"

    if (currentPage == allPagination.data.total) {
        liNext.className = "page-item disable";
        aNext.className = "page-link disabled";
        aNext.textContent = "Next"
    }

    paginationContainer.appendChild(liNext);
    liNext.appendChild(aNext);
}

const nextPage = async () => {
    currentPage = parseInt(currentPage) + 1;
    const params = buildParams();
    await getCharacters(params);
    createElements();
}

const previeousPage = async () => {
    currentPage = parseInt(currentPage) - 1;
    const params = buildParams();
    await getCharacters(params);
    createElements();
}

const buildParamsBySearch = () => {
    const params = {
        name: inputSearch.value,
        ts: '1',
        apikey: 'f261b7a9df35311738cdc220e78c3bf9',
        hash: '8147a92999450be7f35b0b0003b77eed',
        offset: currentPage - 1,
    };
    return params;
}

const buildParams = () => {
    const params = {
        ts: '1',
        apikey: 'f261b7a9df35311738cdc220e78c3bf9',
        hash: '8147a92999450be7f35b0b0003b77eed',
        offset: currentPage - 1,
    };
    return params;
}

btnSearch.addEventListener("click", async () => {
    if (inputSearch.value == "") {
        btnSearch.href = window.location.search
    } else {
        currentPage = 1;
        const params = buildParamsBySearch();
        await getCharacters(params);
        createElementsBySearch();
    }
})

aPrevious.addEventListener("click", async () => {
    await previeousPage();
    if (currentPage > 1) {
        liPrevious.className = "page-item";
        aPrevious.className = "page-link";
        aPrevious.setAttribute('aria-disabled', "false")
        aPrevious.href = "#"
    }
})

aNext.addEventListener("click", async () => {
    await nextPage();
    if (currentPage == allPagination.data.total) {
        liNext.className = "page-item disable";
    }
})

window.onload = async () => {
    sessionActive();
    await getCharacters();
    createElements();
}