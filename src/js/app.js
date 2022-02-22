import { imageService } from "./api/apiService";
import { createImageCard } from "./createImageCard"; 
import { createImageList } from "./renderImageCard";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ref={
    imageGallery: document.querySelector('.cards-set'),
    searchForm: document.querySelector('.search-form'),
}

let lightboxGallery = new SimpleLightbox('.gallery a', { 
    captions: true,
    captionSelector: 'img',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});

const clearGallery=(ref)=>{
    ref.innerHTML = '';
  }
  
const smoothScroll=()=>{
  
      const { height: cardHeight } = document
          .querySelector('.card')
          .firstElementChild.getBoundingClientRect();
  
      console.log(cardHeight);
      window.scrollBy({
          top: cardHeight * 4,
          behavior: 'smooth',
      });  
  }


const searchFormHendler=(e)=>{
    e.preventDefault();
    
    const searchValue = e.currentTarget.elements.searchQuery.value.trim();
    console.log (searchValue);

    fetchImages(searchValue).then((res)=>{
        const {hits: items}=res;
        ref.imageGallery.innerHTML= createImageList(items);       
    })
}


ref.searchForm.addEventListener('submit', searchFormHendler)

