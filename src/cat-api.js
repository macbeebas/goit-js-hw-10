import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_AsGL4k5pJrxL5bgmoL8KcwWNpL9UCilkPOobxZ9BA3Fq9BZidpNJ2OBoBXaB5HMe';

import Notiflix from 'notiflix';

export const breedSelect = document.querySelector('.breed-select');
export const pLoader = document.querySelector('.loader');
export const pError = document.querySelector('.error');
export const catInfo = document.querySelector('.cat-info');

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      pError.classList.remove('hidden');
    });
}

export function buildCatElement(item) {
  var altName = item.breeds[0].alt_names;
  if (altName === undefined || altName === '' || altName.length <= 1) {
    altName = `${item.breeds[0].name} cat`;
  }
  const tempCat = `<img class="cat-info__image" src="${item.url}" alt="${altName}" width="400px" />
<h1 class="cat-info__header">${item.breeds[0].name}</h1>
<p class="cat-info__description">${item.breeds[0].description}</p>
<p class="cat-info__temperament"><strong>Temperament: </strong><span>${item.breeds[0].temperament}</span></p>`;
  catInfo.innerHTML = tempCat;
}

export function fetchCatByBreed(breedId) {
  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .then(data => {
      buildCatElement(data[0]);
      pError.classList.add('invisible');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      pError.classList.remove('invisible');
    })
    .finally(() => {
      pLoader.classList.add('invisible');
    });
}
