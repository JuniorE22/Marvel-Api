import { sessionActive } from "../main.js"

const params = new URLSearchParams(window.location.search)
let GET_PUBLIC = params.get("public")
let GET_ID = params.get("id")
const GET_URL = `http://gateway.marvel.com/v1/public/${GET_PUBLIC}?id=${GET_ID}`
const animeRow = document.querySelector("#rowContainer")
const detailsContainer = document.querySelector("#containerText")
let allComicsData = []

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
        allComicsData = responseData.results;
        console.log(responseData)

    } catch (error) {
        console.log(error)
    }
}

const createElements = () => {
    animeRow.innerHTML = "";

    allComicsData.forEach(ComicsData => {
        let colDiv = document.createElement("div");
        let columnDiv = document.createElement("div");
        let rowColumsDiv = document.createElement("div");
        let divDetails = document.createElement("div");
        let TitleDescriptionComics = document.createElement("h5");
        let descriptionComics = document.createElement("p");
        let imgComics = document.createElement("img");
        let divDescription = document.createElement("div");
        let titleComics = document.createElement("h5");
        let startYearComics = document.createElement("h5");
        let modifiedComics = document.createElement("h5");
        let endYearComics = document.createElement("h5");


        colDiv.className = "col"
        columnDiv.className = "card";
        columnDiv.style = "width: 13rem";

        rowColumsDiv.className = "col-md-3 p-3 shadow-lg rounded"
        divDetails.className = "col-md-9"
        divDetails.style = "padding-top: 2%; padding-left: 3%;"
        TitleDescriptionComics.className = "col-md-3"
        descriptionComics.classList = "overflow-auto col-md text-center"
        descriptionComics.style = "max-height: 240px";
        imgComics.className = "card-img-top";
        imgComics.src = `${ComicsData.thumbnail.path}.${ComicsData.thumbnail.extension}`
        divDescription.className = "card-body";
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        titleComics.className = "card-title text-truncate";
        titleComics.setAttribute('data-bs-toggle', "tooltip")
        titleComics.setAttribute('data-bs-placement', "top")
        titleComics.setAttribute('data-bs-title', `${ComicsData.title}`)
        startYearComics.className = "col-md-6"
        modifiedComics.className = "col-md-8";
        endYearComics.className = "col-md-6";

        titleComics.textContent = ComicsData.title;
        TitleDescriptionComics.textContent = "Description"
        if (ComicsData.description == null || ComicsData.description == "") {
            ComicsData.description = "Marvel 100th Anniversary Special is a Marvel Comics limited series. The basic premise is that each comic in the series is from the year 2061," +
                "and depicts how the Marvel Universe may look once it reaches its 100th anniversary (well, its 100th anniversary as Marvel - it began life as Timely Comics in 1939)."
        } else {
            descriptionComics.textContent = ComicsData.description;
        }
        descriptionComics.textContent = ComicsData.description;
        startYearComics.textContent = "Start Year: 2020"
        modifiedComics.textContent = `Modified: ${ComicsData.modified}`
        endYearComics.textContent = "End Year: 2020"


        detailsContainer.appendChild(animeRow);
        animeRow.appendChild(rowColumsDiv);
        animeRow.appendChild(divDetails);

        divDetails.appendChild(TitleDescriptionComics);
        divDetails.appendChild(descriptionComics);
        divDetails.appendChild(startYearComics);
        divDetails.appendChild(modifiedComics);
        divDetails.appendChild(endYearComics);

        rowColumsDiv.appendChild(imgComics);
        rowColumsDiv.appendChild(divDescription);
        rowColumsDiv.appendChild(titleComics);
    }
    )
}


window.onload = async () => {
    sessionActive();
    await getDetails();
    createElements();
}