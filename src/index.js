import axios from 'axios';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

// переменные------------------------------------------------------------------------

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreRef = document.querySelector('.load-more');

// api-сервис------------------------------------------------------------------------
const myKey = '24498765-29ee438a61ceedd9aaf6213cc';
let currentName = '';
let page = 1;
const BASE_URL = `https://pixabay.com/api/`;

const searchImages = currentName => {
  return fetch(
    `${BASE_URL}?key=${myKey}&q=${currentName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
  )
    .then(res => res.json())
    .then(data => data);
};

// слушатель формы------------------------------------------------------------------

formRef.addEventListener('submit', e => {
  e.preventDefault();
  page = 1;

  currentName = e.currentTarget.elements.searchQuery.value;
  searchImages(currentName).then(rrr => {
    loadMoreRef.style.display = 'none';
    galleryRef.innerHTML = marcapGallery(rrr.hits);

    page += 1;

    if (rrr.total === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    } else {
      return (
        Notiflix.Notify.success(`'Hooray! We found ${rrr.totalHits} images.'`),
        (loadMoreRef.style.display = 'block')
      );
    }
  });
});

// слушатель кнопки --------------------------------------------------------------------

loadMoreRef.addEventListener('click', e => {
  searchImages(currentName).then(rrr => {
    page += 1;
    galleryRef.insertAdjacentHTML('beforeend', marcapGallery(rrr.hits));
    if (page >= Math.floor(rrr.totalHits / 40)) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results."),
        (loadMoreRef.style.display = 'none');
    }
  });
});

// функция разметки карточки----------------------------------------------------------------
function marcapGallery(arry) {
  return arry
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="400" height ="250" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
   ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
      ${downloads}
    </p>
  </div>
</div>
`;
    })
    .join(' ');
}

// библиотека-------------------------------------------------------------------------------------
// galleryRef.addEventListener('click', event => {
//   event.preventDefault();
//   if (event.target.tagName !== 'IMG') return;

//   const origImg = event.target;

//   const lightbox = new SimpleLightbox('.gallery div', {
//     captionsData: 'alt',
//     captionDelay: 250,
//     captionPosition: '',
//   });

//   lightbox.show();
// });
