import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryBox = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(inputCountryName, DEBOUNCE_DELAY));

function inputCountryName(evt) {
  const name = evt.target.value.trim();
  if (!name) {
    countryBox.innerHTML = '';
    countryList.innerHTML = '';

    return;
  }

  fetchCountries(name)
    .then(data => findCountry(data))
    .catch(err => err);
}

function findCountry(countries) {
  const arrLength = countries.length;
  if (arrLength > 10) {
    countryBox.innerHTML = '';
    countryList.innerHTML = '';

    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (arrLength >= 2 && arrLength <= 10) {
    countryList.innerHTML = '';
    countryBox.innerHTML = '';
    return createMarkupAll(countries);
  }

  countryList.innerHTML = '';
  countryBox.innerHTML = '';
  return createMarkupOne(countries);
}

function createMarkupOne(countries) {
  const markup = countries
    .map(country => {
      return `
        <div class="country">
        <img src="${country.flags.svg}" alt="${country.name.official}" width="60" height="30">
        <h2 class="country-name">${country.name.official}</h2>
        </div>
        <ul class="list-country-options">
        <li><span>Capital</span>: ${country.capital[0]}</li>
        <li><span>Population</span>: ${country.population}</li>
        <li><span>Languages</span>: ${Object.values(country.languages)}</li>
        </ul>`;
    })
    .join('');
  countryBox.innerHTML = markup;
}

function createMarkupAll(countries) {
  const markup = countries
    .map(country => {
      return `
        <div class="country">
    <img src="${country.flags.svg}" alt="${country.name.official}" width="60" height="30">
    <h2>${country.name.official}</h2>
    </div>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
