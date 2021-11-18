import Notiflix from 'notiflix';

export const fetchCountries = function (name) {
    fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,population,languages`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(name => {
        let markup = '';
  
        if (name.length > 10) {
          countries(markup);
          oneCountry(markup);
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
          return;
        }
  
        if (name.length === 1) {
          countries(markup);
          markup += `<p><img src="${name[0].flags.svg}" width="50" alt="Flag of ${
            name[0].name.official
          }"><span class="text">${name[0].name.official}</span></p>
          <p><span class="text">Capital:</span> ${name[0].capital[0]}</p>
          <p><span class="text">Population:</span> ${name[0].population}</p>
          <p><span class="text">Languages:</span> ${Object.values(name[0].languages).join(', ')}</p>`;
          oneCountry(markup);
          return;
        }
  
        oneCountry(markup);
        name.map(({ flags: { svg: flagLink }, name: { official: countryName } }) => {
          markup += `<li class="country-item"><img src="${flagLink}" width="30" alt="Flag of ${countryName}">${countryName}</li>`;
        });
        countries(markup);
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  };