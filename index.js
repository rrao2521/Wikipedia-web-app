let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppend(result) {
    let {
        description,
        link,
        title
    } = result;

    let resultContEl = document.createElement("div");
    resultContEl.classList.add("search-results");
    searchResultsEl.appendChild(resultContEl);

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultContEl.appendChild(titleEl);

    let titleBr = document.createElement("br");
    resultContEl.appendChild(titleBr);

    let linkEl = document.createElement("a");
    linkEl.href = link;
    linkEl.target = "_blank";
    linkEl.textContent = link;
    linkEl.classList.add("result-url");
    resultContEl.appendChild(linkEl);

    let linkBr = document.createElement("br");
    resultContEl.appendChild(linkBr);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultContEl.appendChild(descriptionEl);
}


function displayResult(searchResults) {
    spinnerEl.classList.add("d-none");

    for (let result of searchResults) {
        createAndAppend(result);
    }
}


function searchEl(event) {

    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchEl);
