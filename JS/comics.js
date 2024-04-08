import { sessionActive } from "../main.js"

let allComicsData = [];
let allPagination = [];
let rowContainer = document.querySelector('#rowContainer')
let paginationContainer = document.querySelector("#pagination")
let inputSearch = document.querySelector('#inputSearch')
let GET_URL = "http://gateway.marvel.com/v1/public/comics?"

let currentPage = 1;
let liPrevious = document.createElement("li");
let aPrevious = document.createElement("a");
let liNext = document.createElement("li");
let aNext = document.createElement("a");

const getComics = async (params = {}) => {
    try {
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
        allComicsData = responseData.results;
        console.log(responseData)
    } catch (error) {
        console.log(error)
    }
}

const createElements = () => {
    paginationContainer.innerHTML = ""
    createPagination();
    rowContainer.innerHTML = "";
    allComicsData.forEach(comicsData => {
        debugger
        let divCol = document.createElement("div")
        let column = document.createElement("a")
        let imgComics = document.createElement("img");
        let divDescription = document.createElement("div");
        let titleComics = document.createElement("h4");

        divCol.className = "col"
        divCol.style = "padding-bottom: 3rem"
        column.className = "card border-color";
        column.style = "border-color: black;"
        column.href = "./detailsComics.html?public=comics&id=" + comicsData.id
        imgComics.className = "card-img-top";
        imgComics.src = `${comicsData.thumbnail.path}.${comicsData.thumbnail.extension}`
        divDescription.className = "card-body";
        divDescription.style = "background-color: #202020; text-align: center;"
        titleComics.className = "card-text";
        titleComics.style = " color: white;"
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        titleComics.className = "card-title text-truncate";
        titleComics.setAttribute('data-bs-toggle', "tooltip")
        titleComics.setAttribute('data-bs-placement', "top")
        titleComics.setAttribute('data-bs-title', `${comicsData.title}`)
        titleComics.textContent = comicsData.title;


        rowContainer.appendChild(divCol);
        divCol.appendChild(column);
        column.appendChild(imgComics);
        column.appendChild(divDescription);
        divDescription.appendChild(titleComics);
    })
}

const createElementsBySearch = () => {
    paginationContainer.innerHTML = ""
    createPaginationBySearch();
    rowContainer.innerHTML = "";


    allComicsData.forEach(comicsData => {

        let divCol = document.createElement("div")
        let column = document.createElement("a")
        let imgComics = document.createElement("img");
        let divDescription = document.createElement("div");
        let titleComics = document.createElement("h5");
        let premiereComics = document.createElement("p");

        divCol.className = "col"
        divCol.style = "padding-bottom: 3rem"
        column.className = "card border-color";
        column.style = "border-color: black;"
        column.href = "./detailsComics.html?public=comics&id=" + comicsData.id
        imgComics.className = "card-img-top";
        imgComics.src = `${comicsData.thumbnail.path}.${comicsData.thumbnail.extension}`
        divDescription.className = "card-body";
        divDescription.style = "background-color: #202020; text-align: center;"
        titleComics.className = "card-text";
        titleComics.style = " color: white;"
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        titleComics.className = "card-title text-truncate";
        titleComics.setAttribute('data-bs-toggle', "tooltip")
        titleComics.setAttribute('data-bs-placement', "top")
        titleComics.setAttribute('data-bs-title', `${comicsData.title}`)
        titleComics.textContent = comicsData.title;


        rowContainer.appendChild(divCol);
        divCol.appendChild(column);
        column.appendChild(imgComics);
        column.appendChild(divDescription);
        divDescription.appendChild(titleComics);
        divDescription.appendChild(premiereComics);
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
                await getComics(params);
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
            await getComics(params);
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
                await getComics(params);
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
                await getComics(params);
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
            await getComics(params);
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
    await getComics(params);
    createElements();
}
const previeousPage = async () => {
    currentPage = parseInt(currentPage) - 1;
    const params = buildParams();
    await getComics(params);
    createElements();
}

const buildParamsBySearch = () => {
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
        const params = buildParamsBySearch();
        await getComics(params);
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
    await getComics();
    createElements();
}