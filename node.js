const countryContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-region");
const searchInput = document.querySelector(".search-container input");

let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  countryContainer.innerHTML = "";

  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `country.html?name=${encodeURIComponent(country.name.common)}`;
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common}">
      <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
        <p><b>Region: </b>${country.region}</p>
        <p><b>Capital: </b>${country.capital?.[0] ?? "N/A"}</p>
      </div>
    `;
    countryContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(value)
  );
  renderCountries(filteredCountries);
});


