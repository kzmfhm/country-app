const countryName = new URLSearchParams(location.search).get('name');
const flagImg = document.querySelector('.country-details img');
const countryName1 = document.querySelector('.country-details h1');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const capital = document.querySelector('.capital');
const subRegion = document.querySelector('.sub-region');
const currency = document.querySelector('.currency');
const language = document.querySelector('.language');
const topLevelDomain = document.querySelector('.top-level-domain');
const borderCountries = document.querySelector('.border-countries');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    flagImg.src = country.flags.svg;
    countryName1.innerText = country.name.common;
    region.innerText = country.region;

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }

    if (country.capital) {
      capital.innerText = country.capital.join(', ');
    }

    topLevelDomain.innerText = country.tld.join(', ');
    population.innerText = country.population.toLocaleString('en-IN');

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.currencies) {
      currency.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ');
    }

    if (country.languages) {
      language.innerText = Object.values(country.languages).join(', ');
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement('a');
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${encodeURIComponent(borderCountry.name.common)}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });


