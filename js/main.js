"use strict";

import { LoadPicture } from './LoadPicture.js';

const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
const displayElement = document.getElementById('photo-display');
const loadMoreButton = document.getElementById('load-more-button');

const loadPicture = new LoadPicture(apiUrl, displayElement, 10, 'ASC');

loadPicture.load();

loadMoreButton.addEventListener('click', () => {
    loadPicture.loadNextSet();
    
    if (loadPicture.currentPage * loadPicture.photosPerPage >= loadPicture.photos.length) {
        loadMoreButton.disabled = true;
    }
});