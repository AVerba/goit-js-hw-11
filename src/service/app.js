import ImagesApiService from "./api-sevice";
import imageCardsTpl from "../template/image-cards.hbs";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    form: document.querySelector('.search-form'),
    container: document.querySelector('.gallery'),
    btnSubmit: document.querySelector('[type="submit"]'),
    loading: document.querySelector('#loading'),
};

const imageApiService = new ImagesApiService();

let lightboxGallery = new SimpleLightbox('.gallery a', { 
            captions: true,
            captionSelector: 'img',
            captionsData: 'alt',
            captionPosition: 'bottom',
            captionDelay: 250,
});

refs.btnSubmit.addEventListener('click', searchImages);

async function searchImages(e) {

    e.preventDefault();

    imageApiService.searchQuery = refs.form.pixabay.value;
    if (refs.form.pixabay.value === '') {
		return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
	}

    const getData = await imageApiService.fetchImages();

    if (getData.hits.length === 0) {

        Notify.failure('Sorry, there are no images matching your search query. Please try again.');

    } else {

        Notify.success(`Hooray! We found ${getData.totalHits} images.`);
        
        clearGalleryContainer();
        imageApiService.resetPage();

        const markup = imageCardsTpl(getData.hits);
        galleryMarkUp(markup);

        lightboxGallery.refresh();

    }
}


function galleryMarkUp(items) {

    refs.container.insertAdjacentHTML('beforeend', items);

}

function clearGalleryContainer() {
  refs.container.innerHTML = '';
}

function smoothScroll() {

    const { height: cardHeight } = document
        .querySelector('.card')
        .firstElementChild.getBoundingClientRect();

    console.log(cardHeight);
    window.scrollBy({
        top: cardHeight * 4,
        behavior: 'smooth',
    });

}


const options = {
    rootMargin: '200px',
};

const LoadNextPageHendler = (entries) => {
    entries.forEach(async(entry) => {
 
        try {
            if (entry.isIntersecting && imageApiService.searchQuery !== '') {


                imageApiService.incrementPage();
                const getData = await imageApiService.fetchImages();
                const markup = imageCardsTpl(getData.hits);
                if(getData.hits.length === 0 &&
                    getData.totalHits !== 0){

                  return  Notify.warning("We're sorry, but you've reached the end of search results.");
                }

                
                galleryMarkUp(markup);
                
                smoothScroll();
                lightboxGallery.refresh();
 
            }
        } catch {
            Notify.warning("We're sorry, but you've reached the end of search results.");
        }
    
  });
}

const imageObserver = new IntersectionObserver(LoadNextPageHendler, options);

imageObserver.observe(refs.loading);


