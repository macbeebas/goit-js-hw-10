import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_AsGL4k5pJrxL5bgmoL8KcwWNpL9UCilkPOobxZ9BA3Fq9BZidpNJ2OBoBXaB5HMe';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';

import {
  pLoader, // var
  pError, //var
  fetchBreeds, // func
  fetchCatByBreed, //func
} from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

breedSelect.setAttribute('id', 'selectElement');
pLoader.innerHTML = '';
breedSelect.classList.add('invisible');
pError.classList.add('invisible');
pLoader.classList.add('invisible');

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

function buildCatElement(item) {
  var altName = item[0].breeds[0].alt_names;
  if (altName === undefined || altName === '' || altName.length <= 1) {
    altName = `${item[0].breeds[0].name} cat`;
  }
  const urlItem = item[0].url;
  const nameItem = item[0].breeds[0].name;
  const descrItem = item[0].breeds[0].description;
  const temperItem = item[0].breeds[0].temperament;
  const tempCat = `<img class="cat-info__image" src="${urlItem}" alt="${altName}" width="400px" />
<h1 class="cat-info__header">${nameItem}</h1>
<p class="cat-info__description">${descrItem}</p>
<p class="cat-info__temperament"><strong>Temperament: </strong><span>${temperItem}</span></p>`;
  catInfo.innerHTML = tempCat;
}

fetchBreeds()
  .then(value => {
    createSelectionList(value);
    pError.classList.add('invisible');
  })
  .catch(error => {
    pError.classList.remove('invisible');
    pLoader.classList.add('invisible');
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
  const shortCat = event.target.selectedOptions[0].value;
  fetchCatByBreed(shortCat)
    .then(response => {
      buildCatElement(response);
      pError.classList.add('invisible');
      pLoader.classList.remove('invisible');
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
