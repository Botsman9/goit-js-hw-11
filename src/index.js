import axios from 'axios';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('.page-head__input');
const formBtn = document.querySelector('.page-head__btn');
const galleryRef = document.querySelector('.gallery');
const loadMoreRef = document.querySelector('.load-more');

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

formRef.addEventListener('submit', e => {
  e.preventDefault();
  page = 1;

  currentName = e.currentTarget.elements.searchQuery.value;
  searchImages(currentName).then(rrr => {
    loadMoreRef.style.display = 'none';
    galleryRef.innerHTML = marcapGallery(rrr.hits);
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

    console.log(rrr);
    page += 1;
  });
});

loadMoreRef.addEventListener('click', e => {
  searchImages(currentName).then(rrr => {
    if (page <= Math.floor(rrr.totalHits % 40)) {
      return (
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results."),
        (loadMoreRef.style.display = 'none')
      );
    }
    page += 1;
    console.log(page);
    galleryRef.insertAdjacentHTML('beforeend', marcapGallery(rrr.hits));
  });
});

function marcapGallery(arry) {
  return arry
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${likes}</b>
    </p>
    <p class="info-item">
      <b>Views${views}</b>
    </p>
    <p class="info-item">
      <b>Comments${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>
`;
    })
    .join(' ');
}
