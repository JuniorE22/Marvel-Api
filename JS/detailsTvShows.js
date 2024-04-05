import { sessionActive } from "../main.js"

const URL_ID = new URLSearchParams(window.location.search)
const GET_PUBLIC = URL_ID.getAll('series')
let Url_Public = "";
URL_ID.forEach((value, key) => {
    debugger
    console.log(value);
    Url_Public = value;
});
const GET_URL = `http://gateway.marvel.com/v1/public/${Url_Public}`

const animeRow = document.querySelector("#rowContainer")
const detailsContainer = document.querySelector("#containerText")

let alltvShowData = []
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
        alltvShowData = responseData.results;
        console.log(responseData)
        console.log(tvShowData)

    } catch (error) {
        console.log(error)
    }
}

const createElements = () => {
    animeRow.innerHTML = "";

    alltvShowData.forEach(tvShowData => {
        let colDiv = document.createElement("div");
        let columnDiv = document.createElement("div");
        let rowColumsDiv = document.createElement("div");
        let divDetails = document.createElement("div");
        let TitleDescriptionTvShow = document.createElement("h5");
        let descriptionTvShow = document.createElement("p");
        let imgTvShow = document.createElement("img");
        let divDescription = document.createElement("div");
        let titleTvShow = document.createElement("h5");
        let startYearTvShow = document.createElement("h5");
        let modifiedTvShow = document.createElement("h5");
        let yearEndTvShow = document.createElement("h5");


        colDiv.className = "col"
        columnDiv.className = "card";
        columnDiv.style = "width: 13rem";

        rowColumsDiv.className = "col-md-3 shadow-lg p-3 rounded"
        divDetails.className = "col-md-9"
        divDetails.style = "padding-top: 2%"
        TitleDescriptionTvShow.className = "col-md-3"
        descriptionTvShow.classList = "overflow-auto col-md text-center"
        descriptionTvShow.style = "max-height: 240px";
        imgTvShow.className = "card-img-top";
        imgTvShow.src = `${tvShowData.thumbnail.path}.${tvShowData.thumbnail.extension}`
        divDescription.className = "card-body";
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        titleTvShow.className = "card-title text-truncate";
        titleTvShow.setAttribute('data-bs-toggle', "tooltip")
        titleTvShow.setAttribute('data-bs-placement', "top")
        titleTvShow.setAttribute('data-bs-title', `${tvShowData.title}`)
        titleTvShow.textContent = tvShowData.title;
        startYearTvShow.className = "col-md-6"
        modifiedTvShow.className = "col-md-6";
        yearEndTvShow.className = "col-md-6";

        
        TitleDescriptionTvShow.textContent = "Description"
        descriptionTvShow.textContent = tvShowData.description;
        startYearTvShow.textContent = `Start Year: ${tvShowData.startYear}`
        if (tvShowData.description == null) {
            descriptionTvShow.textContent = "Marvel 100th Anniversary Special is a Marvel Comics limited series. The basic premise is that each comic in the series is from the year 2061," +
            "and depicts how the Marvel Universe may look once it reaches its 100th anniversary (well, its 100th anniversary as Marvel - it began life as Timely Comics in 1939)."
        }else{
            descriptionTvShow.textContent = tvShowData.description;
        }
        modifiedTvShow.textContent = `Modified: ${tvShowData.modified}`
        yearEndTvShow.textContent = `Year End: ${tvShowData.endYear} `


        detailsContainer.appendChild(animeRow);
        animeRow.appendChild(rowColumsDiv);
        animeRow.appendChild(divDetails);

        divDetails.appendChild(TitleDescriptionTvShow);
        divDetails.appendChild(descriptionTvShow);
        divDetails.appendChild(startYearTvShow);
        divDetails.appendChild(modifiedTvShow);
        divDetails.appendChild(yearEndTvShow);

        rowColumsDiv.appendChild(imgTvShow);
        rowColumsDiv.appendChild(divDescription);
        rowColumsDiv.appendChild(titleTvShow);
    }
    )
}


window.onload = async () => {
    sessionActive();
    await getDetails();
    createElements();
}