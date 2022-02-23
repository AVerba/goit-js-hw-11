import { imageService } from "./api/apiService";
import { createImageCard } from "./createImageCard"; 
import { createImageList } from "./renderImageCard";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const ref={
    imageGallery: document.querySelector('.cards-set'),
    searchForm: document.querySelector('.search-form'),
    bottom: document.querySelector('.bottom'),
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
// --------------------------------------
const imagesApp = new imageService();

const searchFormHendler=async(e)=>{
    e.preventDefault();

    imagesApp.searchQuery=e.currentTarget.elements.searchQuery.value.trim();
    console.log(imagesApp.searchQuery);

  
    const res= await imagesApp.fetchImages();
  

    if(res.hits.length === 0){
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
        Notify.success(`Hooray! We found ${res.totalHits} images.`);
        clearGallery(ref.imageGallery);
        imagesApp.resetPage();
        const {hits: items}=res;
        ref.imageGallery.innerHTML= createImageList(items);   

    }

}


// ---------------------------------
const options = {
    rootMargin: '200px',
};

const LoadNextPageHendler = (entries) => {
    entries.forEach(async(entry) => {
 
        try {
            if (entry.isIntersecting && imageService.searchQuery !== '') {

                console.log('Hello');

                imagesApp.incrementPage();

                const results = await imagesApp.fetchImages();
                
                const {hits: items}=results;
                ref.imageGallery.innerHTML= createImageList(items);   
                
                smoothScroll();
                lightboxGallery.refresh();
 
            }
        } catch {
            Notify.warning("We're sorry, but you've reached the end of search results.");
        }    
  });
}
// -----------------------------------------------

const imageObserver = new IntersectionObserver(LoadNextPageHendler, options);

imageObserver.observe(ref.bottom);
ref.searchForm.addEventListener('submit', searchFormHendler)

