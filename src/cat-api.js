import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_AsGL4k5pJrxL5bgmoL8KcwWNpL9UCilkPOobxZ9BA3Fq9BZidpNJ2OBoBXaB5HMe';

import Notiflix from 'notiflix';

export const pLoader = document.querySelector('.loader');
export const pError = document.querySelector('.error');

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      pError.classList.remove('invisible');
      pLoader.classList.add('invisible');
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      pError.classList.remove('invisible');
      pLoader.classList.add('invisible');
    });
}
