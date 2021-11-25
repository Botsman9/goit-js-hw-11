import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const myKey = '24498765-29ee438a61ceedd9aaf6213cc';

//Реализация Fetch ---------------------------------------------------------
// let currentName = '';
// let page = 1;
// const BASE_URL = `https://pixabay.com/api/`;

// const searchImages = currentName => {
//   return fetch(
//     `${BASE_URL}?key=${myKey}&q=${currentName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
//   )
//     .then(res => res.json())
//

// };
// Реализация axios ---------------------------------------------------------
const searchImages = (currentName, page) => {
  const queryParams = new URLSearchParams({
    key: myKey,
    q: currentName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  });
  return axios(`?${queryParams}`).then(res => res.data);
};

export default searchImages;
// export let currentName = '';
// export let page = 1;
