import axios from 'axios';

const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('.page-head__input');
const formBtn = document.querySelector('.page-head__btn');
const galleryRef = document.querySelector('.gallery');
const loadMoreRef = document.querySelector('.load-more');

const myKey = '24498765-29ee438a61ceedd9aaf6213cc';
const searchName = 'dog';

const BASE_URL = `https://pixabay.com/api/
?key=${myKey}
&q=${searchName}&
image_type=photo&orientation=horizontal&safesearch=try&per_page=40`;

const searchImages = () => {
  return fetch(`${BASE_URL}`).then(res => res.json());
};

formRef.addEventListener('submit', e => {
  e.preventDefault();
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
