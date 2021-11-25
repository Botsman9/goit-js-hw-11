import Notiflix from 'notiflix';

import markupGallery from './markupGallery';
import searchImages from './api-servise';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

// переменные------------------------------------------------------------------------

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreRef = document.querySelector('.load-more');

// переменные api-сервис------------------------------------------------------------------------

let currentName = '';
let page = 1;

// слушатель формы------------------------------------------------------------------

formRef.addEventListener('submit', e => {
  e.preventDefault();
  page = 1;

  currentName = e.currentTarget.elements.searchQuery.value;
  searchImages(currentName, page).then(data => {
    loadMoreRef.style.display = 'none';
    galleryRef.innerHTML = markupGallery(data.hits);

    page += 1;

    if (data.total === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    } else {
      return (
        Notiflix.Notify.success(`'Hooray! We found ${data.totalHits} images.'`),
        (loadMoreRef.style.display = 'block')
      );
    }
  });
});

// слушатель кнопки --------------------------------------------------------------------

loadMoreRef.addEventListener('click', e => {
  searchImages(currentName, page).then(data => {
    page += 1;
    galleryRef.insertAdjacentHTML('beforeend', markupGallery(data.hits));
    if (page >= Math.floor(data.totalHits / 40)) {
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results."),
        (loadMoreRef.style.display = 'none');
    }
  });
});

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
