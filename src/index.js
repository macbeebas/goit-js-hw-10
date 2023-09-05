import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_AsGL4k5pJrxL5bgmoL8KcwWNpL9UCilkPOobxZ9BA3Fq9BZidpNJ2OBoBXaB5HMe';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';

import {
  fetchBreeds, // func
  fetchCatByBreed, //func
  breedSelect, // var
  pLoader, // var
  pError, //var
  catInfo, // var
} from './cat-api';

breedSelect.setAttribute('id', 'selectElement');
pLoader.innerHTML = '';
breedSelect.classList.add('invisible');
pError.classList.add('invisible');

function createSelectionList(data) {
  if (!data) {
    throw new Error(error);
  }

  let arrayWithCats = [];
  data.forEach(item => {
    arrayWithCats.push(`<option value = "${item.id}">${item.name}</option>`);
  });
  const flatArrayWithCats = arrayWithCats.map(tabItem => `${tabItem}`).join('');
  breedSelect.insertAdjacentHTML('beforeend', flatArrayWithCats);
}

fetchBreeds()
  .then(value => {
    createSelectionList(value);
    pError.classList.add('invisible');
  })
  .catch(error => {
    pError.classList.remove('invisible');
  })
  .finally(() => {
    breedSelect.classList.remove('invisible');
    pLoader.classList.add('invisible');

    new SlimSelect({
      select: '#selectElement',
    });
  });

breedSelect.addEventListener('change', selectedCatItem);

function selectedCatItem(event) {
  pLoader.classList.remove('invisible');
  fetchCatByBreed(event.target.selectedOptions[0].value)
    .then(response => {
      pError.classList.add('invisible');
      return response;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      pError.classList.remove('hidden');
    })
    .finally(() => {
      pLoader.classList.add('invisible');
    });
}
