import { sessionActive } from "../main.js"

const URL_ID = new URLSearchParams(window.location.search)
const GET_PUBLIC = URL_ID.getAll('characters')
let Url_Public = "";
URL_ID.forEach((value, key) => {
    debugger
        console.log(value);
        Url_Public = value;
}); 
const GET_URL = `http://gateway.marvel.com/v1/public/${Url_Public}`

const animeRow = document.querySelector("#rowContainer")
const detailsContainer = document.querySelector("#containerText")

let allCharactersData = []
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
        allCharactersData = responseData.results;
        console.log(responseData)

    } catch (error) {
        console.log(error)
    }
}

const createElements = () => {
    animeRow.innerHTML = "";

    allCharactersData.forEach(CharactersData => {
        let colDiv = document.createElement("div");
        let columnDiv = document.createElement("div");
        let rowColumsDiv = document.createElement("div");
        let divDetails = document.createElement("div");
        let titleDescriptionCharacters = document.createElement("h5");
        let descriptionCharacters = document.createElement("p");
        let imgCharacters = document.createElement("img");
        let divDescription = document.createElement("div");
        let titleCharacters = document.createElement("h5");
        let startYearCharacters = document.createElement("h5");
        let modifiedCharacters = document.createElement("h5");
        let endYearCharacters = document.createElement("h5");


        colDiv.className = "col"
        columnDiv.className = "card";
        columnDiv.style = "width: 13rem";

        rowColumsDiv.className = "col-md-3 shadow-lg p-3 rounded"
        divDetails.className = "col-md-9"
        divDetails.style = "padding-top: 2%"
        titleDescriptionCharacters.className = "col-md-3"
        descriptionCharacters.classList = "overflow-auto col-md text-center"
        descriptionCharacters.style = "max-height: 240px";
        imgCharacters.className = "card-img-top";
        imgCharacters.src = `${CharactersData.thumbnail.path}.${CharactersData.thumbnail.extension}`
        divDescription.className = "card-body";
        titleCharacters.className = "card-title text-truncate";
        titleCharacters.setAttribute('data-bs-toggle', "tooltip")
        titleCharacters.setAttribute('data-bs-placement', "top")
        titleCharacters.setAttribute('data-bs-title', `${CharactersData.name}`)
        startYearCharacters.className = "col-md-6"
        modifiedCharacters.className = "col-md-6";
        endYearCharacters.className = "col-md-6";

        titleCharacters.textContent = CharactersData.name;
        titleDescriptionCharacters.textContent = "Description"
        if (CharactersData.description == null || CharactersData.description == "") {
            CharactersData.description = "Marvel 100th Anniversary Special is a Marvel Comics limited series. The basic premise is that each comic in the series is from the year 2061," +
            "and depicts how the Marvel Universe may look once it reaches its 100th anniversary (well, its 100th anniversary as Marvel - it began life as Timely Comics in 1939)."
        }else{
            descriptionCharacters.textContent = CharactersData.description;
        }
        descriptionCharacters.textContent = CharactersData.description;
        startYearCharacters.textContent = "Start Year: 2020"
        modifiedCharacters.textContent = `Modified: ${CharactersData.modified}`
        endYearCharacters.textContent = "End Year: 2020"


        detailsContainer.appendChild(animeRow);
        animeRow.appendChild(rowColumsDiv);
        animeRow.appendChild(divDetails);

        divDetails.appendChild(titleDescriptionCharacters);
        divDetails.appendChild(descriptionCharacters);
        divDetails.appendChild(startYearCharacters);
        divDetails.appendChild(modifiedCharacters);
        divDetails.appendChild(endYearCharacters);

        rowColumsDiv.appendChild(imgCharacters);
        rowColumsDiv.appendChild(divDescription);
        rowColumsDiv.appendChild(titleCharacters);

    }
    )
}


window.onload = async () => {
    sessionActive();
    await getDetails();
    createElements();
}