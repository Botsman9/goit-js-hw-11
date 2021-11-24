import axios from 'axios';
import notiflix from 'notiflix';
import searchImages from './api-servis';

const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('.page-head__input');
const formBtn = document.querySelector('.page-head__btn');
const galleryRef = document.querySelector('.gallery');
const loadMoreRef = document.querySelector('.load-more');

const myKey = '24498765-29ee438a61ceedd9aaf6213cc';

const BASE_URL = `https://pixabay.com/api/?key=${myKey}&q=${currentName}&image_type=photo&orientation=horizontal&safesearch=true&page=${pages}&per_page=40`;

const searchImages = rrr => {
  const rrr = dog;
  return fetch(`${BASE_URL}`).then(res => res.json());
};

formRef.addEventListener('submit', e => {
  e.preventDefault(searchParams);
  searchImages().then(rrr => {
    galleryRef.innerHTML = marcapGallery(rrr.hits);
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
