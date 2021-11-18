import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

 const countries = function (markup) {
    document.querySelector('.country-list').innerHTML = markup;
  };
  
const oneCountry = function (markup) {
    document.querySelector('.country-info').innerHTML = markup;
  };

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');

searchInput.addEventListener('input', debounce(showCountries, DEBOUNCE_DELAY));

function showCountries() {
  if (searchInput.value.trim() === '') {
    countries(' ');
    oneCountry(' ');
    return;
  }
  fetchCountries(searchInput.value.trim());
}



