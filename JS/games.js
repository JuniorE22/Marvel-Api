import {sessionActive} from "../main.js"

let allGamesData = [];
let allPagination = [];
let rowContainer = document.querySelector('#rowContainer')
let paginationContainer = document.querySelector("#pagination")
let inputSearch = document.querySelector('#inputSearch')
let GET_URL = "http://gateway.marvel.com/v1/public/events?"

let currentPage = 1;
let liPrevious = document.createElement("li");
let aPrevious = document.createElement("a");
let liNext = document.createElement("li");
let aNext = document.createElement("a");

const getGames = async (params = {}) => {
    try {
        debugger
        const mainParams = {
            title: params.title,
            ts: '1',
            apikey: 'f261b7a9df35311738cdc220e78c3bf9',
            hash: '8147a92999450be7f35b0b0003b77eed',
            offset: currentPage - 1,
        };

        const response = await axios.get(GET_URL, {
            params: mainParams
        });

        const responseData = response.data.data;
        allPagination = response.data;
        allGamesData = responseData.results;
        console.log(responseData)
    } catch (error) {
        console.log(error)
    }
}

const createElements = () => {
    paginationContainer.innerHTML = ""
    createPagination();
    rowContainer.innerHTML = "";

    allGamesData.forEach(gamesData => {
        let divCol = document.createElement("div")
        let column = document.createElement("div")
        let imgGames = document.createElement("img");
        let divDescription = document.createElement("div");
        let titleGames = document.createElement("h4");
        let premiereGames = document.createElement("p");
        
        divCol.className = "col"
        divCol.style = "padding-bottom: 10px"
        column.className = "card";
        column.style = "width: 13rem";
        imgGames.className = "card-img-top";
        imgGames.src = `${gamesData.thumbnail.path}.${gamesData.thumbnail.extension}`
        divDescription.className = "card-body";
        titleGames.className = "card-text";
        titleGames.className = "card-title text-truncate";
        titleGames.setAttribute('data-bs-toggle', "tooltip")
        titleGames.setAttribute('data-bs-placement', "top")
        titleGames.setAttribute('data-bs-title', `${gamesData.title}`)
        titleGames.textContent = gamesData.title;
        premiereGames.textContent = gamesData.type;

        rowContainer.appendChild(divCol);
        divCol.appendChild(column);
        column.appendChild(imgGames);
        column.appendChild(divDescription);
        divDescription.appendChild(titleGames);
        divDescription.appendChild(premiereGames);
    })
} 

const createElementsSearch = () => {
        paginationContainer.innerHTML = ""
        createPaginationSearch();
        rowContainer.innerHTML = "";

        allGamesData.forEach(gamesData => {
    
            let divCol = document.createElement("div")
            let column = document.createElement("a")
            let imgGames = document.createElement("img");
            let divDescription = document.createElement("div");
            let titleGames = document.createElement("h5");
            let premiereGames = document.createElement("p");
    
            divCol.className = "col"
            divCol.style = "padding-bottom: 10px"
            column.className = "card";
            column.style = "width: 13rem";
            imgGames.className = "card-img-top";
            imgGames.src = `${gamesData.thumbnail.path}.${gamesData.thumbnail.extension}`
            divDescription.className = "card-body";
            titleGames.className = "card-text";
            titleGames.className = "card-title text-truncate";
            titleGames.setAttribute('data-bs-toggle', "tooltip")
            titleGames.setAttribute('data-bs-placement', "top")
            titleGames.setAttribute('data-bs-title', `${gamesData.title}`)
            titleGames.textContent = gamesData.title;
    
            rowContainer.appendChild(divCol);
            divCol.appendChild(column);
            column.appendChild(imgGames);
            column.appendChild(divDescription);
            divDescription.appendChild(titleGames);
            divDescription.appendChild(premiereGames);
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
                currentPage = aPage.textContent
                liPagination.className = "page-item active";

                const params = buildParams();
                await getGames(params);
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
            currentPage = aPage.textContent
            liPagination.className = "page-item active";

            const params = buildParams();
            await getGames(params);
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
                currentPage = aPage.textContent
                liPagination.className = "page-item active";

                const params = buildParams();
                await getGames(params);
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
                currentPage = aPage.textContent
                liPagination.className = "page-item active";

                const params = buildParams();
                await getGames(params);
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

const createPaginationSearch = () => {

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
            currentPage = aPage.textContent
            liPagination.className = "page-item active";

            const params = buildParamsSearch();
            await getGames(params);
            createElementsSearch();
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
    await getGames(params);
    createElements();
}

const previeousPage = async () => {
    currentPage = parseInt(currentPage) - 1;
    const params = buildParams();
    await getGames(params);
    createElements();
}

const buildParamsSearch = () => {
    const params = {
        title: encodeURIComponent(inputSearch.value),
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
        const params = buildParamsSearch();
        await getGames(params);
        createElementsSearch();
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

window.onload = async() => {
    sessionActive();
   await getGames();
   createElements();
}