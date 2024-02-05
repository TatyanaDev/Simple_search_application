"use strict";

const autocompleteResults = document.getElementById("autocomplete-results");
const searchHistoryList = document.getElementById("search-history");
const clearHistory = document.getElementById("clear-history");
const searchInput = document.getElementById("search-input");

let searchHistory = [];

searchInput.addEventListener("input", () => {
  const query = searchInput.value;

  if (query.length < 1) {
    autocompleteResults.innerHTML = "";

    return;
  }

  fetch(`https://jsonplaceholder.typicode.com/albums?_&q=${encodeURIComponent(query)}`)
    .then((res) => res.json())
    .then((data) =>
        (autocompleteResults.innerHTML = data
          .map(({ title }) => `<li class="result-item">${title}</li>`)
          .join("")))
    .catch((err) => console.error("Error fetching data:", err));
});

const renderSearchHistory = () =>
  (searchHistoryList.innerHTML = searchHistory
    .map((item, index) =>
        `<li class="history-container">
          <p class="history-item">${item.title}</p>
          <span class="history-item-info">
            <p>${item.timestamp}</p>
            <button onclick="deleteHistoryItem(${index})" class="delete-button">X</button>
          </span>
        </li>`)
    .join(""));

const addSearchHistory = (title) => {
  const timestamp = new Date().toLocaleString("ru");

  searchHistory.push({ title, timestamp });

  renderSearchHistory();
};

autocompleteResults.addEventListener("click", ({ target }) => {
  if (target.tagName === "LI") {
    addSearchHistory(target.textContent);

    searchInput.value = "";

    autocompleteResults.innerHTML = "";
  }
});

clearHistory.addEventListener("click", () => {
  searchHistory = [];

  renderSearchHistory();
});

const deleteHistoryItem = (index) => {
  searchHistory.splice(index, 1);

  renderSearchHistory();
};
