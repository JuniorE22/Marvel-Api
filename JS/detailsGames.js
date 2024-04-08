import { sessionActive } from "../main.js"

const params = new URLSearchParams(window.location.search)
let GET_PUBLIC = params.get("public")
let GET_ID = params.get("id")
const GET_URL = `http://gateway.marvel.com/v1/public/${GET_PUBLIC}?id=${GET_ID}`
const animeRow = document.querySelector("#rowContainer")
const detailsContainer = document.querySelector("#containerText")
let allGamesData = []

const getDetails = async () => {
    try {
        const mainParams = {
            ts: '1',
            apikey: 'f261b7a9df35311738cdc220e78c3bf9',
            hash: '8147a92999450be7f35b0b0003b77eed',
        };

        const response = await axios.get(GET_URL, {
            params: mainParams
        });

        const responseData = response.data.data;
        allGamesData = responseData.results;
        console.log(responseData)

    } catch (error) {
        console.log(error)
    }
}

const createElements = () => {
    animeRow.innerHTML = "";

    allGamesData.forEach(gamesData => {
        let colDiv = document.createElement("div");
        let columnDiv = document.createElement("div");
        let rowColumsDiv = document.createElement("div");
        let divDetails = document.createElement("div");
        let TitleDescriptionGame = document.createElement("h5");
        let descriptionGames = document.createElement("p");
        let imgGames = document.createElement("img");
        let divDescription = document.createElement("div");
        let titleGame = document.createElement("h5");
        let yearAnime = document.createElement("h5");
        let genresAnime = document.createElement("h5");
        let studiosAnime = document.createElement("h5");


        colDiv.className = "col"
        columnDiv.className = "card";
        columnDiv.style = "width: 13rem";

        rowColumsDiv.className = "col-md-3 shadow-lg p-3 mb-5 bg-body rounded"
        divDetails.className = "col-md-9"
        divDetails.style = "padding-top: 2%; padding-left: 3%;"
        TitleDescriptionGame.className = "col-md-3"
        descriptionGames.classList = "overflow-auto col-md text-center"
        descriptionGames.style = "max-height: 240px";
        imgGames.className = "card-img-top";
        imgGames.src = `${gamesData.thumbnail.path}.${gamesData.thumbnail.extension}`
        divDescription.className = "card-body";
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        titleGame.className = "card-title text-truncate";
        titleGame.setAttribute('data-bs-toggle', "tooltip")
        titleGame.setAttribute('data-bs-placement', "top")
        titleGame.setAttribute('data-bs-title', `${gamesData.title}`)
        yearAnime.className = "col-md-6"
        genresAnime.className = "col-md-6";
        studiosAnime.className = "col-md-6";
        titleGame.textContent = gamesData.title;
        TitleDescriptionGame.textContent = "Description"
        if (gamesData.description == null) {
            descriptionGames.textContent = "Marvel 100th Anniversary Special is a Marvel Comics limited series. The basic premise is that each comic in the series is from the year 2061," +
                "and depicts how the Marvel Universe may look once it reaches its 100th anniversary (well, its 100th anniversary as Marvel - it began life as Timely Comics in 1939)."
        } else {
            descriptionGames.textContent = gamesData.description;
        }
        yearAnime.textContent = `Year: ${gamesData.start}`
        genresAnime.textContent = `Modified: ${gamesData.modified}`
        studiosAnime.textContent = `Year End: ${gamesData.end} `


        detailsContainer.appendChild(animeRow);
        animeRow.appendChild(rowColumsDiv);
        animeRow.appendChild(divDetails);

        divDetails.appendChild(TitleDescriptionGame);
        divDetails.appendChild(descriptionGames);
        divDetails.appendChild(yearAnime);
        divDetails.appendChild(genresAnime);
        divDetails.appendChild(studiosAnime);

        rowColumsDiv.appendChild(imgGames);
        rowColumsDiv.appendChild(divDescription);
        rowColumsDiv.appendChild(titleGame);
    }
    )
}


window.onload = async () => {
    sessionActive();
    await getDetails();
    createElements();
}